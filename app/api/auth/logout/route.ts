import { NextResponse, type NextRequest } from "next/server";
import { createSessionClient } from "@/lib/supabase/session";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Sign out. signOut() clears the session cookies through the same setAll hook
// the rest of auth uses, so commit() is what actually lands them on the
// response — without it the browser keeps a session the server has already
// thrown away.
export async function POST(request: NextRequest) {
  const session = createSessionClient(request);

  if (!session) {
    return NextResponse.json(
      { success: true },
      { headers: { "Cache-Control": "no-store" } },
    );
  }

  await session.supabase.auth.signOut();
  return session.commit(NextResponse.json({ success: true }));
}
