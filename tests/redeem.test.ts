import { beforeEach, describe, expect, it, vi } from "vitest";
import { NextRequest } from "next/server";

// ---------------------------------------------------------------------------
// A fake Supabase that models the ONE property this build exists to guarantee:
// claiming a code is atomic.
//
// The fake `redeem_code_and_link` deliberately yields to the event loop BEFORE
// it claims, then does its check-and-set in a single synchronous step. That
// mirrors Postgres: the caller waits, but the claim itself has no gap in the
// middle for a second caller to slip through. A route that did its own
// read-then-write instead of trusting the RPC would fail these tests, which is
// the entire reason they are written this way.
//
// `access_code_is_claimable` is modelled as what it really is: advisory. Some
// tests make it lie on purpose, to prove the atomic UPDATE — and nothing else —
// is what actually decides.
// ---------------------------------------------------------------------------

type CodeRow = {
  code: string;
  active: boolean;
  redeemed: boolean;
  redeemed_by: string | null;
  use_count: number;
};

type UserRow = {
  id: string;
  email: string;
  app_metadata: Record<string, unknown>;
};

const codes = new Map<string, CodeRow>();
const users = new Map<string, UserRow>();

let nextUserId = 0;
let claimableLies = false;
let deleteUserFails = false;
let rpcFails = false;
let signInFails = false;

function seedCode(code: string, overrides: Partial<CodeRow> = {}) {
  codes.set(code, {
    code,
    active: true,
    redeemed: false,
    redeemed_by: null,
    use_count: 0,
    ...overrides,
  });
}

/** The atomic claim. Everything before the mutation is async; the mutation is not. */
async function redeem(userId: string, code: string) {
  // The scheduling window a broken implementation would lose the race in.
  await Promise.resolve();

  const row = codes.get(code.trim().toUpperCase());
  if (!row || !row.active || row.redeemed) return [];

  row.redeemed = true;
  row.redeemed_by = userId;
  row.use_count += 1;
  return [{ code: row.code, label: null }];
}

vi.mock("@supabase/supabase-js", () => ({
  createClient: () => ({
    rpc: async (name: string, args: Record<string, string>) => {
      if (rpcFails) return { data: null, error: { message: "boom" } };

      if (name === "access_code_is_claimable") {
        if (claimableLies) return { data: true, error: null };
        const row = codes.get(args.p_code.trim().toUpperCase());
        return {
          data: Boolean(row && row.active && !row.redeemed),
          error: null,
        };
      }

      if (name === "redeem_code_and_link") {
        return { data: await redeem(args.p_user_id, args.p_code), error: null };
      }

      throw new Error(`unexpected rpc: ${name}`);
    },

    from: () => ({
      select: () => ({
        eq: (_column: string, userId: string) => ({
          maybeSingle: async () => {
            const row = [...codes.values()].find(
              (candidate) => candidate.redeemed_by === userId,
            );
            return {
              data: row ? { code: row.code, active: row.active } : null,
              error: null,
            };
          },
        }),
      }),
    }),

    auth: {
      admin: {
        createUser: async ({ email }: { email: string }) => {
          if ([...users.values()].some((user) => user.email === email)) {
            return {
              data: null,
              error: { message: "User already registered" },
            };
          }
          nextUserId += 1;
          const user = { id: `user-${nextUserId}`, email, app_metadata: {} };
          users.set(user.id, user);
          return { data: { user }, error: null };
        },

        deleteUser: async (id: string) => {
          if (deleteUserFails) throw new Error("delete failed");
          users.delete(id);
          return { data: null, error: null };
        },

        updateUserById: async (
          id: string,
          patch: { app_metadata?: Record<string, unknown> },
        ) => {
          const user = users.get(id);
          if (user) Object.assign(user.app_metadata, patch.app_metadata ?? {});
          return { data: { user }, error: null };
        },
      },
    },
  }),
}));

vi.mock("@supabase/ssr", () => ({
  createServerClient: () => ({
    auth: {
      signInWithPassword: async ({ email }: { email: string }) => {
        if (signInFails) {
          return { data: null, error: { message: "no session" } };
        }
        const user = [...users.values()].find(
          (candidate) => candidate.email === email,
        );
        if (!user) return { data: null, error: { message: "bad credentials" } };
        return { data: { user }, error: null };
      },
      signOut: async () => ({ error: null }),
      refreshSession: async () => ({ data: null, error: null }),
      getUser: async () => ({ data: { user: null }, error: null }),
    },
  }),
}));

const { POST: redeemRoute } = await import("../app/api/auth/redeem/route");
const { POST: loginRoute } = await import("../app/api/auth/login/route");

