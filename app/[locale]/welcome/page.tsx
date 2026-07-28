import type { Metadata } from "next";
import { SalesPage } from "@/components/sales-page";

export const metadata: Metadata = { title: "Strength has a home", description: "Explore Nikita's eight-week Greco-Roman strength and conditioning program." };
export default function Page() { return <SalesPage />; }
