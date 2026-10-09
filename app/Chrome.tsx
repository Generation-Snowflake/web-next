import Navbar, { HideOnRoutes } from "@/components/Navbar";
import Footer from "@/components/Footer";
import { LangProvider } from "@/components/i18n/LangProvider";
import type { Lang } from "@/lib/i18n";
import RobotCompanionMount from "@/components/robot-companion/RobotCompanionMount";

// Routes that render full-bleed without the site navbar/footer.
const BARE_ROUTES: string[] = [];

/**
 * Site shell. A server component so the Footer stays server-rendered; only the
 * small route check (HideOnRoutes) and the Navbar run on the client.
 */
export default function Chrome({ lang, children }: { lang: Lang; children: React.ReactNode }) {
  return (
    <LangProvider lang={lang}>
      <HideOnRoutes routes={BARE_ROUTES}>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-sm focus:bg-ink focus:px-4 focus:py-2.5 focus:text-sm focus:font-medium focus:text-paper"
        >
          {lang === "th" ? "ข้ามไปยังเนื้อหา" : "Skip to content"}
        </a>
        <Navbar lang={lang} />
      </HideOnRoutes>
      <main id="main" tabIndex={-1} className="relative z-10 focus:outline-none">
        {children}
      </main>
      <HideOnRoutes routes={BARE_ROUTES}>
        <Footer lang={lang} />
        {/* One fixed, transparent WebGL canvas for the whole site; it stays
            mounted across route changes so the robot flies between pages. */}
        <RobotCompanionMount />
      </HideOnRoutes>
    </LangProvider>
  );
}
