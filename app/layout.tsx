import "./globals.css";
import SmoothScroll from "@/app/SmoothScroll";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "GSF Robotics & AI | รับทำหุ่นยนต์ AI IoT และ Software House ครบวงจร",
  description:
    "GSF Robotics & AI รับทำหุ่นยนต์ พัฒนา AI ระบบ IoT และ Web Application โดยทีมงานคนรุ่นใหม่ เชี่ยวชาญด้าน Automation และ Data Engineering",
  keywords: [
    "หุ่นยนต์",
    "รับทำหุ่นยนต์",
    "Robot",
    "AI",
    "IoT",
    "Web Development",
    "Data Engineering",
    "Software House",
    "Automation",
    "ปัญญาประดิษฐ์",
  ],
  authors: [{ name: "GSF Team" }],
  openGraph: {
    title: "GSF Robotics & AI | รับทำหุ่นยนต์ AI IoT และ Software House",
    description:
      "บริการรับทำหุ่นยนต์ พัฒนา AI ระบบ IoT และ Web Application ครบวงจร โดยทีมวิศวกรคนรุ่นใหม่",
    url: "https://gsf-robotics.com",
    siteName: "GSF Robotics & AI",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "GSF Robotics & AI - รับทำหุ่นยนต์",
      },
    ],
    locale: "th_TH",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "GSF Robotics & AI | รับทำหุ่นยนต์ AI IoT",
    description:
      "บริการรับทำหุ่นยนต์ พัฒนา AI ระบบ IoT และ Web Application ครบวงจร",
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
    <html lang="th" className="scroll-smooth">
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
                "GSF Robotics & AI รับทำหุ่นยนต์ พัฒนา AI ระบบ IoT และ Web Application",
              contactPoint: {
                "@type": "ContactPoint",
                contactType: "customer service",
                areaServed: "TH",
                availableLanguage: ["Thai", "English"],
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
        <SmoothScroll />

        <Navbar />

        <main className="relative z-10">{children}</main>

        <Footer />
      </body>
    </html>
  );
}
