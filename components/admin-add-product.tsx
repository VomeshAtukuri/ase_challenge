"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
export function AdminAddProduct() {
  const [name, setName] = useState("")
  const [price, setPrice] = useState<number | "">("")
  const [descriiption, setDescription] = useState("")
  const [imageUrl, setImageUrl] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const router = useRouter()


  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name || !price) return
    setSubmitting(true)
    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ name, price: Number(price), imageUrl , description: descriiption }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(data?.error || "Failed to add product")
      toast.success("Product added");
      setName("")
      setPrice("")
      setDescription("")
      setImageUrl("")
      router.refresh()
    } catch (err: string | any) {
      toast.error(err.message)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-3 rounded-lg border bg-card p-4">
      <div className="text-sm font-medium">Admin Panel: Add Product</div>
      <div className="grid gap-2">
        <Label htmlFor="name">Name</Label>
        <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" required />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="price">Price</Label>
        <Input
          id="price"
          type="number"
          min="0"
          step="0.01"
          value={price}
          placeholder="0.00"
          onChange={(e) => setPrice(e.target.value === "" ? "" : Number(e.target.value))}
          required
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="description">Description</Label>
        <Input
          id="description"
          value={descriiption}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="A short description of the product"
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="image">Image URL (optional)</Label>
        <Input
          id="image"
          placeholder="/placeholder.jpg"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />
      </div>
      <Button type="submit" disabled={submitting}>
        {submitting ? "Adding…" : "Add Product"}
      </Button>
    </form>
  )
}
