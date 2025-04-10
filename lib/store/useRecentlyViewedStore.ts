import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"

interface Product {
  id: number
  name: string
  slug: string
}

interface RecentlyViewedState {
  products: Product[]
  addProduct: (product: Product) => void
  getProducts: () => Product[]
}

const useRecentlyViewedStore = create<RecentlyViewedState>()(
  persist(
    (set, get) => ({
      products: [],
      addProduct: (product) =>
        set((state) => {
          const existingProducts = state.products.filter((p) => p.id !== product.id)
          return { products: [product, ...existingProducts].slice(0, 5) }
        }),
      getProducts: () => get().products,
    }),
    {
      name: "recently-viewed-storage",
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
)

export default useRecentlyViewedStore

