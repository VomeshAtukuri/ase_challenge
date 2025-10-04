import { NextResponse } from "next/server"
import { getUser } from "@/lib/auth"

export async function GET() {
  const user =  await getUser()
  return NextResponse.json(
    { user },
    {
      headers: {
        "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
        Pragma: "no-cache",
        Expires: "0",
      },
    },
  )
}
