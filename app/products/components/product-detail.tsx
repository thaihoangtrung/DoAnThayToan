"use client"
import { useState } from "react"
import type React from "react"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ShoppingCart, Star } from "lucide-react"
import { formatVND } from "@/lib/helper/convertvnd"
import BreadcrumbCustom from "@/components/breadcrumb"
import { useUserStore } from "@/lib/store/useUserStore"
import axios from "axios"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import { getProductDetails } from "@/lib/fetchapi/api"

interface Product {
  _id: string
  name: string
  slug: string
  imageUrl: string
  price: number
  quantity: number
  description: string
  urlImg: string
  averageRating?: number
  category: {
    _id: string
    name: string
    slug: string
  }
  reviews?: Array<{
    rating: number
    comment: string
  }>
}

interface ProductDetailProps {
  detail: Product
}

export default function ProductDetail({ detail }: ProductDetailProps) {
  const token = useUserStore.getState().token
  const [productDetails, setProductDetails] = useState<Product>(detail)
  const [quantity, setQuantity] = useState(1)
  const [isAdding, setIsAdding] = useState(false)
  const [rating, setRating] = useState(5)
  const [comment, setComment] = useState("")
  const [isSubmittingReview, setIsSubmittingReview] = useState(false)

  const handleAddToCart = async (productId: string, quantity: number) => {
    try {
      setIsAdding(true)

      const res = await axios.post(
        "http://localhost:8080/cart",
        {
          productId,
          quantity,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
      )

      console.log("Cart response:", res.data)
    } catch (error: any) {
      console.error("Lỗi khi thêm vào giỏ hàng:", error)
    } finally {
      setIsAdding(false)
    }
  }

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      setIsSubmittingReview(true)

      const res = await axios.post(
        "http://localhost:8080/reviews",
        {
          productId: productDetails._id,
          rating,
          comment,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
      )

      const updatedProduct = await getProductDetails(productDetails.slug)
      if (updatedProduct) {
        setProductDetails(updatedProduct)
      }

      setComment("")
      setRating(5)
    } catch (error: any) {
      console.error("Lỗi khi gửi đánh giá:", error)
    } finally {
      setIsSubmittingReview(false)
    }
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <BreadcrumbCustom nameSecond="Danh sách sản phẩm" linkSecond="/products" nameFourth={productDetails.name} />

      <div className="grid md:grid-cols-2 gap-8">
        {/* Product Image */}
        <div className="space-y-4">
          <div className="relative rounded-lg overflow-hidden">
            <Image
              src={
                productDetails.imageUrl ? `http://localhost:8080${productDetails.imageUrl}` : "/placeholder.svg?height=500&width=500"
              }
              alt={productDetails.name}
              width={500}
              height={500}
              loading="lazy"
              className="w-full object-cover aspect-square"
            />
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <h1 className="text-2xl font-bold">{productDetails.name}</h1>
          <div>
            <div className="text-sm font-semibold flex gap-1">{productDetails.averageRating}<Star className="h-4 w-4 fill-primary text-primary" /></div>
            <p className="text-xl font-semibold text-primary">{formatVND(productDetails.price)}</p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Số lượng:</span>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full border h-8 w-8"
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
            >
              {"-"}
            </Button>
            <span className="w-12 text-center">{quantity}</span>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full border h-8 w-8"
              onClick={() => setQuantity(quantity + 1)}
            >
              {"+"}
            </Button>
            <span className="text-sm text-muted-foreground ml-2">
              {productDetails.quantity > 0 ? `Còn ${productDetails.quantity} sản phẩm` : "Hết hàng"}
            </span>
          </div>

          <div className="flex gap-4 pt-4">
            <Button
              onClick={() => handleAddToCart(productDetails._id, quantity)}
              className="flex-1"
              disabled={productDetails.quantity <= 0 || isAdding}
            >
              <ShoppingCart className="mr-2 h-4 w-4" />
              {isAdding ? "Đang thêm..." : "Thêm vào giỏ hàng"}
            </Button>
          </div>

          <Tabs defaultValue="details" className="mt-8 w-full">
            <TabsList className="w-full">
              <TabsTrigger value="details" className="flex-1">
                Chi tiết
              </TabsTrigger>
              <TabsTrigger value="ratings" className="flex-1">
                Đánh giá & Nhận xét
              </TabsTrigger>
            </TabsList>

            <TabsContent value="details" className="mt-4">
              <div className="text-muted-foreground">
                {productDetails.description ? (
                  <div dangerouslySetInnerHTML={{ __html: productDetails.description }} />
                ) : (
                  <p>Không có thông tin chi tiết</p>
                )}
              </div>
            </TabsContent>

            <TabsContent value="ratings" className="mt-4 space-y-6">
              {/* Review Form */}
              <Card className="p-4">
                <h3 className="text-lg font-medium mb-4">Gửi đánh giá của bạn</h3>
                <form onSubmit={handleSubmitReview} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Đánh giá</label>
                    <div className="flex items-center gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button key={star} type="button" onClick={() => setRating(star)} className="focus:outline-none">
                          <Star
                            className={`h-6 w-6 ${star <= rating ? "fill-primary text-primary" : "text-muted-foreground"
                              }`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="comment" className="block text-sm font-medium mb-2">
                      Nhận xét
                    </label>
                    <Textarea
                      id="comment"
                      placeholder="Chia sẻ trải nghiệm của bạn về sản phẩm này"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      rows={4}
                      required
                    />
                  </div>

                  <Button type="submit" className="w-full" disabled={isSubmittingReview}>
                    {isSubmittingReview ? "Đang gửi..." : "Gửi đánh giá"}
                  </Button>
                </form>
              </Card>

              {/* Existing Reviews */}
              <div>
                <h3 className="text-lg font-medium mb-4">Đánh giá từ khách hàng</h3>
                {productDetails.reviews && productDetails.reviews.length > 0 ? (
                  <div className="space-y-4">
                    {productDetails.reviews.map((review, index) => (
                      <div key={index} className="border-b pb-4">
                        <div className="flex items-center gap-2">
                          <div className="flex">
                            {[...Array(review.rating)].map((_, i) => (
                              <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                            ))}
                          </div>
                        </div>
                        <p className="mt-2 text-sm text-muted-foreground">{review.comment}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground">Không có đánh giá nào</p>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

