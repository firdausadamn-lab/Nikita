import type { Metadata } from "next";
import { ResetPasswordScreen } from "@/components/reset-password-screen";

export const metadata: Metadata = {
  title: "New password",
  robots: { index: false, follow: false },
};

// Public by design: somebody arriving from a reset email has a session, but
// somebody arriving from an expired one does not, and they need to be told
// that rather than bounced to a login page with no explanation.
export default function Page() {
  return <ResetPasswordScreen />;
}
