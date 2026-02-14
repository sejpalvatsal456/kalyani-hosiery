import { NextRequest, NextResponse } from "next/server"
import { jwtVerify } from "jose";

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET);

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  console.log('Middleware hit!');

  // Check only for /auth/signup
  if (pathname === "/auth/signup") {
    const user_token = request.cookies.get("user_token");
    if (user_token) {
        try {
            await jwtVerify(user_token.value, JWT_SECRET);
            const homeUrl = new URL("/", request.url);
            return NextResponse.redirect(homeUrl);
        } catch (error) {
            const response = NextResponse.next();
            response.cookies.delete('user_token');
            return response;
        }

    }

    const tempPhone = request.cookies.get("tempPhone");
    if (!tempPhone) {
      const verifyUrl = new URL("/auth/verifyPhone", request.url);
      return NextResponse.redirect(verifyUrl);
    }
  }

  return NextResponse.next();
}