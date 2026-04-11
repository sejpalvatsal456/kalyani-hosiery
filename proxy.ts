import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET);

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  console.log("Middleware hit!"); // Only for debugging purpose fr.

  if (pathname === "/") {
    const user_token = request.cookies.get("user_token");
    if (user_token) {
      try {
        await jwtVerify(user_token.value, JWT_SECRET);
        return NextResponse.next();
      } catch (error) {
        const response = NextResponse.next();
        response.cookies.delete("user_token");
        return response;
      }
    }
    return NextResponse.next();
  }

  // Check only or /auth/login
  if (pathname === "/auth/login") {
    const user_token = request.cookies.get("user_token");
    if (user_token) {
      try {
        await jwtVerify(user_token.value, JWT_SECRET);
        const homeUrl = new URL("/", request.url);
        return NextResponse.redirect(homeUrl);
      } catch (error) {
        const response = NextResponse.next();
        response.cookies.delete("user_token");
        return response;
      }
    }
  }

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
        response.cookies.delete("user_token");
        return response;
      }
    }

    const tempPhone = request.cookies.get("tempPhone");
    if (!tempPhone) {
      const verifyUrl = new URL("/auth/verifyPhone", request.url);
      return NextResponse.redirect(verifyUrl);
    }
  }

  // Check for /cart

  if (pathname === '/cart') {
    console.log("Hello There 1")
    const user_token = request.cookies.get('user_token')?.value;
    if(user_token) {
      try {
        await jwtVerify(user_token, JWT_SECRET);
        return NextResponse.next();
      } catch (error) {
        const loginUrl = new URL('/auth/login/', request.url);
        const response = NextResponse.redirect(loginUrl);
        response.cookies.delete('user_token');
        return response;
      } 
    }
    const loginUrl = new URL('/auth/login/', request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}
