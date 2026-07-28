import type { Metadata } from "next";
import { Suspense } from "react";
import { AccessScreen } from "@/components/access-screen";

export const metadata: Metadata = {
  title: "Access",
  robots: { index: false, follow: false },
};

export default function Page() {
  // useSearchParams (the ?from= return path) needs a Suspense boundary.
  return (
    <Suspense>
      <AccessScreen />
    </Suspense>
  );
}
