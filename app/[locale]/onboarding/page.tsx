import type { Metadata } from "next";
import { OnboardingExperience } from "@/components/onboarding-experience";

export const metadata: Metadata = { title: "Member setup", robots: { index: false, follow: false } };
export default function Page() { return <OnboardingExperience />; }
