"use client"

import Link from "next/link"
import useSWR from "swr"
import { useRouter } from "next/navigation"
import { useCart } from "@/context/cart-context"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const fetcher = (url: string) => fetch(url, { cache: "no-store" }).then((r) => r.json())

export function Navbar() {
  const { itemCount } = useCart()
  const router = useRouter()
  const { data } = useSWR<{ user: { email: string; role: "user" | "admin" } | null }>("/api/auth/me", fetcher)
  const user = data?.user

  const onLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" })
    router.refresh()
  }

  return (
    <header className="border-b bg-card">
      <nav className={cn("mx-auto flex max-w-6xl items-center justify-between px-4 py-3")}>
        <Link href="/" className="font-semibold">
          <span className="text-balance">Minimal Shop</span>
        </Link>

        <div className="flex items-center gap-3">
          <Link href="/" className="text-sm hover:underline">
            Products
          </Link>
          {user ? (
            <>
              <span className="text-xs text-muted-foreground">
                {user.email} {user.role === "admin" ? "(Admin)" : ""}
              </span>
              <Button variant="ghost" size="sm" onClick={onLogout}>
                Logout
              </Button>
            </>
          ) : (
            <Link href="/login" className="text-sm hover:underline">
              Login
            </Link>
          )}
          <Link href="/cart">
            <Button variant="default" className="relative">
              Cart
              <span
                aria-label="items in cart"
                className="ml-2 inline-flex min-w-6 items-center justify-center rounded-full bg-primary-foreground px-1.5 py-0.5 text-xs font-medium text-primary"
              >
                {itemCount}
              </span>
            </Button>
          </Link>
        </div>
      </nav>
    </header>
  )
}
