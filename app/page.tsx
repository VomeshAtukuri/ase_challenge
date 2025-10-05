import type { Product } from "@/lib/types"
import { ProductCard } from "@/components/product-card"
import { getUser } from "@/lib/auth"

async function getProducts(): Promise<Product[]> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || ""}/api/products`, {
      cache: "no-store",
    })
    if (!res.ok) throw new Error("Failed to fetch products")
    const data = (await res.json()) as Product[]
    return data
  } catch {
    // fallback to empty
    return []
  }
}

export default async function HomePage() {
  const products = await getProducts()
  const user =  await getUser()

  return (
    <main className="mx-auto max-w-6xl px-4 py-6">
      <h1 className="mb-4 text-2xl font-semibold text-pretty">Products</h1>

      {user && (
        <section className="mb-4 rounded-md border bg-card p-4 text-sm">
          <div>
            <span className="font-medium">Signed in as:</span> {user.email}
          </div>
          <div className="text-muted-foreground">Role: {user.role}</div>
        </section>
      )}

      {products.length === 0 ? (
        <div className="rounded-md border bg-card p-6 text-sm text-muted-foreground">
          Could not load products. Please try again later.
        </div>
      ) : (
        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} user={user} />
          ))}
        </section>
      )}
    </main>
  )
}
