import "./globals.css";
import type { Metadata, Viewport } from "next";
import { Anuphan, IBM_Plex_Mono, IBM_Plex_Sans_Thai } from "next/font/google";
import Chrome from "@/app/Chrome";
import { site } from "@/lib/site";

const anuphan = Anuphan({
  subsets: ["latin", "thai"],
  variable: "--font-anuphan",
  display: "swap",
});
const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
  display: "swap",
});
// Thai fallback for the mono stack (Plex Mono has no Thai glyphs).
const plexThai = IBM_Plex_Sans_Thai({
  subsets: ["thai"],
  weight: ["400", "500"],
  variable: "--font-plex-thai",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#FFFFFF",
};

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "GSF Robotics & AI | Software house and robot supplier, Nonthaburi",
    template: "%s | GSF Robotics & AI",
  },
  description:
    "GSF Robotics & AI is a small engineering team in Pak Kret, Nonthaburi. We build AI, computer vision, robotics, IoT, web and mobile systems, and sell Makerzoid kits and LeRobot arms.",
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
      "We write the software, and we sell the robots it runs on. AI, vision, ROS 2, IoT and apps, plus Makerzoid kits and LeRobot arms, from Pak Kret, Nonthaburi.",
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
      className={`scroll-smooth ${anuphan.variable} ${plexMono.variable} ${plexThai.variable}`}
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
