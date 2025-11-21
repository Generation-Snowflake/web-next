import "./globals.css";
import SmoothScroll from "@/app/SmoothScroll";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "GSF Robotics & AI",
  description:
    "Modern Software House — Robotics, AI, IoT, Web, Data Engineering by Young Generation",
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="relative bg-darkbg text-softwhite">
        <SmoothScroll />

        <Navbar />

        <main className="pt-20">{children}</main>

        <Footer />
      </body>
    </html>
  );
}
