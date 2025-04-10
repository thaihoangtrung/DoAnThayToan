"use client"

import { useState, useEffect } from "react"
import axios from "axios"
import { format } from "date-fns"
import { Eye, MoreHorizontal, Search } from "lucide-react"
import Image from "next/image"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useUserStore } from "@/lib/store/useUserStore"

// API URL
const API_URL = "http://localhost:8080"

// Types
interface Product {
  _id: string
  name: string
  price: number
  imageUrl: string
}

interface OrderItem {
  _id: string
  product: Product
  quantity: number
}

interface ShippingInfo {
  fullName: string
  phoneNumber: string
  address: string
}

interface User {
  _id: string
  username: string
  email: string
}

interface Order {
  _id: string
  user: User
  items: OrderItem[]
  totalAmount: number
  status: string
  shippingInfo: ShippingInfo
  createdAt: string
  updatedAt: string
}

interface OrdersResponse {
  success: boolean
  data: Order[]
}

export default function OrdersManagement() {
    const token = useUserStore.getState().token
  const [orders, setOrders] = useState<Order[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  // Fetch orders
  const fetchOrders = async () => {
    setIsLoading(true)
    try {
      const response = await axios.get<OrdersResponse>(`${API_URL}/orders`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      setOrders(response.data.data)
    } catch (error) {
      console.error("Error fetching orders:", error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchOrders()
  }, [])

  // Filter orders based on search term
  const filteredOrders = orders.filter(
    (order) =>
      order._id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.shippingInfo.fullName.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // Format date
  const formatDate = (dateString: string) => {
    return format(new Date(dateString), "dd/MM/yyyy HH:mm")
  }

  // Calculate total items in an order
  const calculateTotalItems = (items: OrderItem[]) => {
    return items.reduce((total, item) => total + item.quantity, 0)
  }

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount)
  }

  // View order details
  const viewOrderDetails = (order: Order) => {
    setSelectedOrder(order)
    setIsDialogOpen(true)
  }

  // Get status badge color
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "success":
        return "bg-green-100 text-green-800 hover:bg-green-100/80"
      case "pending":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100/80"
      case "cancelled":
        return "bg-red-100 text-red-800 hover:bg-red-100/80"
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-100/80"
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-2">Đang tải dữ liệu...</h2>
          <p className="text-muted-foreground">Vui lòng đợi trong giây lát</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-10 px-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-2xl">Quản Lý Đơn Hàng</CardTitle>
            <CardDescription>Danh sách đơn hàng của khách hàng trong hệ thống</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Tìm kiếm đơn hàng..."
                className="pl-8 w-[250px]"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button onClick={() => fetchOrders()}>Làm mới</Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Mã đơn hàng</TableHead>
                <TableHead>Khách hàng</TableHead>
                <TableHead className="hidden md:table-cell">Ngày đặt</TableHead>
                <TableHead className="text-right">Tổng tiền</TableHead>
                <TableHead className="hidden md:table-cell">Số lượng</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead className="text-right">Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-10">
                    <div className="flex flex-col items-center justify-center">
                      <p className="text-lg font-medium mb-2">Không tìm thấy đơn hàng</p>
                      <p className="text-muted-foreground">Không có đơn hàng nào phù hợp với tìm kiếm của bạn</p>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                filteredOrders.map((order) => (
                  <TableRow key={order._id}>
                    <TableCell className="font-medium">{order._id.slice(-6)}</TableCell>
                    <TableCell>{order.shippingInfo.fullName}</TableCell>
                    <TableCell className="hidden md:table-cell">{formatDate(order.createdAt)}</TableCell>
                    <TableCell className="text-right">{formatCurrency(order.totalAmount)}</TableCell>
                    <TableCell className="hidden md:table-cell">{calculateTotalItems(order.items)}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={getStatusColor(order.status)}>
                        {order.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Mở menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Thao tác</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => viewOrderDetails(order)}>
                            <Eye className="mr-2 h-4 w-4" />
                            Xem chi tiết
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Order Details Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Chi Tiết Đơn Hàng #{selectedOrder?._id.slice(-6)}</DialogTitle>
            <DialogDescription>Đặt ngày {selectedOrder && formatDate(selectedOrder.createdAt)}</DialogDescription>
          </DialogHeader>

          {selectedOrder && (
            <div className="grid gap-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg">Thông tin khách hàng</h3>
                  <div className="space-y-2">
                    <p>
                      <span className="font-medium">Họ tên:</span> {selectedOrder.shippingInfo.fullName}
                    </p>
                    <p>
                      <span className="font-medium">Email:</span> {selectedOrder.user.email}
                    </p>
                    <p>
                      <span className="font-medium">Số điện thoại:</span> {selectedOrder.shippingInfo.phoneNumber}
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold text-lg">Thông tin giao hàng</h3>
                  <div className="space-y-2">
                    <p>
                      <span className="font-medium">Địa chỉ:</span> {selectedOrder.shippingInfo.address}
                    </p>
                    <p>
                      <span className="font-medium">Trạng thái:</span>{" "}
                      <Badge variant="outline" className={getStatusColor(selectedOrder.status)}>
                        {selectedOrder.status}
                      </Badge>
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Sản phẩm đã đặt</h3>
                <div className="border rounded-lg overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[80px]">Ảnh</TableHead>
                        <TableHead>Sản phẩm</TableHead>
                        <TableHead className="text-center">Số lượng</TableHead>
                        <TableHead className="text-right">Đơn giá</TableHead>
                        <TableHead className="text-right">Thành tiền</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {selectedOrder.items.map((item) => (
                        <TableRow key={item._id}>
                          <TableCell>
                            <div className="w-12 h-12 relative rounded overflow-hidden">
                              <Image
                                src={
                                  item.product.imageUrl
                                    ? `${API_URL}${item.product.imageUrl}`
                                    : "/placeholder.svg?height=48&width=48"
                                }
                                alt={item.product.name}
                                width={48}
                                height={48}
                                className="object-cover"
                              />
                            </div>
                          </TableCell>
                          <TableCell className="font-medium">{item.product.name}</TableCell>
                          <TableCell className="text-center">{item.quantity}</TableCell>
                          <TableCell className="text-right">{formatCurrency(item.product.price)}</TableCell>
                          <TableCell className="text-right">
                            {formatCurrency(item.product.price * item.quantity)}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>

              <div className="flex flex-col gap-2 items-end">
                <div className="flex justify-between w-full max-w-xs">
                  <span className="font-medium">Tổng số lượng:</span>
                  <span>{calculateTotalItems(selectedOrder.items)} sản phẩm</span>
                </div>
                <div className="flex justify-between w-full max-w-xs">
                  <span className="font-medium">Tổng tiền:</span>
                  <span className="font-bold">{formatCurrency(selectedOrder.totalAmount)}</span>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

