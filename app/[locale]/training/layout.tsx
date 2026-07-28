import type { Metadata } from "next";
export const metadata: Metadata = { title: "Training program", robots: { index: false, follow: false } };
export default function TrainingLayout({ children }: { children: React.ReactNode }) { return children; }
