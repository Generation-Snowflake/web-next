import "./globals.css";
import { Inter, Outfit } from "next/font/google";
import Chrome from "@/app/Chrome";

// Self-hosted via next/font: no render-blocking external @import, offline-safe,
// font-display: swap. --font-inter (body/display) and --font-outfit (brand mark).
const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-inter",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata = {
  title: {
    default: "GSF Robotics & AI | Robotics, AI, IoT & Full-Stack Software House",
    template: "%s | GSF Robotics & AI",
  },
  description:
    "GSF Robotics & AI provides expert services in Robotics, AI, IoT, and Web Application development by a team of specialized engineers. Find the best automation solutions for your business.",
  keywords: [
    "Robotics",
    "Robot Maker",
    "Automation",
    "AI",
    "Machine Learning",
    "IoT",
    "Internet of Things",
    "Web Development",
    "Software House",
    "Data Engineering",
    "System Integrator",
    "ROS2",
    "Computer Vision",
  ],
  authors: [{ name: "GSF Team" }],
  creator: "GSF Robotics & AI",
  publisher: "GSF Robotics & AI",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "https://gsf-robotics.com",
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
  openGraph: {
    title: "GSF Robotics & AI | Robotics, AI, IoT & Software House",
    description:
      "Full-service Robotics, AI, IoT, and Web Application development by a team of innovative engineers. Driving business with modern technology.",
    url: "https://gsf-robotics.com",
    siteName: "GSF Robotics & AI",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "GSF Robotics & AI - Leading Automation Solutions",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "GSF Robotics & AI | Robotics, AI, IoT Development",
    description:
      "Full-service Robotics, AI, IoT, and Web Application development by a team of innovative engineers.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#050A14",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "GSF Robotics & AI",
              url: "https://gsf-robotics.com",
              logo: "https://gsf-robotics.com/logo.png",
              description:
                "GSF Robotics & AI provides expert services in Robotics, AI, IoT, and Web Application development.",
              contactPoint: {
                "@type": "ContactPoint",
                contactType: "customer service",
                areaServed: "Global",
                availableLanguage: ["English", "Thai"],
              },
              sameAs: [
                "https://www.facebook.com/gsfrobotics",
                // Add other social links here if available
              ],
            }),
          }}
        />
      </head>
      <body className="relative bg-darkbg text-softwhite font-sans antialiased overflow-x-hidden selection:bg-ice selection:text-darkbg">
        <Chrome>{children}</Chrome>
      </body>
    </html>
  );
}
