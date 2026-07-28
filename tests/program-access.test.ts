import { describe, expect, it } from "vitest";
import {
  ACCESS_PATH,
  RESET_PATH,
  isAccessPath,
  isAuthPath,
  isProtectedProgramPath,
  safeReturnPath,
  stripLocale,
} from "../lib/program-access";

describe("access routing", () => {
  it.each([
    "/",
    "/ru",
    "/en",
    "/ru/training/program",
    "/en/dashboard",
    "/ru/onboarding",
    "/en/welcome",
  ])("protects %s", (pathname) => {
    expect(isProtectedProgramPath(pathname)).toBe(true);
  });

  it.each([
    "/ru/program",
    "/en/method",
    "/ru/coach",
    "/en/faq",
    "/ru/privacy",
    "/en/health-disclaimer",
  ])("keeps %s public", (pathname) => {
    expect(isProtectedProgramPath(pathname)).toBe(false);
  });

  it.each(["/access", "/ru/access", "/en/access"])(
    "never gates the access page itself (%s), or the redirect would loop",
    (pathname) => {
      expect(isProtectedProgramPath(pathname)).toBe(false);
      expect(isAccessPath(pathname)).toBe(true);
      expect(isAuthPath(pathname)).toBe(true);
    },
  );

  it.each(["/reset-password", "/ru/reset-password", "/en/reset-password"])(
    "never gates the password reset page (%s) — the email lands there without a session",
    (pathname) => {
      expect(isProtectedProgramPath(pathname)).toBe(false);
      expect(isAuthPath(pathname)).toBe(true);
    },
  );

  it("strips the locale prefix once", () => {
    expect(stripLocale("/ru/training")).toBe("/training");
    expect(stripLocale("/en")).toBe("/");
    expect(stripLocale("/training")).toBe("/training");
    expect(ACCESS_PATH).toBe("/access");
    expect(RESET_PATH).toBe("/reset-password");
  });
});

describe("return path after sign-in", () => {
  it("keeps a same-site path", () => {
    expect(safeReturnPath("/ru/training/program", "ru")).toBe(
      "/ru/training/program",
    );
  });

  it("falls back to the program home when there is nothing to return to", () => {
    expect(safeReturnPath(null, "ru")).toBe("/ru");
    expect(safeReturnPath("", "en")).toBe("/en");
  });

  it.each([
    "https://evil.example/steal",
    "//evil.example/steal",
    "\\/evil.example",
    "/\\evil.example",
  ])(
    "refuses %s, so the login cannot be turned into an open redirect",
    (from) => {
      expect(safeReturnPath(from, "ru")).toBe("/ru");
    },
  );

  it("does not bounce back into the sign-in flow", () => {
    expect(safeReturnPath("/ru/access", "ru")).toBe("/ru");
    expect(safeReturnPath("/en/reset-password", "en")).toBe("/en");
  });

  it("allows the reset page when it is the intended destination", () => {
    // What /auth/callback does with the link out of the email.
    expect(safeReturnPath("/en/reset-password", "en", ["/reset-password"])).toBe(
      "/en/reset-password",
    );
  });
});
