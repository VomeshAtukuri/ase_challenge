import { NextResponse } from "next/server"

export async function POST() {
  const base = {
    httpOnly: true,
    sameSite: "lax" as const,
    path: "/",
    secure: process.env.NODE_ENV === "production",
  }
  
  const res = NextResponse.json({ ok: true })
  res.cookies.set("email", "", { ...base, maxAge: 0 })
  res.cookies.set("role", "", { ...base, maxAge: 0 })
  return res
}