function post(body: unknown) {
  return new NextRequest("http://localhost:3100/api/auth/redeem", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

beforeEach(() => {
  codes.clear();
  users.clear();
  nextUserId = 0;
  claimableLies = false;
  deleteUserFails = false;
  rpcFails = false;
  signInFails = false;

  process.env.SUPABASE_URL = "https://example.supabase.co";
  process.env.SUPABASE_SERVICE_ROLE_KEY = "service-role-test-key";
  process.env.NEXT_PUBLIC_SUPABASE_URL = "https://example.supabase.co";
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = "anon-test-key";
});

describe("POST /api/auth/redeem", () => {
  it("turns a fresh code into one account, and spends the code", async () => {
    seedCode("WH-TEST-0001");

    const response = await redeemRoute(
      post({
        code: "WH-TEST-0001",
        email: "one@example.com",
        password: "correct-horse",
      }),
    );

    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toMatchObject({
      success: true,
      signedIn: true,
    });

    const row = codes.get("WH-TEST-0001")!;
    expect(row.redeemed).toBe(true);
    expect(row.redeemed_by).toBe("user-1");
    expect(users.size).toBe(1);
    // Access is a claim only the service role can write, not "has a session".
    expect(users.get("user-1")!.app_metadata.program_access).toBe(true);
  });

  it("refuses the same code a second time, from a different email", async () => {
    seedCode("WH-TEST-0001");

    await redeemRoute(
      post({
        code: "WH-TEST-0001",
        email: "first@example.com",
        password: "correct-horse",
      }),
    );

    const second = await redeemRoute(
      post({
        code: "WH-TEST-0001",
        email: "second@example.com",
        password: "battery-staple",
      }),
    );

    expect(second.status).toBe(401);
    await expect(second.json()).resolves.toMatchObject({
      error: "invalid_code",
    });

    // The whole promise: one code, one account. Not two.
    expect(users.size).toBe(1);
    expect([...users.values()][0].email).toBe("first@example.com");
  });

  it("still refuses a spent code when the pre-check wrongly says it is free", async () => {
    // Proves the atomic UPDATE is the authority. If the route trusted the
    // advisory check, this would produce a second account off one code.
    seedCode("WH-TEST-0001", { redeemed: true, redeemed_by: "user-99" });
    claimableLies = true;

    const response = await redeemRoute(
      post({
        code: "WH-TEST-0001",
        email: "second@example.com",
        password: "battery-staple",
      }),
    );

    expect(response.status).toBe(409);
    await expect(response.json()).resolves.toMatchObject({
      error: "code_taken",
    });
    // The account made on the way in was taken back out again.
    expect(users.size).toBe(0);
  });

  it("gives one code to exactly one of two simultaneous redemptions", async () => {
    seedCode("WH-TEST-0001");
    // Both requests pass the advisory check before either has claimed — the
    // precise race a check-then-update implementation loses.
    claimableLies = true;

    const [a, b] = await Promise.all([
      redeemRoute(
        post({
          code: "WH-TEST-0001",
          email: "a@example.com",
          password: "correct-horse",
        }),
      ),
      redeemRoute(
        post({
          code: "WH-TEST-0001",
          email: "b@example.com",
          password: "battery-staple",
        }),
      ),
    ]);

    const statuses = [a.status, b.status].sort();
    expect(statuses).toEqual([200, 409]);

    expect(codes.get("WH-TEST-0001")!.use_count).toBe(1);
    expect(users.size).toBe(1);
  });

  it.each([
    ["a code that does not exist", "WH-NOPE-0000", null],
    ["a revoked code", "WH-DEAD-0001", { active: false }],
    ["a spent code", "WH-USED-0001", { redeemed: true }],
  ])("rejects %s without stranding an account", async (_label, code, state) => {
    if (state) seedCode(code as string, state as Partial<CodeRow>);

    const response = await redeemRoute(
      post({ code, email: "someone@example.com", password: "correct-horse" }),
    );

    expect(response.status).toBe(401);
    await expect(response.json()).resolves.toMatchObject({
      error: "invalid_code",
    });
    expect(users.size).toBe(0);
  });

  it("normalises case and whitespace, so a retyped code still works", async () => {
    seedCode("WH-TEST-0001");

    const response = await redeemRoute(
      post({
        code: "  wh-test-0001  ",
        email: "one@example.com",
        password: "correct-horse",
      }),
    );

    expect(response.status).toBe(200);
    expect(codes.get("WH-TEST-0001")!.redeemed).toBe(true);
  });

  it("leaves the code unspent when the email is already taken", async () => {
    seedCode("WH-TEST-0001");
    seedCode("WH-TEST-0002");

    await redeemRoute(
      post({
        code: "WH-TEST-0001",
        email: "one@example.com",
        password: "correct-horse",
      }),
    );

    const clash = await redeemRoute(
      post({
        code: "WH-TEST-0002",
        email: "one@example.com",
        password: "battery-staple",
      }),
    );

    expect(clash.status).toBe(409);
    await expect(clash.json()).resolves.toMatchObject({ error: "email_taken" });
    // Their second code survives, so they can retry with the right address.
    expect(codes.get("WH-TEST-0002")!.redeemed).toBe(false);
  });

  it("rejects a short password and a malformed email before touching the code", async () => {
    seedCode("WH-TEST-0001");

    const short = await redeemRoute(
      post({ code: "WH-TEST-0001", email: "one@example.com", password: "abc" }),
    );
    expect(short.status).toBe(400);
    await expect(short.json()).resolves.toMatchObject({
      error: "weak_password",
    });

    const malformed = await redeemRoute(
      post({
        code: "WH-TEST-0001",
        email: "not-an-email",
        password: "correct-horse",
      }),
    );
    expect(malformed.status).toBe(400);

    expect(codes.get("WH-TEST-0001")!.redeemed).toBe(false);
    expect(users.size).toBe(0);
  });

  it("never leaves an account holding access when cleanup fails", async () => {
    // Worst case: the code was already spent AND the tidy-up delete fails. What
    // must never survive is an account that can open the program.
    seedCode("WH-TEST-0001", { redeemed: true, redeemed_by: "user-99" });
    claimableLies = true;
    deleteUserFails = true;

    const response = await redeemRoute(
      post({
        code: "WH-TEST-0001",
        email: "second@example.com",
        password: "battery-staple",
      }),
    );

    expect(response.status).toBe(409);
    const leftover = [...users.values()];
    expect(leftover).toHaveLength(1);
    expect(leftover[0].app_metadata.program_access).toBeUndefined();
  });

  it("does not grant access when the claim lookup itself fails", async () => {
    seedCode("WH-TEST-0001");
    rpcFails = true;

    const response = await redeemRoute(
      post({
        code: "WH-TEST-0001",
        email: "one@example.com",
        password: "correct-horse",
      }),
    );

    expect(response.status).toBe(502);
    expect(codes.get("WH-TEST-0001")!.redeemed).toBe(false);
    expect(users.size).toBe(0);
  });

  it("reports misconfiguration separately, so the page does not blame the buyer", async () => {
    delete process.env.SUPABASE_URL;
    delete process.env.SUPABASE_SERVICE_ROLE_KEY;
    delete process.env.NEXT_PUBLIC_SUPABASE_URL;

    const response = await redeemRoute(
      post({
        code: "WH-TEST-0001",
        email: "one@example.com",
        password: "correct-horse",
      }),
    );

    expect(response.status).toBe(503);
    await expect(response.json()).resolves.toMatchObject({
      error: "not_configured",
    });
  });

  it("says the account is ready even when the sign-in behind it fails", async () => {
    seedCode("WH-TEST-0001");
    signInFails = true;

    const response = await redeemRoute(
      post({
        code: "WH-TEST-0001",
        email: "one@example.com",
        password: "correct-horse",
      }),
    );

    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toMatchObject({
      success: true,
      signedIn: false,
    });
    expect(codes.get("WH-TEST-0001")!.redeemed).toBe(true);
  });
});

describe("POST /api/auth/login", () => {
  async function seedAccount() {
    seedCode("WH-TEST-0001");
    await redeemRoute(
      post({
        code: "WH-TEST-0001",
        email: "one@example.com",
        password: "correct-horse",
      }),
    );
  }

  it("lets a returning athlete in with no code at all", async () => {
    await seedAccount();

    const response = await loginRoute(
      post({ email: "one@example.com", password: "correct-horse" }),
    );

    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toMatchObject({ success: true });
  });

  it("refuses an unknown email in the same words as a wrong password", async () => {
    await seedAccount();

    const unknown = await loginRoute(
      post({ email: "nobody@example.com", password: "correct-horse" }),
    );

    expect(unknown.status).toBe(401);
    await expect(unknown.json()).resolves.toMatchObject({
      error: "invalid_credentials",
    });
  });

  it("refuses an account whose code has been revoked, and strips its access", async () => {
    await seedAccount();
    codes.get("WH-TEST-0001")!.active = false;

    const response = await loginRoute(
      post({ email: "one@example.com", password: "correct-horse" }),
    );

    expect(response.status).toBe(403);
    await expect(response.json()).resolves.toMatchObject({
      error: "access_revoked",
    });
    expect(users.get("user-1")!.app_metadata.program_access).toBe(false);
  });

  it("repairs an account that redeemed a code but never got the claim", async () => {
    await seedAccount();
    // The state left behind if grantProgramAccess had failed.
    users.get("user-1")!.app_metadata = {};

    const response = await loginRoute(
      post({ email: "one@example.com", password: "correct-horse" }),
    );

    expect(response.status).toBe(200);
    expect(users.get("user-1")!.app_metadata.program_access).toBe(true);
  });

  it("refuses an account that never redeemed anything", async () => {
    // What an account registered straight against the anon key would look like.
    users.set("user-7", {
      id: "user-7",
      email: "gatecrasher@example.com",
      app_metadata: {},
    });

    const response = await loginRoute(
      post({ email: "gatecrasher@example.com", password: "correct-horse" }),
    );

    expect(response.status).toBe(403);
    await expect(response.json()).resolves.toMatchObject({
      error: "no_access",
    });
  });
});
