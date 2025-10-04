export type Product = {
  id: string
  name: string
  description?: string
  price: number
  imageUrl: string
}

export type CartLine = {
  product: Product
  quantity: number
}

export type CartContextValue = {
  items: CartLine[]
  itemCount: number
  subtotal: number
  addItem: (product: Product, quantity?: number) => void
  updateQuantity: (productId: string, quantity: number) => void
  removeItem: (productId: string) => void
  clearCart: () => void
}
