import type { Metadata } from "next";
import { TrainingProduct } from "@/components/training-product";

export const metadata: Metadata = {
  title: "Injury and return",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <TrainingProduct view="injury" />;
}
