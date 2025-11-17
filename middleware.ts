import { NextRequest, NextResponse } from "next/server";

const PUBLIC_PATHS = ["/auth", "/search", "/"];

export function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;
  const accessToken = req.cookies.get("access_token");
  const refreshToken = req.cookies.get("refresh_token");

  if (accessToken && (pathname === "/" || pathname.startsWith("/auth"))) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  if (
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/static") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  const isPublicPath = PUBLIC_PATHS.some((path) => {
    if (path === "/") {
      return pathname === path;
    }
    return pathname.startsWith(path);
  });

  if (isPublicPath) {
    return NextResponse.next();
  }

  if (!accessToken && !refreshToken) {
    return NextResponse.redirect(new URL("/auth", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
