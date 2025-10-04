import { type NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"
import type { Product } from "@/lib/types"

let products: Product[] = [
  {
    id: "p1",
    name: "Classic Tee",
    price: 24.0,
    imageUrl: "/classic-tee.jpg",
  },
  {
    id: "p2",
    name: "Comfort Hoodie",
    price: 49.0,
    imageUrl: "/comfort-hoodie.jpg",
  },
  {
    id: "p3",
    name: "Everyday Jeans",
    price: 59.0,
    imageUrl: "/everyday-jeans.jpg",
  },
  {
    id: "p4",
    name: "Running Sneakers",
    price: 79.0,
    imageUrl: "/running-sneakers.jpg",
  },
  {
    id: "p5",
    name: "Canvas Tote",
    price: 19.0,
    imageUrl: "/canvas-tote.jpg",
  },
  {
    id: "p6",
    name: "Baseball Cap",
    price: 15.0,
    imageUrl: "/baseball-cap.jpg",
  },
]

export async function GET() {
  return NextResponse.json(products, { status: 200 })
}

export async function POST(req: NextRequest) {
  const role = cookies().get("role")?.value
  if (role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
  const { name, price, imageUrl } = (await req.json().catch(() => ({}))) as {
    name?: string
    price?: number
    imageUrl?: string
  }
  if (!name || typeof price !== "number") {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 })
  }
  const newProduct: Product = {
    id: `p${Date.now()}`,
    name,
    price,
    imageUrl: imageUrl || "/placeholder.jpg",
  }
  products = [newProduct, ...products]
  return NextResponse.json({ ok: true, product: newProduct }, { status: 201 })
}
