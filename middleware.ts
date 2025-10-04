import { type NextRequest, NextResponse } from "next/server"

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl
  const role = req.cookies.get("role")?.value
  const email = req.cookies.get("email")?.value

  // Redirect logged-in users away from /login
  if (pathname === "/login" && email && (role === "user" || role === "admin")) {
    const url = req.nextUrl.clone()
    url.pathname = "/"
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/login", "/api/products"],
}
