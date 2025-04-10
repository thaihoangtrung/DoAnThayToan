"use client"

import { useState, useEffect } from "react"
import { Plus, Pencil } from "lucide-react"
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
// Ensure paths are correct based on your project structure
import { CreateCategoryDialog } from "./create-category-dialog" 
import { EditCategoryDialog } from "./edit-category-dialog"

// Define the interface using _id from MongoDB
interface BlogCategory {
  _id: string // Use _id instead of id
  name: string
  createdAt: string
  // Add other fields if necessary, like updatedAt
}

export default function BlogCategoriesPage() {
  const [categories, setCategories] = useState<BlogCategory[]>([])
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  // State to hold the category currently being edited
  const [selectedCategory, setSelectedCategory] = useState<BlogCategory | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null) // Add error state

  // Fetch categories when the component mounts
  useEffect(() => {
    fetchCategories()
  }, [])

  const fetchCategories = async () => {
    setIsLoading(true)
    setError(null) // Reset error on new fetch
    try {
      const response = await axios.get("http://localhost:8080/blogcategorys")
      // Ensure the response data structure is correct and use _id
      if (response.data && Array.isArray(response.data.data)) {
         setCategories(response.data.data) 
      } else {
         console.error("Unexpected response structure:", response.data)
         setCategories([]) // Set to empty array on unexpected structure
         setError("Định dạng dữ liệu danh mục không hợp lệ.")
      }
    } catch (error) {
      console.error("Không thể lấy danh mục:", error)
      setError("Không thể tải danh sách danh mục. Vui lòng thử lại.")
      setCategories([]) // Clear categories on error
    } finally {
      setIsLoading(false)
    }
  }

  // Handler for creating a new category
  const handleCreateCategory = async (name: string): Promise<boolean> => {
    try {
      const response = await axios.post("http://localhost:8080/blogcategorys", { name })
      // Check for successful status codes
      if (response.status === 201 || response.status === 200) {
        await fetchCategories() // Refresh list on success
        setIsCreateDialogOpen(false) // Close dialog
        return true
      }
      // Handle unexpected success status codes if necessary
      console.warn("Create request succeeded with unexpected status:", response.status);
      setError("Tạo danh mục thành công nhưng có phản hồi không mong đợi.")
      return false;
    } catch (error: any) {
      console.error("Không thể tạo danh mục:", error)
      // Set specific error message based on backend response if possible
      const errorMessage = error.response?.data?.message || "Không thể tạo danh mục. Vui lòng thử lại."
      setError(errorMessage)
      return false
    }
  }

  // Handler for initiating the edit process
  const handleEditClick = (category: BlogCategory) => {
    setSelectedCategory(category) // Set the category to be edited
    setIsEditDialogOpen(true) // Open the edit dialog
  }

  // Handler for submitting the edited category
  // Accepts id (which is _id) and the new name
  const handleEditCategory = async (id: string, name: string): Promise<boolean> => {
    if (!id) {
        console.error("Edit handler called without ID.");
        setError("Không thể cập nhật danh mục: ID bị thiếu.")
        return false;
    }
    try {
      // Use the correct ID in the PUT request URL
      const response = await axios.put(`http://localhost:8080/blogcategorys/${id}`, { name })
      if (response.status === 200) {
        await fetchCategories() // Refresh list on success
        setIsEditDialogOpen(false) // Close dialog
        setSelectedCategory(null) // Clear selected category
        return true
      }
       // Handle unexpected success status codes if necessary
      console.warn("Update request succeeded with unexpected status:", response.status);
      setError("Cập nhật danh mục thành công nhưng có phản hồi không mong đợi.")
      return false;
    } catch (error: any) {
      console.error("Không thể cập nhật danh mục:", error)
      const errorMessage = error.response?.data?.message || "Không thể cập nhật danh mục. Vui lòng thử lại."
      setError(errorMessage)
      // Keep the dialog open by not returning true or changing state here
      return false 
    }
  }

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Danh mục bài viết</h1>
        <Button onClick={() => setIsCreateDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Thêm danh mục
        </Button>
      </div>

      {/* Display loading message */} 
      {isLoading && <div className="flex justify-center py-8">Đang tải danh mục...</div>}

      {/* Display error message if any */} 
      {error && !isLoading && <div className="text-red-500 text-center py-4">Lỗi: {error}</div>}

      {/* Display table only when not loading and no critical fetch error */} 
      {!isLoading && !error && (
        <Table>
          <TableCaption>Danh sách tất cả danh mục blog.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Tên danh mục</TableHead>
              <TableHead>Ngày tạo</TableHead>
              <TableHead className="w-[100px] text-right">Thao tác</TableHead> 
            </TableRow>
          </TableHeader>
          <TableBody>
            {categories.length === 0 ? (
              <TableRow>
                <TableCell colSpan={3} className="text-center py-6">
                  Chưa có danh mục nào. Hãy tạo danh mục đầu tiên của bạn.
                </TableCell>
              </TableRow>
            ) : (
              // Map through categories, using _id as the key
              categories.map((category) => (
                <TableRow key={category._id}> 
                  <TableCell className="font-medium">{category.name}</TableCell>
                  <TableCell>{new Date(category.createdAt).toLocaleDateString("vi-VN")}</TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleEditClick(category)} // Pass the full category object
                      aria-label={`Chỉnh sửa danh mục ${category.name}`}
                      className="h-8 w-8"
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      )}

      {/* Create Category Dialog */} 
      <CreateCategoryDialog
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
        onCreateCategory={handleCreateCategory}
      />

      {/* Edit Category Dialog - Rendered only when a category is selected */} 
      {selectedCategory && (
        <EditCategoryDialog
          open={isEditDialogOpen}
          onOpenChange={setIsEditDialogOpen}
          onEditCategory={handleEditCategory} // Pass the edit handler
          category={selectedCategory} // Pass the selected category object (with _id)
        />
      )}
    </div>
  )
} 