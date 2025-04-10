"use client"

import { useState, useEffect } from "react"
import { Plus, Pencil, Trash2 } from "lucide-react"
import Image from "next/image"
import axios from "axios"

import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ProductDialog } from "./product-dialog"
import { DeleteConfirmDialog } from "./delete-confirm-dialog"

interface Category {
  _id: string
  name: string
}

interface Product {
  _id: string
  name: string
  description: string
  price: number
  quantity: number
  category: Category
  imageUrl: string
}

export default function ProductsPageUI() {
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null)

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    setIsLoading(true)
    try {
      const response = await axios.get("http://localhost:8080/products")
      setProducts(Array.isArray(response.data.data) ? response.data.data : [])
    } catch (error) {
      console.error("Failed to fetch products:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleCreateProduct = async (formData: FormData) => {
    try {
      await axios.post("http://localhost:8080/products", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      await fetchProducts()
      setIsCreateDialogOpen(false)
      return true
    } catch (error) {
      console.error("Failed to create product:", error)
      return false
    }
  }

  const handleUpdateProduct = async (id: string, formData: FormData) => {
    try {
      const name = formData.get("name") as string
      const description = formData.get("description") as string
      const price = formData.get("price") as string
      const quantity = formData.get("quantity") as string
      const category = formData.get("category") as string
      const image = formData.get("image") as File | null

      let response

      if (image && image.size > 0) {
        response = await axios.put(`http://localhost:8080/products/${id}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
      } else {
        const jsonData = { name, description, price, quantity, category }
        response = await axios.put(`http://localhost:8080/products/${id}`, jsonData)
      }

      if (response.status === 200) {
        await fetchProducts()
        setIsEditDialogOpen(false)
        return true
      }

      return false
    } catch (error) {
      console.error("Failed to update product:", error)
      return false
    }
  }

  const handleDeleteProduct = async (id: string) => {
    try {
      await axios.delete(`http://localhost:8080/products/${id}`)
      await fetchProducts()
      setIsDeleteDialogOpen(false)
      return true
    } catch (error) {
      console.error("Failed to delete product:", error)
      return false
    }
  }

  const openEditDialog = (product: Product) => {
    setCurrentProduct(product)
    setIsEditDialogOpen(true)
  }

  const openDeleteDialog = (product: Product) => {
    setCurrentProduct(product)
    setIsDeleteDialogOpen(true)
  }

  const handleExportCSV = () => {
    window.open("http://localhost:8080/products/export/csv", "_blank")
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount)
  }

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Products</h1>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleExportCSV}>
            Export CSV
          </Button>
          <Button onClick={() => setIsCreateDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add Product
          </Button>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-8">Loading products...</div>
      ) : (
        <div className="border rounded-md">
          <Table>
            <TableCaption>A list of all products.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[80px]">Image</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Category</TableHead>
                <TableHead className="w-[100px] text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-6">
                    No products found. Create your first product.
                  </TableCell>
                </TableRow>
              ) : (
                products.map((product) => (
                  <TableRow key={product._id}>
                    <TableCell>
                      {product.imageUrl && (
                        <div className="relative w-12 h-12 rounded-md overflow-hidden">
                          <Image
                            src={`http://localhost:8080${product.imageUrl}`}
                            alt={product.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                      )}
                    </TableCell>
                    <TableCell className="font-medium">{product.name}</TableCell>
                    <TableCell className="max-w-[200px] truncate">{product.description}</TableCell>
                    <TableCell>{formatCurrency(product.price)}</TableCell>
                    <TableCell>{product.quantity}</TableCell>
                    <TableCell>{product.category?.name || "Unknown"}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            Actions
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => openEditDialog(product)}>
                            <Pencil className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => openDeleteDialog(product)}
                            className="text-destructive focus:text-destructive"
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      )}

      <ProductDialog
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
        onSubmit={handleCreateProduct}
        title="Create New Product"
      />

      {currentProduct && (
        <>
          <ProductDialog
            open={isEditDialogOpen}
            onOpenChange={setIsEditDialogOpen}
            onSubmit={(data) => handleUpdateProduct(currentProduct._id, data)}
            title="Edit Product"
            defaultValues={{
              name: currentProduct.name,
              description: currentProduct.description,
              price: currentProduct.price.toString(),
              quantity: currentProduct.quantity.toString(),
              category: currentProduct.category._id,
              imageUrl: currentProduct.imageUrl,
            }}
          />

          <DeleteConfirmDialog
            open={isDeleteDialogOpen}
            onOpenChange={setIsDeleteDialogOpen}
            onConfirm={() => handleDeleteProduct(currentProduct._id)}
            title={`Delete Product: ${currentProduct.name}`}
            description="Are you sure you want to delete this product? This action cannot be undone."
          />
        </>
      )}
    </div>
  )
}
