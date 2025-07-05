import { NextResponse, NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const accessToken = request.cookies.get("access_token")?.value;
  const refreshToken = request.cookies.get("refresh_token")?.value;

  const publicRoutes = ["/login"];
  const isPublic = publicRoutes.includes(pathname);
  const isAuth = Boolean(accessToken || refreshToken);

  // Khusus untuk route "/", arahkan sesuai status login
  if (pathname === "/") {
    if (isAuth) {
      return NextResponse.redirect(new URL("/inventory", request.url));
    } else {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  // Jika sudah login dan mencoba akses public route, redirect ke /inventory
  if (isAuth && isPublic) {
    return NextResponse.redirect(new URL("/inventory", request.url));
  }

  // Jika belum login dan mencoba akses protected route, redirect ke /login
  if (!isAuth && !isPublic) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
