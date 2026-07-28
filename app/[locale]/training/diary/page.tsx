import type { Metadata } from "next";
import { TrainingProduct } from "@/components/training-product";

export const metadata: Metadata = {
  title: "Diary",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <TrainingProduct view="diary" />;
}
