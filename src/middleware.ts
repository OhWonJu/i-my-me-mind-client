import { NextRequest, NextResponse } from "next/server";

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|fonts|images).*)"],
};

const publicPath = ["/"];

export async function middleware(request: NextRequest) {
  if (
    request.nextUrl.pathname === "/" &&
    request.cookies.has("immmd_access_token") &&
    request.cookies.has("immmd_refresh_token")
  ) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (
    !publicPath.includes(request.nextUrl.pathname) &&
    (!request.cookies.has("immmd_access_token") ||
      !request.cookies.has("immmd_refresh_token"))
  ) {
    return NextResponse.redirect(new URL("/", request.url));
  }
}

export default middleware;
