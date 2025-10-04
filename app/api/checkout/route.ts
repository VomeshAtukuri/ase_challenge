import { type NextRequest, NextResponse } from "next/server"

type CheckoutItem = { productId: string; quantity: number }
type CheckoutBody = { items: CheckoutItem[] }

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as CheckoutBody
    if (!body || !Array.isArray(body.items)) {
      return NextResponse.json({ success: false, error: "Invalid body" }, { status: 400 })
    }
    // Basic validation
    const valid = body.items.every(
      (i) => typeof i.productId === "string" && typeof i.quantity === "number" && i.quantity > 0,
    )
    if (!valid) {
      return NextResponse.json({ success: false, error: "Invalid items" }, { status: 400 })
    }

    console.log("[checkout] New order", JSON.stringify(body.items))
    return NextResponse.json({ success: true })
  } catch (e) {
    return NextResponse.json({ success: false, error: "Bad Request" }, { status: 400 })
  }
}
