import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { publicSupabaseConfig } from "./config";

// ---------------------------------------------------------------------------
// The request-bound Supabase client.
//
// Supabase keeps a session in cookies, and it rewrites those cookies whenever
// it refreshes an expiring token. That refresh can happen inside any call —
// getUser(), signInWithPassword(), exchangeCodeForSession() — so every handler
// needs a way to get the new cookies onto whatever response it ends up
// returning.
//
// The shape below solves that: cookie writes are collected as they happen, and
// `commit(response)` stamps them onto the final response. Handlers build their
// response however they like (JSON, redirect, whatever) and pass it through
// commit on the way out. Forget to commit, and the refreshed session is lost —
// the visitor gets signed out at a random moment and nothing looks broken.
// ---------------------------------------------------------------------------

export type SessionClient = NonNullable<ReturnType<typeof createSessionClient>>;

export function createSessionClient(request: NextRequest) {
  const config = publicSupabaseConfig();
  if (!config) return null;

  const pending: Array<{
    name: string;
    value: string;
    options: Record<string, unknown>;
  }> = [];
  const pendingHeaders: Record<string, string> = {};

  const supabase = createServerClient(config.url, config.anonKey, {
    cookies: {
      getAll: () => request.cookies.getAll(),
      setAll: (cookiesToSet, headers) => {
        for (const cookie of cookiesToSet) {
          // Update the incoming request too, so anything later in the same
          // handler reads the refreshed token rather than the stale one.
          request.cookies.set(cookie.name, cookie.value);
          pending.push({
            name: cookie.name,
            value: cookie.value,
            options: cookie.options as Record<string, unknown>,
          });
        }
        Object.assign(pendingHeaders, headers ?? {});
      },
    },
  });

  /** Stamp any refreshed session cookies onto the outgoing response. */
  function commit<T extends NextResponse>(response: T): T {
    for (const cookie of pending) {
      response.cookies.set({
        name: cookie.name,
        value: cookie.value,
        ...cookie.options,
      });
    }
    for (const [key, value] of Object.entries(pendingHeaders)) {
      response.headers.set(key, value);
    }
    // Auth responses must never be cached: a CDN that held one would hand one
    // athlete's session to the next visitor.
    response.headers.set("Cache-Control", "no-store");
    return response;
  }

  return { supabase, commit };
}
