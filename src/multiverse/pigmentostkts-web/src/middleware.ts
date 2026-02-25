import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Simple middleware that does NOT import auth/prisma (which fails in Edge Runtime).
// The auth() function is used in server components/API routes (Node.js runtime) instead.
export function middleware(request: NextRequest) {
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|uploads|view-design|brand|materials|cut-types|project-types|_next/static|_next/image|favicon.ico).*)"],
};
