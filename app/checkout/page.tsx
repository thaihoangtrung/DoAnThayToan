"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import axios from "axios"
import { formatVND } from "@/lib/helper/convertvnd"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useRouter } from "next/navigation"
import { useUserStore } from "@/lib/store/useUserStore"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import Image from "next/image"

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

interface ShippingInfo {
  fullName: string
  phoneNumber: string
  address: string
}

// API URL
const API_URL = "http://localhost:8080"

export default function CheckoutPage() {
  const token = useUserStore.getState().token
  const [cart, setCart] = useState<Cart | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [couponCode, setCouponCode] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [discount, setDiscount] = useState(0)
  const [shippingInfo, setShippingInfo] = useState<ShippingInfo>({
    fullName: "",
    phoneNumber: "",
    address: "",
  })
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [orderCode, setOrderCode] = useState("")
  const [orderAmount, setOrderAmount] = useState(0)

  const router = useRouter()

  // API functions
  const getCart = async () => {
    try {
      const response = await axios.get(`${API_URL}/cart`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      return response.data
    } catch (error) {
      console.error("Lỗi khi gọi API getCart:", error)
      throw error
    }
  }

  const applyCoupon = async (code: string) => {
    if (!code) {
      return;
    }
  
    try {
      // Call the API to validate the coupon
      const response = await axios.post(`${API_URL}/coupon/validate`, { code });
  
      // Extract the discount value from the response
      const { discount } = response.data.data;
  
      // Update the discount state
      setDiscount(discount);
    } catch (error) {
      console.error("Error applying coupon:", error);
      setDiscount(0); // Reset discount if there's an error
    }
  };
  const createOrder = async () => {
    try {
      if (!cart) throw new Error("Giỏ hàng trống")

      // Chuyển đổi items từ cart sang format đúng cho API
      const orderItems = cart.items.map((item) => ({
        product: item.product._id,
        quantity: item.quantity,
      }))

      // Tính tổng tiền sau khi trừ giảm giá
      const totalAmount = calculateSubtotal() - discount
      const response = await axios.post(
        `${API_URL}/orders`,
        {
          items: orderItems,
          totalAmount,
          couponCode: couponCode || undefined,
          shippingInfo: {
            fullName: shippingInfo.fullName,
            phoneNumber: shippingInfo.phoneNumber,
            address: shippingInfo.address,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )

      return response.data
    } catch (error) {
      console.error("Lỗi khi tạo đơn hàng:", error)
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

  // Calculate subtotal
  const calculateSubtotal = () => {
    return cart?.items.reduce((total, item) => total + item.product.price * item.quantity, 0) || 0
  }

  const handleOpenPayment = (code: string, amount: number) => {
    setOrderCode(code)
    setOrderAmount(amount)
    setIsDialogOpen(true)
  }

  // Handle order submission
  const handleCheckout = async () => {
    // Validate shipping info
    if (!shippingInfo.fullName || !shippingInfo.phoneNumber || !shippingInfo.address) {
      return
    }

    // Validate cart
    if (!cart || cart.items.length === 0) {
      return
    }

    setIsProcessing(true)
    try {
      const response = await createOrder()
      console.log("Đơn hàng đã được tạo:", response)

      // Determine the correct path to order data based on API response structure
      const orderData = response.order || response.data?.order || response

      if (orderData) {
        // Get order ID and amount
        const orderId = orderData._id || orderData.id
        const amount = orderData.totalAmount || calculateSubtotal() - discount

        // Open payment QR dialog
        handleOpenPayment(orderId, amount)
        setIsDialogOpen(true)
      }
    } catch (error: any) {
      console.error("Lỗi:", error)
    } finally {
      setIsProcessing(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setShippingInfo((prev) => ({
      ...prev,
      [name]: value,
    }))
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
      <h1 className="text-3xl font-bold mb-6">Thanh Toán</h1>
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
                        item.product.imageUrl
                          ? `${API_URL}${item.product.imageUrl}`
                          : "/placeholder.svg?height=500&width=500"
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
                  <span className="font-semibold">
                    {item.quantity} x {formatVND(item.product.price)} = {formatVND(item.quantity * item.product.price)}
                  </span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <div className="flex flex-col gap-6">
          {/* Thông tin giao hàng */}
          <Card>
            <CardHeader>
              <CardTitle>Thông Tin Giao Hàng</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <div>
                <Label htmlFor="fullName">Họ và tên</Label>
                <Input
                  id="fullName"
                  name="fullName"
                  placeholder="Nhập họ tên người nhận"
                  value={shippingInfo.fullName}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <Label htmlFor="phoneNumber">Số điện thoại</Label>
                <Input
                  id="phoneNumber"
                  name="phoneNumber"
                  placeholder="Nhập số điện thoại"
                  value={shippingInfo.phoneNumber}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <Label htmlFor="address">Địa chỉ giao hàng</Label>
                <Textarea
                  id="address"
                  name="address"
                  placeholder="Nhập địa chỉ giao hàng chi tiết"
                  value={shippingInfo.address}
                  onChange={handleInputChange}
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          {/* Mã giảm giá */}
          <Card>
            <CardHeader>
              <CardTitle>Mã Giảm Giá</CardTitle>
            </CardHeader>
            <CardContent className="flex gap-2">
              <Input
                placeholder="Nhập mã giảm giá"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
              />
              <Button onClick={() => applyCoupon(couponCode)} variant="outline">
                Áp dụng
              </Button>
            </CardContent>
          </Card>

          {/* Tóm tắt đơn hàng */}
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
                <span>{formatVND(discount)}</span>
              </div>
              <div className="flex justify-between font-semibold text-lg">
                <span>Tổng Cộng</span>
                <span>{formatVND(calculateSubtotal() - discount)}</span>
              </div>
              <Button className="w-full" onClick={handleCheckout} disabled={isProcessing}>
                {isProcessing ? "Đang xử lý..." : "Đặt Hàng"}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
      {/* Hộp thoại hiển thị mã QR để thanh toán */}
      <Dialog
        open={isDialogOpen}
        onOpenChange={(open) => {
          setIsDialogOpen(open)
          if (!open) {
            // Navigate to home page when dialog is closed
            router.push("/")
          }
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Quét Mã QR Để Thanh Toán</DialogTitle>
          </DialogHeader>

          {/* Hiển thị mã QR */}
          <div className="flex flex-col items-center">
            <Image
              src={`https://img.vietqr.io/image/mbbank-0947187454-compact2.jpg?amount=${orderAmount}&addInfo=do%20an%20thay%20tung&accountName=Thai%20Hoang%20Trung`}
              alt="Mã QR Thanh Toán"
              width={400}
              height={400}
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

