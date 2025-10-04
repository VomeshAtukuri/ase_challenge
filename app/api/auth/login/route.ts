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
  res.cookies.set("email", match.email, { httpOnly: true, sameSite: "lax", path: "/" })
  res.cookies.set("role", match.role, { httpOnly: true, sameSite: "lax", path: "/" })
  return res
}
