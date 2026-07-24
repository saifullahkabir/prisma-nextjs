import { redirect } from "next/navigation";
import jwt, { JwtPayload } from "jsonwebtoken";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

const AUTH_ROUTES = ["/login", "/register"];
// const PUBLIC_ROUTES = ["/", "/news", "/login", "/register"];
const PUBLIC_ROUTES = ["/", "/news"];

// This function can be marked `async` if using `await` inside
export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  //   const cookieStore = await cookies();
  //   const accessToken = cookieStore.get("accessToken")?.value;

  const accessToken = request.cookies.get("accessToken")?.value;

  const decodedToken = accessToken
    ? (jwt.decode(accessToken) as JwtPayload)
    : null;

  let userRole = null;

  if (decodedToken) {
    userRole = decodedToken.role;
  }

  //* user is logged in and trying to access login or register page, redirect to dashboard or home page
  if (accessToken && AUTH_ROUTES.includes(pathname)) {
    if (userRole === "USER") {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    } else if (userRole === "AUTHOR") {
      return NextResponse.redirect(new URL("/author-dashboard", request.url));
    } else if (userRole === "ADMIN") {
      return NextResponse.redirect(new URL("/admin-dashboard", request.url));
    } else {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  const isPublicRoute = PUBLIC_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(route + "/"),
  );

  const isAuthRoute = AUTH_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(route + "/"),
  );

  //* authenticated pages protection
  if (!accessToken && !isPublicRoute && !isAuthRoute) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  //* authorization: roled based access control
  if (pathname.startsWith("/dashboard") && userRole !== "USER") {
    return NextResponse.redirect(new URL("/", request.url));
  } else if (
    pathname.startsWith("/author-dashboard") &&
    userRole !== "AUTHOR"
  ) {
    return NextResponse.redirect(new URL("/", request.url));
  } else if (pathname.startsWith("/admin-dashboard") && userRole !== "ADMIN") {
    return NextResponse.redirect(new URL("/", request.url));
  }

  //   return NextResponse.redirect(new URL("/", request.url));
  return NextResponse.next();
}

export const config = {
  matcher: [
    // "/dashboard/:path*",
    // "/admin-dashboard/:path*",
    // "/author-dashboard/:path*",
    "/((?!api|_next/static|favicon.ico|_next/image|.*\\.png$).*)",
  ],
};
