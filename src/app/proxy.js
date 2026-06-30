// middleware.ts (or proxy.js if you're using a custom proxy setup)

import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";

const publicRoutes = [
  "/signin",
  "/signup",
  "/choose-role",
];

export async function middleware(request) {
  const { pathname } = request.nextUrl;

  // Skip Next.js internals and static assets
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/favicon.ico") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  const session = await auth.api.getSession({
    headers: request.headers,
  });

  const isPublicRoute = publicRoutes.includes(pathname);

  // User is NOT logged in
  if (!session) {
    if (isPublicRoute) {
      return NextResponse.next();
    }

    return NextResponse.redirect(new URL("/signin", request.url));
  }

  // Logged in but has not selected a role
  if (!session.user.role && pathname !== "/choose-role") {
    return NextResponse.redirect(new URL("/choose-role", request.url));
  }

  // Logged in and already has a role, don't let them visit auth pages
  if (
    session.user.role &&
    (pathname === "/signin" ||
      pathname === "/signup" ||
      pathname === "/choose-role")
  ) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};