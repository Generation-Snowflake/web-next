import "./globals.css";
import type { Metadata, Viewport } from "next";
import { IBM_Plex_Mono, IBM_Plex_Sans_Thai } from "next/font/google";
import Chrome from "@/app/Chrome";
import { site } from "@/lib/site";

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

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "GSF Robotics & AI | Software house and robot supplier, Nonthaburi",
    template: "%s | GSF Robotics & AI",
  },
  description:
    "GSF Robotics & AI is a small engineering team in Pak Kret, Nonthaburi. We build AI, computer vision, robotics, IoT, web and mobile systems, and sell Makerzoid kits and our Armo and ArmoGo robots.",
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
  // og:image / twitter:image come from app/opengraph-image.tsx.
  openGraph: {
    title: "GSF Robotics & AI",
    description:
      "We write the software, and we sell the robots it runs on. AI, vision, ROS 2, IoT and apps, plus Makerzoid kits and Armo robot arms, from Pak Kret, Nonthaburi.",
    siteName: site.name,
    locale: "en_US",
    alternateLocale: ["th_TH"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "GSF Robotics & AI",
    description:
      "We write the software, and we sell the robots it runs on. From Pak Kret, Nonthaburi.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
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
              description: site.description,
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
        <Chrome>{children}</Chrome>
      </body>
    </html>
  );
}
