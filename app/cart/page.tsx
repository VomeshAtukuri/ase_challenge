"use client"

import { useState } from "react"
import { useCart } from "@/context/cart-context"
import { CartItem } from "@/components/cart-item"
import { Button } from "@/components/ui/button"
import { formatCurrency } from "@/lib/format"
import { toast } from "sonner"

export default function CartPage() {
  const { items, subtotal, clearCart } = useCart()
  const [isSubmitting, setSubmitting] = useState(false)

  const handleCheckout = async () => {
    try {
      setSubmitting(true)
      const payload = {
        items: items.map((l) => ({ productId: l.product.id, quantity: l.quantity })),
      }
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
      const data = await res.json()
      if (res.ok && data?.success) {
        toast.success("Order placed")
        clearCart()
      } else {
        toast.error(data?.error || "Checkout failed")
      }
    } catch {
      toast.error("Please try again later.")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-6">
      <h1 className="mb-4 text-2xl font-semibold text-pretty">Your Cart</h1>

      {items.length === 0 ? (
        <div className="rounded-md border bg-card p-6 text-sm text-muted-foreground">Your cart is empty.</div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-[1fr_320px]">
          <section className="flex flex-col gap-3">
            {items.map((line) => (
              <CartItem key={line.product.id} line={line} />
            ))}
          </section>

          <aside className="h-max rounded-lg border bg-card p-4">
            <h2 className="mb-2 text-lg font-semibold">Order Summary</h2>
            <div className="mb-4 flex items-center justify-between text-sm">
              <span>Subtotal</span>
              <span className="font-medium">{formatCurrency(subtotal)}</span>
            </div>
            <Button className="w-full" disabled={isSubmitting} onClick={handleCheckout}>
              {isSubmitting ? "Processing…" : "Checkout"}
            </Button>
          </aside>
        </div>
      )}
    </main>
  )
}
