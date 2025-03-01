import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";

export async function middleware(req: Request) {
  const session = await getSession();
    console.log({ session });
  // If there is no session, redirect to login
  if (!session?.user) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

// Apply the middleware to all routes in the [domain] directory
export const config = {
  matcher: "/:path*",
}; 