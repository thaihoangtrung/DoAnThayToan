import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface CartItem {
  id: number
  quantity: number
  price: number
  size: string
}

interface CartStore {
  items: CartItem[]
  addItem: (item: CartItem) => void
  removeItem: (id: number) => void
  clearCart: () => void
  getTotalItems: () => number
  getTotalUniqueItems: () => number
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item) => set((state) => {
        const existingItem = state.items.find((i) => i.id === item.id)
        if (existingItem) {
          return {
            items: state.items.map((i) =>
              i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
            ),
          }
        }
        return { items: [...state.items, { ...item }] }
      }),
      removeItem: (id) => set((state) => ({
        items: state.items.filter((i) => i.id !== id),
      })),
      clearCart: () => set({ items: [] }),
      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0)
      },
      getTotalUniqueItems: () => {
        return get().items.length
      },
    }),
    {
      name: 'cart-storage',
    }
  )
)

