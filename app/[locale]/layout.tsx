import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { Oswald, Manrope, JetBrains_Mono } from "next/font/google";
import { LanguageProvider, type Locale } from "@/content/i18n";
import { locales, isLocale } from "@/lib/i18n/config";
import "../globals.css";

const display = Oswald({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});
const sans = Manrope({
  subsets: ["latin", "cyrillic"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-sans",
  display: "swap",
});
const mono = JetBrains_Mono({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600"],
  variable: "--font-mono",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3100";

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const viewport: Viewport = {
  themeColor: "#0b0a09",
  width: "device-width",
  initialScale: 1,
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const ru = locale === "ru";
  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: ru
        ? "Никита — Борцовская сила и взрывная мощь"
        : "Nikita — Wrestling Strength & Explosive Power",
      template: ru ? "%s | Никита" : "%s | Nikita",
    },
    description: ru
      ? "Курс силовой и взрывной подготовки на методах греко-римской борьбы. Автор — Никита, действующий член сборной России, КМС."
      : "A strength and explosive-power course built on greco-roman wrestling methods. By Nikita, active member of Russia's national team, Candidate Master of Sport.",
    openGraph: {
      title: ru ? "Куй железное тело" : "Forge an iron body",
      description: ru
        ? "Борцовская сила и взрывная мощь. Курс от Никиты."
        : "Wrestling strength and explosive power. A course by Nikita.",
      type: "website",
      locale: ru ? "ru_RU" : "en_US",
      images: [{ url: "/og.png", width: 1736, height: 909, alt: "Nikita" }],
    },
    twitter: {
      card: "summary_large_image",
      images: ["/og.png"],
    },
    alternates: {
      languages: { ru: "/ru", en: "/en" },
    },
    robots: { index: true, follow: true },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return (
    <html
      lang={locale}
      className={`${display.variable} ${sans.variable} ${mono.variable}`}
    >
      <body>
        <a
          href="#main-content"
          className="fixed left-3 top-3 z-[100] -translate-y-20 bg-[var(--ink)] px-4 py-2 text-[var(--bg)] focus:translate-y-0"
        >
          Skip to content
        </a>
        <LanguageProvider locale={locale as Locale}>
          <div className="grain-fixed" aria-hidden />
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
