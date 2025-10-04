import { type NextRequest, NextResponse } from "next/server"

const USERS = [
  { email: "admin@shop.test", password: "admin123", role: "admin" as const },
  { email: "user@shop.test", password: "user123", role: "user" as const },
]

export async function POST(req: NextRequest) {
  const { email, password } = (await req.json().catch(() => ({}))) as {
    email?: string
    password?: string
  }
  const match = USERS.find((u) => u.email === email && u.password === password)
  if (!match) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
  }

  const res = NextResponse.json({ ok: true, user: { email: match.email, role: match.role } })
  const cookieOptions = {
    httpOnly: true,
    sameSite: "lax" as const,
    path: "/",
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  }
  res.cookies.set("email", match.email, cookieOptions)
  res.cookies.set("role", match.role, cookieOptions)
  return res
}
