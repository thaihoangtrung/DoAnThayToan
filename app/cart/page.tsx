"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { Trash2, Plus, Minus } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import axios from "axios"
import { formatVND } from "@/lib/helper/convertvnd"
import { useUserStore } from "@/lib/store/useUserStore"
// Các interface định nghĩa kiểu dữ liệu
interface Product {
  _id: string
  name: string
  price: number
  imageUrl: string
  slug: string
}

interface CartItem {
  _id: string
  product: Product
  quantity: number
}

interface Cart {
  _id: string
  items: CartItem[]
  user?: string
}

// API URL
const API_URL = 'http://localhost:8080'

export default function CartPage() {
   const token = useUserStore.getState().token
  const [cart, setCart] = useState<Cart | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // API functions
  const getCart = async () => {
    try {
      const response = await axios.get(`${API_URL}/cart`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      return response.data
    } catch (error) {
      console.error("Lỗi khi gọi API getCart:", error)
      throw error
    }
  }

  const updateItemCart = async (cartId: string, itemId: string, quantity: number) => {
    try {
      const response = await axios.put(`${API_URL}/cart/update`, {
        cartId,
        itemId,
        quantity
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      return response.data
    } catch (error) {
      console.error("Lỗi khi gọi API updateItemCart:", error)
      throw error
    }
  }

  // Fetch cart data
  const fetchCart = async () => {
    setIsLoading(true)
    try {
      const response = await getCart()
      setCart(response.data)
    } catch (error) {
      console.error("Lỗi khi lấy giỏ hàng:", error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchCart()
  }, [])

  // Update quantity handler
  const updateQuantity = async (itemId: string, newQuantity: number) => {
    if (newQuantity < 1) return
    try {
      if (!cart?._id) return

      await updateItemCart(cart._id, itemId, newQuantity)

      setCart((prevCart) => {
        if (!prevCart) return null
        return {
          ...prevCart,
          items: prevCart.items.map((item) =>
            item._id === itemId ? { ...item, quantity: newQuantity } : item
          ),
        }
      })
    } catch (error) {
      console.error("Lỗi khi cập nhật sản phẩm trong giỏ:", error)
    }
  }

  // Remove item handler
  // Trong component React của bạn
  const removeItem = async (itemId: string) => {
    try {
      if (!cart?._id) return;

      await axios.delete(`${API_URL}/cart/remove`, {
        data: {
          cartId: cart._id,
          itemId: itemId
        },
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setCart((prevCart) => {
        if (!prevCart) return null;
        return {
          ...prevCart,
          items: prevCart.items.filter((item) => item._id !== itemId),
        };
      });
    } catch (error) {
      console.error("Lỗi khi xóa sản phẩm khỏi giỏ:", error);
    }
  };

  // Calculate subtotal
  const calculateSubtotal = () => {
    return cart?.items.reduce((total, item) => total + item.product.price * item.quantity, 0) || 0
  }

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">Đang tải...</div>
  }

  if (!cart || cart.items.length === 0) {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6">Giỏ Hàng Của Bạn</h1>
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
          <h2 className="text-2xl font-semibold">Giỏ hàng của bạn đang trống</h2>
          <p className="text-muted-foreground text-center max-w-[500px]">
            Có vẻ như bạn chưa thêm bất kỳ sản phẩm nào vào giỏ hàng.
          </p>
          <Button asChild>
            <Link href="/">Tiếp tục mua sắm</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-20">
      <h1 className="text-3xl font-bold mb-6">Giỏ Hàng Của Bạn</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Sản Phẩm Trong Giỏ</CardTitle>
          </CardHeader>
          <CardContent>
            {cart.items.map((item) => (
              <div
                key={item._id}
                className="flex md:flex-row flex-col gap-4 items-center justify-between py-4 border-b last:border-b-0"
              >
                <div className="flex items-center gap-4">
                  <div className="!w-20 h-20 relative rounded overflow-hidden">
                    <img
                      className="object-cover rounded w-full h-full"
                      src={
                        item.product.imageUrl ? `${API_URL}${item.product.imageUrl}` : "/placeholder.svg?height=500&width=500"
                      }
                      alt={item.product.name}
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold">{item.product.name}</h3>
                    <div className="flex items-center space-x-2">
                      <p className="text-sm text-muted-foreground">{formatVND(item.product.price)}</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between space-x-2">
                  <Button
                    variant="outline"
                    className="rounded-full"
                    size="icon"
                    onClick={() => updateQuantity(item._id, item.quantity - 1)}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <Input
                    value={item.quantity}
                    onChange={(e) =>
                      updateQuantity(item._id, parseInt(e.target.value, 10))
                    }
                    className="w-10 text-center rounded-full"
                  />
                  <Button
                    variant="outline"
                    className="rounded-full"
                    size="icon"
                    onClick={() => updateQuantity(item._id, item.quantity + 1)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                  <Button size="icon" onClick={() => removeItem(item._id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Tóm Tắt Đơn Hàng</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-stretch gap-4">
            <div className="flex justify-between font-semibold text-lg">
              <span>Tổng Tiền</span>
              <span>{formatVND(calculateSubtotal())}</span>
            </div>
            <div className="flex justify-between font-semibold text-lg py-4 border-b">
              <span>Giảm Giá</span>
              <span>0</span>
            </div>
            <div className="flex justify-between font-semibold text-lg">
              <span>Tổng Cộng</span>
              <span>{formatVND(calculateSubtotal())}</span>
            </div>
            <Button asChild className="w-full">
              <Link href="/checkout">Tiến Hành Thanh Toán</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}