import type { Metadata } from "next";
import { TrainingProduct } from "@/components/training-product";

export const metadata: Metadata = {
  title: "Roller and ball",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <TrainingProduct view="mobility" />;
}
