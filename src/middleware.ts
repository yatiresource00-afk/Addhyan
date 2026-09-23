import { NextResponse, type NextRequest } from "next/server";
import { jwtVerify } from "jose";
import { SESSION_COOKIE } from "@/lib/auth/constants";

function secretKey() {
  const secret = process.env.AUTH_SECRET;
  if (secret && secret.length >= 16) {
    return new TextEncoder().encode(secret);
  }
  if (process.env.NODE_ENV === "production") return null;
  return new TextEncoder().encode("dev-only-addhyan-auth-secret");
}

type SessionPayload = {
  role?: string;
};

async function readSession(request: NextRequest): Promise<SessionPayload | null> {
  const token = request.cookies.get(SESSION_COOKIE)?.value;
  const key = secretKey();
  if (!token || !key) return null;
  try {
    const { payload } = await jwtVerify(token, key);
    return { role: typeof payload.role === "string" ? payload.role : undefined };
  } catch {
    return null;
  }
}

function isStaff(role?: string) {
  return role === "MODERATOR" || role === "DIRECTOR";
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const session = await readSession(request);
  const signedIn = Boolean(session);

  if (signedIn && (pathname === "/login" || pathname === "/register")) {
    const dest = isStaff(session?.role) ? "/admin" : "/learn";
    return NextResponse.redirect(new URL(dest, request.url));
  }

  if (signedIn && !isStaff(session?.role) && pathname === "/admin/signup") {
    return NextResponse.redirect(new URL("/learn", request.url));
  }

  if (signedIn && isStaff(session?.role) && (pathname === "/admin/login" || pathname === "/admin/signup")) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  if (!signedIn && (pathname === "/account" || pathname.startsWith("/learn"))) {
    const login = new URL("/login", request.url);
    login.searchParams.set("next", pathname);
    return NextResponse.redirect(login);
  }

  if (
    !signedIn &&
    pathname.startsWith("/admin") &&
    pathname !== "/admin/login"
  ) {
    const login = new URL("/admin/login", request.url);
    login.searchParams.set("next", pathname);
    return NextResponse.redirect(login);
  }

  if (
    signedIn &&
    !isStaff(session?.role) &&
    pathname.startsWith("/admin") &&
    pathname !== "/admin/login" &&
    pathname !== "/admin/signup"
  ) {
    return NextResponse.redirect(new URL("/learn", request.url));
  }

  if (signedIn && pathname.startsWith("/learn") && isStaff(session?.role)) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  if (!signedIn && pathname.startsWith("/dashboard")) {
    const login = new URL("/login", request.url);
    login.searchParams.set("next", pathname);
    return NextResponse.redirect(login);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/account/:path*",
    "/dashboard/:path*",
    "/learn/:path*",
    "/admin/:path*",
    "/login",
    "/register",
  ],
};
