"use client"

import { AdminAddProduct } from "@/components/admin-add-product"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { formatCurrency } from "@/lib/format"
import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react"
import { useEffect, useState } from "react"
import type { Product } from "@/lib/types"

export default function AdminPage() {
  const [items, setItems] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch("/api/products")
        if (res.ok) {
          const data: Product[] = await res.json()
          setItems(data)
        }
      } catch (error) {
        console.error("Error fetching products:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  async function handleDelete(productId: string) {
    try {
      const res = await fetch(`/api/products?id=${productId}`, {
        method: "DELETE",
      })
      if (res.ok) {
        setItems((prev) => prev.filter((p) => p.id !== productId))
      }
    } catch (error) {
      console.error("Error deleting product:", error)
    }
  }

  return (
    <div className="mx-auto max-w-6xl p-4">
      <h1 className="mb-4 text-2xl font-bold">Admin Page</h1>
      <p>Here you can add new products to the store.</p>

      <section className="my-3">
        <Table className="border rounded-lg bg-card p-4">
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Image URL</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={6}>
                  <div className="animate-pulse rounded-md border bg-card p-6 text-sm text-muted-foreground">
                    Loading…
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              items.map((product) => (
                <TableRow key={product.id}>
                  <TableCell className="font-medium">{product.id}</TableCell>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>{product.description}</TableCell>
                  <TableCell>{formatCurrency(product.price)}</TableCell>
                  <TableCell>
                    {product.imageUrl ? (
                      <a
                        href={product.imageUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View Image
                      </a>
                    ) : (
                      "N/A"
                    )}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      onClick={() => handleDelete(product.id)}
                    >
                      <Trash2 />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </section>

      <section className="my-3">
        <AdminAddProduct />
      </section>
    </div>
  )
}
