"use client"

import type React from "react"

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react"
import type { CartContextValue, CartLine, Product } from "@/lib/types"

const CartContext = createContext<CartContextValue | undefined>(undefined)

const STORAGE_KEY = "shopping-cart:items"

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartLine[]>([])

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) {
        const parsed: CartLine[] = JSON.parse(raw)
        if (Array.isArray(parsed)) setItems(parsed)
      }
    } catch (e) {
      console.warn("[cart] failed to parse storage", e)
    }
  }, [])

  // Persist to localStorage on changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
    } catch {
      // ignore
    }
  }, [items])

  const addItem = useCallback((product: Product, quantity = 1) => {
    setItems((prev) => {
      const idx = prev.findIndex((l) => l.product.id === product.id)
      if (idx >= 0) {
        const next = [...prev]
        next[idx] = { ...next[idx], quantity: next[idx].quantity + quantity }
        return next
      }
      return [...prev, { product, quantity }]
    })
  }, [])

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    setItems((prev) => {
      if (quantity <= 0) return prev.filter((l) => l.product.id !== productId)
      return prev.map((l) => (l.product.id === productId ? { ...l, quantity } : l))
    })
  }, [])

  const removeItem = useCallback((productId: string) => {
    setItems((prev) => prev.filter((l) => l.product.id !== productId))
  }, [])

  const clearCart = useCallback(() => setItems([]), [])

  const itemCount = useMemo(() => items.reduce((n, l) => n + l.quantity, 0), [items])
  const subtotal = useMemo(() => items.reduce((sum, l) => sum + l.product.price * l.quantity, 0), [items])

  const value = useMemo<CartContextValue>(
    () => ({
      items,
      itemCount,
      subtotal,
      addItem,
      updateQuantity,
      removeItem,
      clearCart,
    }),
    [items, itemCount, subtotal, addItem, updateQuantity, removeItem, clearCart],
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error("useCart must be used within CartProvider")
  return ctx
}
