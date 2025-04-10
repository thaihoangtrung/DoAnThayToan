"use client"
import useRecentlyViewedStore from "@/lib/store/useRecentlyViewedStore"
import { useEffect, useMemo } from "react"

export function useRecentlyViewed(currentProduct: {
  id: number
  name: string
  slug: string
}) {
  const { addProduct, getProducts } = useRecentlyViewedStore()

  useEffect(() => {
    if (currentProduct) {
      addProduct({
        id: currentProduct.id,
        name: currentProduct.name,
        slug: currentProduct.slug,
      })
    }
  }, [currentProduct, addProduct])

  const recentlyViewedProducts = useMemo(() => {
    return getProducts().filter((product) => product.id !== currentProduct.id)
  }, [getProducts, currentProduct.id])

  return { recentlyViewedProducts }
}

