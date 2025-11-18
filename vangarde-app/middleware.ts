import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const pathname = req.nextUrl.pathname;

  // Skip API routes
  if (pathname.startsWith("/api")) {
    return NextResponse.next();
  }

  // Skip static assets
  if (pathname.startsWith("/_next") || pathname.includes(".")) {
    return NextResponse.next();
  }

  // If NO token and trying to access protected routes → go to /
  if (!token && (pathname.startsWith("/dashboard") || pathname.startsWith("/app"))) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // If HAS token and at / → go to /dashboard
  if (token && pathname === "/") {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Only check these specific paths
    "/",
    "/dashboard/:path*",
    "/app/:path*",
  ],
};
