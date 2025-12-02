import "./globals.css";
import SmoothScroll from "@/app/SmoothScroll";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "GSF Robotics & AI | Modern Software House",
  description:
    "GSF is a modern software house specializing in Robotics, AI, IoT, Web Development, and Data Engineering. Built by the next generation of innovators.",
  keywords: ["Robotics", "AI", "IoT", "Web Development", "Data Engineering", "Software House"],
  authors: [{ name: "GSF Team" }],
  openGraph: {
    title: "GSF Robotics & AI | Modern Software House",
    description:
      "Modern Software House — Robotics, AI, IoT, Web, Data Engineering by Young Generation",
    url: "https://gsf-robotics.com",
    siteName: "GSF Robotics & AI",
    images: [
      {
        url: "/og-image.png", // Ensure this image exists or is created
        width: 1200,
        height: 630,
        alt: "GSF Robotics & AI",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "GSF Robotics & AI",
    description:
      "Modern Software House — Robotics, AI, IoT, Web, Data Engineering by Young Generation",
    images: ["/og-image.png"],
  },
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
  viewport: "width=device-width, initial-scale=1",
  themeColor: "#0A0F1F",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="relative bg-darkbg text-softwhite font-sans antialiased overflow-x-hidden selection:bg-ice selection:text-darkbg">
        <SmoothScroll />

        <Navbar />

        <main className="relative z-10">{children}</main>

        <Footer />
      </body>
    </html>
  );
}
