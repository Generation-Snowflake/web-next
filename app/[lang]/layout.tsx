import "../globals.css";
import type { Metadata, Viewport } from "next";
import { IBM_Plex_Mono, IBM_Plex_Sans_Thai } from "next/font/google";
import Chrome from "@/app/Chrome";
import { isLang, locales, ogLocale, type Lang } from "@/lib/i18n";
import { getSite, site } from "@/lib/site";

// Brand typeface (Brand Guidelines, Typography): IBM Plex Sans Thai for Thai
// and English, in the four CI weights.
const plexThai = IBM_Plex_Sans_Thai({
  subsets: ["latin", "thai"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-plex-thai",
  display: "swap",
});
// Prices, SKUs and spec values.
const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-plex-mono",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#F6FAFC",
};

const copy = {
  en: {
    title: "GSF Robotics & AI | Software house and robot supplier, Nonthaburi",
    description:
      "GSF Robotics & AI is a small engineering team in Pak Kret, Nonthaburi. We build AI, computer vision, robotics, IoT, web and mobile systems, and sell Makerzoid kits and our Armo and ArmoGo robots.",
    ogDescription:
      "We write the software, and we sell the robots it runs on. AI, vision, ROS 2, IoT and apps, plus Makerzoid kits and Armo robot arms, from Pak Kret, Nonthaburi.",
    twitterDescription: "We write the software, and we sell the robots it runs on. From Pak Kret, Nonthaburi.",
  },
  th: {
    title: "GSF Robotics & AI | รับพัฒนาซอฟต์แวร์และจำหน่ายหุ่นยนต์ นนทบุรี",
    description:
      "GSF Robotics & AI ทีมวิศวกรขนาดเล็กที่ปากเกร็ด นนทบุรี รับพัฒนาระบบ AI, Computer Vision, หุ่นยนต์, IoT, เว็บและแอปมือถือ และจำหน่ายชุดหุ่นยนต์ Makerzoid กับหุ่นยนต์ Armo และ ArmoGo",
    ogDescription:
      "เราเขียนซอฟต์แวร์ และขายหุ่นยนต์ที่ซอฟต์แวร์นั้นทำงานอยู่ AI, Vision, ROS 2, IoT และแอป พร้อมชุดหุ่นยนต์ Makerzoid และแขนกล Armo จากปากเกร็ด นนทบุรี",
    twitterDescription: "เราเขียนซอฟต์แวร์ และขายหุ่นยนต์ที่ซอฟต์แวร์นั้นทำงานอยู่ จากปากเกร็ด นนทบุรี",
  },
} as const;

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang: raw } = await params;
  const lang: Lang = isLang(raw) ? raw : "en";
  const c = copy[lang];
  return {
    metadataBase: new URL(site.url),
    title: {
      default: c.title,
      template: "%s | GSF Robotics & AI",
    },
    description: c.description,
    applicationName: site.name,
    keywords: [
      "software house Thailand",
      "custom software development",
      "AI development",
      "machine learning",
      "computer vision",
      "robotics",
      "ROS 2",
      "IoT",
      "web application development",
      "mobile app development",
      "data engineering",
      "Armo",
      "ArmoGo",
      "LeRobot",
      "SO-101",
      "XLeRobot",
      "Makerzoid",
      "STEM robotics kits",
      "รับพัฒนาซอฟต์แวร์",
      "หุ่นยนต์",
      "คอร์สหุ่นยนต์",
      "ชุดหุ่นยนต์ STEM",
    ],
    authors: [{ name: site.name, url: site.url }],
    creator: site.name,
    publisher: site.legalName,
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    // og:image / twitter:image come from app/[lang]/opengraph-image.tsx.
    openGraph: {
      title: "GSF Robotics & AI",
      description: c.ogDescription,
      siteName: site.name,
      locale: ogLocale[lang],
      alternateLocale: [ogLocale[lang === "en" ? "th" : "en"]],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "GSF Robotics & AI",
      description: c.twitterDescription,
    },
  };
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang: raw } = await params;
  const lang: Lang = isLang(raw) ? raw : "en";
  const s = getSite(lang);
  return (
    <html
      lang={lang}
      className={`scroll-smooth ${plexThai.variable} ${plexMono.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: site.name,
              url: site.url,
              logo: `${site.url}/logo.png`,
              description: s.description,
              email: site.email,
              telephone: site.phones[0].href.replace("tel:", ""),
              address: {
                "@type": "PostalAddress",
                addressLocality: site.address.locality,
                addressCountry: "TH",
              },
              contactPoint: {
                "@type": "ContactPoint",
                contactType: "sales",
                email: site.email,
                areaServed: "TH",
                availableLanguage: ["English", "Thai"],
              },
              sameAs: site.social.map((s) => s.href),
            }),
          }}
        />
      </head>
      <body className="relative bg-paper font-sans text-ink antialiased">
        <Chrome lang={lang}>{children}</Chrome>
      </body>
    </html>
  );
}
