import Navbar, { HideOnRoutes } from "@/components/Navbar";
import Footer from "@/components/Footer";

// Routes that render full-bleed without the site navbar/footer.
const BARE_ROUTES = ["/demo3d", "/power-plant"];

/**
 * Site shell. A server component so the Footer stays server-rendered; only the
 * small route check (HideOnRoutes) and the Navbar run on the client.
 */
export default function Chrome({ children }: { children: React.ReactNode }) {
  return (
    <>
      <HideOnRoutes routes={BARE_ROUTES}>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-sm focus:bg-ink focus:px-4 focus:py-2.5 focus:text-sm focus:font-medium focus:text-paper"
        >
          Skip to content
        </a>
        <Navbar />
      </HideOnRoutes>
      <main id="main" tabIndex={-1} className="relative z-10 focus:outline-none">
        {children}
      </main>
      <HideOnRoutes routes={BARE_ROUTES}>
        <Footer />
      </HideOnRoutes>
    </>
  );
}
