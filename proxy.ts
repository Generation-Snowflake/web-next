import { NextResponse, type NextRequest } from "next/server";

// English lives at the unprefixed URLs (/about) and Thai under /th (/th/about).
// Both are rendered by app/[lang]; this rewrites unprefixed requests to
// /en/... without changing the address bar.
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (pathname === "/th" || pathname.startsWith("/th/") || pathname === "/en" || pathname.startsWith("/en/")) {
    return NextResponse.next();
  }
  const url = request.nextUrl.clone();
  url.pathname = `/en${pathname === "/" ? "" : pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  // Skip Next internals and any path with a file extension (public files,
  // icon.png, sitemap.xml, robots.txt).
  matcher: ["/((?!_next/|api/|.*\\..*).*)"],
};
