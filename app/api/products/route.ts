import { type NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"
import type { Product } from "@/lib/types"

export let products: Product[] = [
  {
    id: "p1",
    name: "Classic Tee",
    price: 24.0,
    description: "A classic tee for everyday wear.",
    imageUrl: "/classic-tee.jpg",
  },
  {
    id: "p2",
    name: "Comfort Hoodie",
    price: 49.0,
    description: "A cozy hoodie for cooler days.",
    imageUrl: "/comfort-hoodie.jpg",
  },
  {
    id: "p3",
    name: "Everyday Jeans",
    description: "Stylish and durable jeans for daily use.",
    price: 59.0,
    imageUrl: "/everyday-jeans.jpg",
  },
  {
    id: "p4",
    name: "Running Sneakers",
    description: "Lightweight sneakers designed for running.",
    price: 79.0,
    imageUrl: "/running-sneakers.jpg",
  },
  {
    id: "p5",
    name: "Canvas Tote",
    description: "A versatile tote bag for all occasions.",
    price: 19.0,
    imageUrl: "/canvas-tote.jpg",
  },
  {
    id: "p6",
    name: "Baseball Cap",
    description: "A stylish cap to complete your look.",
    price: 15.0,
    imageUrl: "/baseball-cap.jpg",
  },
]

export async function GET() {
  return NextResponse.json(products, { status: 200 })
}

export async function POST(req: NextRequest) {
  const role = (await cookies()).get("role")?.value
  if (role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
  const { name, price, imageUrl , description } = (await req.json().catch(() => ({}))) as {
    name?: string
    price?: number
    imageUrl?: string
    description?: string
  }
  if (!name || typeof price !== "number") {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 })
  }
  const newProduct: Product = {
    id: `p${Date.now()}`,
    name,
    price,
    description,
    imageUrl: imageUrl || "/placeholder.jpg",
  }
  products = [newProduct, ...products]
  return NextResponse.json({ ok: true, product: newProduct }, { status: 201 })
}


export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const id = searchParams.get("id")
  console.log("Deleting product with ID:", id);
  if (!id) {
    return NextResponse.json({ error: "Product ID is required" }, { status: 400 });
  }

  const index = products.findIndex((p) => p.id === id);
  if (index > -1) {
    products.splice(index, 1);
    return NextResponse.json({ ok: true, id });
  }

  return NextResponse.json({ error: "Product not found" }, { status: 404 });
}