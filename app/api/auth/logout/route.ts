import { NextResponse } from "next/server"

export async function POST() {
  const res = NextResponse.json({ ok: true })
  res.cookies.set("email", "", { httpOnly: true, path: "/", maxAge: 0 })
  res.cookies.set("role", "", { httpOnly: true, path: "/", maxAge: 0 })
  return res
}
