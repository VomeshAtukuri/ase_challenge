import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Toaster } from "sonner"
import "./globals.css"
import { CartProvider } from "@/context/cart-context"
import { Navbar } from "@/components/navbar"
import { Suspense } from "react"

export const metadata: Metadata = {
  title: "Minimal E-commerce",
  description: "A minimal e-commerce app built with Next.js, TypeScript",
  icons: {
    icon: "/globe.svg",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <Suspense fallback={null}>
          <Toaster position="bottom-right" richColors toastOptions={{ duration: 5000 }} />
          <CartProvider>
            <Navbar />
            {children}
          </CartProvider>
        </Suspense>
      </body>
    </html>
  )
}
