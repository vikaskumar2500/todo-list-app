import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// // This function can be marked `async` if using `await` inside
export function middleware(req: NextRequest) {
  if (req.nextUrl.pathname === "/")
    return NextResponse.redirect(new URL("/today", req.url));
  return NextResponse.next();
}
