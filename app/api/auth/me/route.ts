import { NextResponse } from "next/server"
import { getUser } from "@/lib/auth"

export async function GET() {
  const user = getUser()
  return NextResponse.json({ user })
}
