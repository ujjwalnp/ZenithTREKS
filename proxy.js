import { NextResponse } from "next/server"
import { jwtVerify } from "jose"

const JWT_SECRET = process.env.JWT_SECRET || "fallback-secret-for-dev"

export async function proxy(request) {
  const token = request.cookies.get("auth_token")?.value
  const { pathname } = request.nextUrl

  if (pathname.startsWith("/admin")) {
    if (!token) {
      return NextResponse.redirect(new URL("/login", request.url))
    }

    try {
      // Use jose for edge compatibility in middleware
      const secret = new TextEncoder().encode(JWT_SECRET)
      const { payload } = await jwtVerify(token, secret)
      console.log("Payload:", payload)

      if (payload.role !== "admin") {
        // Redirect non-admins back to homepage
        console.log("Redirecting non-admins back to homepage")
        return NextResponse.redirect(new URL("/", request.url))
      }
      
    } catch (error) {
      return NextResponse.redirect(new URL("/login", request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*"],
}
