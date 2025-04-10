"use client"

import { useEffect, useState } from "react"
import { Plus, Pencil, Trash } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
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
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface Category {
  _id: string
  name: string
  createdAt: string
}

export default function CategoriesPageUI() {
  const [categories, setCategories] = useState<Category[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [newCategoryName, setNewCategoryName] = useState("")

  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [editCategoryId, setEditCategoryId] = useState<string | null>(null)
  const [editCategoryName, setEditCategoryName] = useState("")

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [deleteCategoryId, setDeleteCategoryId] = useState<string | null>(null)

  useEffect(() => {
    fetchCategories()
  }, [])

  const fetchCategories = async () => {
    setIsLoading(true)
    try {
      const response = await fetch("http://localhost:8080/categories")
      const data = await response.json()
      setCategories(Array.isArray(data.data) ? data.data : [])
    } catch (error) {
      console.error("Failed to fetch categories:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleCreateCategory = async () => {
    if (!newCategoryName.trim()) return
    try {
      const response = await fetch("http://localhost:8080/categories", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: newCategoryName }),
      })

      if (response.ok) {
        await fetchCategories()
        setNewCategoryName("")
        setIsCreateDialogOpen(false)
      }
    } catch (error) {
      console.error("Failed to create category:", error)
    }
  }

  const handleOpenEdit = (id: string, name: string) => {
    setEditCategoryId(id)
    setEditCategoryName(name)
    setIsEditDialogOpen(true)
  }

  const handleEditCategory = async () => {
    if (!editCategoryId || !editCategoryName.trim()) return
    try {
      const response = await fetch(`http://localhost:8080/categories/${editCategoryId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: editCategoryName }),
      })

      if (response.ok) {
        await fetchCategories()
        setIsEditDialogOpen(false)
        setEditCategoryId(null)
        setEditCategoryName("")
      }
    } catch (error) {
      console.error("Failed to update category:", error)
    }
  }

  const handleDeleteCategory = async () => {
    if (!deleteCategoryId) return
    try {
      const response = await fetch(`http://localhost:8080/categories/${deleteCategoryId}`, {
        method: "DELETE",
      })

      if (response.ok) {
        await fetchCategories()
        setDeleteCategoryId(null)
        setIsDeleteDialogOpen(false)
      }
    } catch (error) {
      console.error("Failed to delete category:", error)
    }
  }

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Categories</h1>
        <Button onClick={() => setIsCreateDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Category
        </Button>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-8">Loading categories...</div>
      ) : (
        <div className="border rounded-md">
          <Table>
            <TableCaption>A list of all product categories.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Created At</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {categories.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={3} className="text-center py-6">
                    No categories found. Create your first category.
                  </TableCell>
                </TableRow>
              ) : (
                categories.map((category) => (
                  <TableRow key={category._id}>
                    <TableCell>{category.name}</TableCell>
                    <TableCell>{new Date(category.createdAt).toLocaleDateString()}</TableCell>
                    <TableCell className="text-right flex gap-2 justify-end">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleOpenEdit(category._id, category.name)}
                      >
                        <Pencil className="w-4 h-4 mr-1" />
                        Edit
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => {
                          setDeleteCategoryId(category._id)
                          setIsDeleteDialogOpen(true)
                        }}
                      >
                        <Trash className="w-4 h-4 mr-1" />
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      )}

      {/* Create Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Category</DialogTitle>
          </DialogHeader>
          <Input
            placeholder="Enter category name"
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
          />
          <div className="flex justify-end gap-2 mt-4">
            <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreateCategory}>Create</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Category</DialogTitle>
          </DialogHeader>
          <Input
            placeholder="Edit category name"
            value={editCategoryName}
            onChange={(e) => setEditCategoryName(e.target.value)}
          />
          <div className="flex justify-end gap-2 mt-4">
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleEditCategory}>Save</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Confirm Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Delete</DialogTitle>
          </DialogHeader>
          <p>Are you sure you want to delete this category?</p>
          <div className="flex justify-end gap-2 mt-4">
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteCategory}>
              Delete
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
