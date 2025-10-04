"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useCart } from "@/context/cart-context"
import type { Product } from "@/lib/types"
import { formatCurrency } from "@/lib/format"

export function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart()

  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <CardTitle className="text-pretty">{product.name}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-3">
        <Image
          // src={product.imageUrl || "/placeholder.svg"}
          src={"/placeholder.svg"}
          alt={product.name}
          width={300}
          height={200}
          className="h-40 w-full rounded-md object-cover"
        />
        <span className="flex items-center justify-between w-full">
        <p className="text-center text-sm text-muted-foreground">{product.description}</p>
        <div className="text-sm text-muted-foreground">{formatCurrency(product.price)}</div>
        </span>
      </CardContent>
      <CardFooter>
        <Button className="w-full" onClick={() => addItem(product, 1)}>
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  )
}
