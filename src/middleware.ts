import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { isTokenExpired } from "./lib/cookiePaser";
import { ResponseCookies } from "next/dist/compiled/@edge-runtime/cookies";

export const config = {
  matcher: ["/", "/dashboard", "/workflow", "/workflow/:path*"],
};

const publicPath = ["/"];

export async function middleware(request: NextRequest) {
  const API_URL = process.env.NEXT_PUBLIC_SERVER_URL;

  const isPublicPath = publicPath.includes(request.nextUrl.pathname);
  const cookieStore = cookies();

  const accesstoken = cookieStore.get("immmd_access_token");
  const refreshtoken = cookieStore.get("immmd_refresh_token");
  const expiresAt = cookieStore.get("immmd_key");

  if (!accesstoken?.value || !refreshtoken?.value || !expiresAt?.value) {
    if (!isPublicPath) return NextResponse.redirect(new URL("/", request.url));
    return NextResponse.next();
  }

  const isExpired = isTokenExpired(Number(expiresAt?.value));

  if (isExpired) {
    try {
      const response = await fetch(`${API_URL}/auth/v1/refresh`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          cookie: `immmd_access_token=${accesstoken.value}; immmd_refresh_token=${refreshtoken.value}`,
        },
        credentials: "include",
      });

      if (!response.ok) {
        if (!isPublicPath) {
          return NextResponse.redirect(new URL("/", request.url));
        }
        return NextResponse.next();
      }

      if (response.ok) {
        const res = isPublicPath
          ? NextResponse.redirect(new URL("/dashboard", request.url))
          : NextResponse.next();
        // const responseCookies = new ResponseCookies(response.headers);

        // const accessToken = responseCookies.get("immmd_access_token");
        // const refreshToken = responseCookies.get("immmd_refresh_token");
        // const serviceKey = responseCookies.get("immmd_key");

        const setCookieHeaders = response.headers
          .get("Set-Cookie")
          ?.split(", ");

        setCookieHeaders?.forEach((cookie) => {
          res.headers.append("Set-Cookie", cookie);
        });

        // if (accessToken) {
        //   res.cookies.set("immmd_access_token", accessToken.value, {
        //     httpOnly: accessToken.httpOnly,
        //     sameSite: accessToken.sameSite,
        //     path: accessToken.path,
        //     secure: accessToken.secure,
        //   });
        // }

        // if (refreshToken) {
        //   res.cookies.set("immmd_refresh_token", refreshToken.value, {
        //     httpOnly: refreshToken.httpOnly,
        //     sameSite: refreshToken.sameSite,
        //     path: refreshToken.path,
        //     secure: refreshToken.secure,
        //   });
        // }

        // if (serviceKey) {
        //   res.cookies.set("immmd_key", serviceKey.value, {
        //     httpOnly: serviceKey.httpOnly,
        //     sameSite: serviceKey.sameSite,
        //     path: serviceKey.path,
        //     secure: serviceKey.secure,
        //   });
        // }

        return res;
      }
    } catch (error) {
      console.error("엑세스 토큰 재발급 중 오류 발생:", error);
      return NextResponse.redirect(new URL("/", request.url));
    }
  } else {
    if (
      isPublicPath &&
      request.cookies.has("immmd_access_token") &&
      request.cookies.has("immmd_refresh_token")
    ) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
    if (
      !isPublicPath &&
      (!request.cookies.has("immmd_access_token") ||
        !request.cookies.has("immmd_refresh_token"))
    ) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }
}

export default middleware;
