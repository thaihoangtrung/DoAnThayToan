"use client"
import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import SidebarUserPage from "@/components/sidebar-user"
import { getUserOrderHistory } from "@/lib/fetchapi/api"
import { DataTable } from "./data-table"



export interface Product {
  id: number
  name: string
  price: string
}

export interface OrderItem {
  orderId: number
  productId: number
  quantity: number
  price: string
  Product: Product
}

export interface Order {
  id: number
  userId: number
  status: string
  totalAmount: string
  shippingAddressId: number | null
  customShippingAddress: string | null
  paymentMethod: string
  paymentStatus: string
  momoTransactionId: string | null
  createdAt: string
  updatedAt: string
  OrderItems: OrderItem[]
}

const OrderHistoryComponent = () => {
  const [orderHistory, setOrderHistory] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const orders = await getUserOrderHistory()
        const formattedData = orders.map((order : any) => ({
          id: order.id,
          status: order.status,
          totalAmount: order.totalAmount,
          customShippingAddress: order.customShippingAddress || "Không có",
          paymentMethod: order.paymentMethod,
          createdAt: new Date(order.createdAt).toLocaleString("vi-VN"),
          orderItems: order.OrderItems.map((item : any) => ({
            name: item.Product.name,
            quantity: item.quantity,
            price: item.price,
          })),
        }))
        
        setOrderHistory(formattedData)
      } catch (error) {
        console.error("Error fetching order history:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchOrders()
  }, [])

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Lịch sử đặt hàng</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? <p>Đang tải...</p> : <DataTable data={orderHistory} />}
        </CardContent>
      </Card>
    </>
  )
}


const OrderHistoryUI = () => {
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
      <SidebarUserPage />
      <div className="flex-1 p-4">
        <OrderHistoryComponent />
      </div>
    </div>
  )
}
export default OrderHistoryUI