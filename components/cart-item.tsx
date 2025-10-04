"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import type { CartLine } from "@/lib/types"
import { formatCurrency } from "@/lib/format"
import { useCart } from "@/context/cart-context"

export function CartItem({ line }: { line: CartLine }) {
  const { updateQuantity, removeItem } = useCart()
  const { product, quantity } = line

  return (
    <div className="grid grid-cols-[80px_1fr_auto] items-center gap-4 rounded-lg border bg-card p-3 md:grid-cols-[100px_1fr_auto]">
      <Image
        src={product.imageUrl || "/placeholder.svg"}
        alt={product.name}
        width={100}
        height={80}
        className="h-16 w-20 rounded-md object-cover md:h-20 md:w-24"
      />
      <div className="flex flex-col">
        <span className="font-medium">{product.name}</span>
        <span className="text-sm text-muted-foreground">{formatCurrency(product.price)}</span>
        <div className="mt-2 flex items-center gap-2">
          <Button
            variant="outline"
            onClick={() => updateQuantity(product.id, Math.max(0, quantity - 1))}
            aria-label="Decrease quantity"
          >
            −
          </Button>
          <span className="min-w-6 text-center">{quantity}</span>
          <Button
            variant="outline"
            onClick={() => updateQuantity(product.id, quantity + 1)}
            aria-label="Increase quantity"
          >
            +
          </Button>
          <Button variant="ghost" onClick={() => removeItem(product.id)} aria-label="Remove item">
            Remove
          </Button>
        </div>
      </div>
      <div className="justify-self-end font-semibold">{formatCurrency(product.price * quantity)}</div>
    </div>
  )
}
