"use client"

import Link from "next/link"
import Image from "next/image"
import { formatVND } from "@/lib/helper/convertvnd"
import { Input } from "@/components/ui/input"
import { useEffect, useState, useTransition } from "react"
import { searchProducts } from "@/lib/fetchapi/api"

const NoResults = () => (
  <div className="text-center py-10">
    <h3 className="text-lg font-semibold mb-2">Không tìm thấy kết quả</h3>
    <p className="text-muted-foreground">Hãy thử điều chỉnh tìm kiếm hoặc bộ lọc để tìm đúng thứ bạn cần.</p>
  </div>
)

export interface Product {
  _id: string
  name: string
  slug: string
  imageUrl: string
  price: number
  quantity: number
  description: string
  urlImg: string
  category: {
    _id: string
    name: string
    slug: string
  }
}

export function BlogList({ listProducts }: { listProducts: Product[] }) {
  const [products, setProducts] = useState(listProducts)
  const [query, setQuery] = useState("")
  const [isPending, startTransition] = useTransition()

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (query.trim() !== "") {
        startTransition(async () => {
          const results = await searchProducts(query)
          setProducts(Array.isArray(results) ? results : [])
        })
      } else {
        setProducts(listProducts)
      }
    }, 300)
  
    return () => clearTimeout(delayDebounce)
  }, [query, listProducts])
  
  return (
    <>
      <div className="mb-6 flex flex-col md:flex-row items-start justify-start md:items-center md:justify-between mx-4 md:mx-16">
        <div className="flex mb-4 items-center justify-between gap-4">
          <Input
            placeholder="Tìm kiếm sản phẩm..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full max-w-sm"
          />
        </div>
      </div>

      {products.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mx-4 md:mx-16">
          {products.map((item, index) => (
            <Link
              key={`product-${item._id}-${index}`}
              href={`/products/${item.slug}`}
              className="group border p-4 rounded-xl"
            >
              <div className="relative overflow-hidden rounded-lg mb-4">
                {item.imageUrl && (
                  <Image
                    src={`http://localhost:8080${item.imageUrl}`}
                    alt={item.name}
                    width={300}
                    height={300}
                    className="object-fill group-hover:scale-105 transition-transform duration-300 aspect-square"
                  />
                )}
              </div>
              <h3 className="font-semibold text-base">{item.name}</h3>
              <p className="text-sm font-semibold mt-1">{formatVND(item.price)}</p>
            </Link>
          ))}
        </div>
      ) : (
        <NoResults />
      )}
    </>
  )
}