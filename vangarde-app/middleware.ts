import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

const protectedRoutes = ["/dashboard", "/app"];
const adminRoutes = ["/admin"];

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const { pathname } = req.nextUrl;

  if (!token && protectedRoutes.some((p) => pathname.startsWith(p))) {
    const url = new URL("/api/auth/signin", req.url);
    url.searchParams.set("callbackUrl", req.url);
    return NextResponse.redirect(url);
  }

  if (token && adminRoutes.some((p) => pathname.startsWith(p))) {
    const role = (token as any).role;
    if (!["admin", "architect"].includes(role)) {
      return NextResponse.redirect(new URL("/403", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/app/:path*", "/admin/:path*"],
};
