"use client"

import { useState, useEffect } from "react"
import { Plus, Pencil, Trash2 } from "lucide-react"
import Image from "next/image"
import axios from "axios"

import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { BlogDialog } from "./blog-dialog"
import { DeleteConfirmDialog } from "./delete-confirm-dialog"

interface Category {
  _id: string
  name: string
}

interface Blog {
  _id: string
  title: string
  content: string
  category: Category
  imageUrl: string
  createdAt: string
  updatedAt: string
}

export default function BlogsPage() {
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [currentBlog, setCurrentBlog] = useState<Blog | null>(null)

  useEffect(() => {
    fetchBlogs()
  }, [])

  const fetchBlogs = async () => {
    setIsLoading(true)
    try {
      const response = await axios.get("http://localhost:8080/blogs")
      setBlogs(Array.isArray(response.data.data) ? response.data.data : [])
    } catch (error) {
      console.error("Failed to fetch blogs:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleCreateBlog = async (blogData: FormData) => {
    try {
      const response = await axios.post("http://localhost:8080/blogs", blogData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })

      if (response.status === 200 || response.status === 201) {
        await fetchBlogs()
        setIsCreateDialogOpen(false)
        return true
      }
      return false
    } catch (error) {
      console.error("Failed to create blog:", error)
      return false
    }
  }

  const handleUpdateBlog = async (id: string, blogData: FormData) => {
    try {
      // Extract all fields from FormData
      const title = blogData.get("title") as string
      const content = blogData.get("content") as string
      const category = blogData.get("category") as string
      const image = blogData.get("image") as File | null

      // If there's a new image, use FormData for the request
      if (image && image.size > 0) {
        const response = await axios.put(`http://localhost:8080/blogs/${id}`, blogData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })

        if (response.status === 200) {
          await fetchBlogs()
          setIsEditDialogOpen(false)
          return true
        }
      } else {
        // If no new image, send JSON data
        const jsonData = {
          title,
          content,
          category,
        }

        const response = await axios.put(`http://localhost:8080/blogs/${id}`, jsonData)

        if (response.status === 200) {
          await fetchBlogs()
          setIsEditDialogOpen(false)
          return true
        }
      }
      return false
    } catch (error) {
      console.error("Failed to update blog:", error)
      return false
    }
  }

  const handleDeleteBlog = async (id: string) => {
    try {
      const response = await axios.delete(`http://localhost:8080/blogs/${id}`)

      if (response.status === 200) {
        await fetchBlogs()
        setIsDeleteDialogOpen(false)
        return true
      }
      return false
    } catch (error) {
      console.error("Failed to delete blog:", error)
      return false
    }
  }

  const openEditDialog = (blog: Blog) => {
    setCurrentBlog(blog)
    setIsEditDialogOpen(true)
  }

  const openDeleteDialog = (blog: Blog) => {
    setCurrentBlog(blog)
    setIsDeleteDialogOpen(true)
  }

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Blog Management</h1>
        <Button onClick={() => setIsCreateDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Blog
        </Button>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-8">Loading blogs...</div>
      ) : (
        <div className="border rounded-md">
          <Table>
            <TableCaption>A list of all blogs.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[80px]">Image</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Content</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Created At</TableHead>
                <TableHead className="w-[100px] text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {blogs.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-6">
                    No blogs found. Create your first blog.
                  </TableCell>
                </TableRow>
              ) : (
                blogs.map((blog) => (
                  <TableRow key={blog._id}>
                    <TableCell>
                      {blog.imageUrl && (
                        <div className="relative w-12 h-12 rounded-md overflow-hidden">
                          <Image
                            src={`http://localhost:8080${blog.imageUrl}`}
                            alt={blog.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                      )}
                    </TableCell>
                    <TableCell className="font-medium">{blog.title}</TableCell>
                    <TableCell className="max-w-[200px] truncate">{blog.content}</TableCell>
                    <TableCell>{blog.category?.name || "Unknown"}</TableCell>
                    <TableCell>{new Date(blog.createdAt).toLocaleDateString()}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            Actions
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => openEditDialog(blog)}>
                            <Pencil className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => openDeleteDialog(blog)}
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

      <BlogDialog
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
        onSubmit={handleCreateBlog}
        title="Create New Blog"
      />

      {currentBlog && (
        <>
          <BlogDialog
            open={isEditDialogOpen}
            onOpenChange={setIsEditDialogOpen}
            onSubmit={(data) => handleUpdateBlog(currentBlog._id, data)}
            title="Edit Blog"
            defaultValues={{
              title: currentBlog.title,
              content: currentBlog.content,
              category: currentBlog.category._id,
              imageUrl: currentBlog.imageUrl,
            }}
          />

          <DeleteConfirmDialog
            open={isDeleteDialogOpen}
            onOpenChange={setIsDeleteDialogOpen}
            onConfirm={() => handleDeleteBlog(currentBlog._id)}
            title={`Delete Blog: ${currentBlog.title}`}
            description="Are you sure you want to delete this blog? This action cannot be undone."
          />
        </>
      )}
    </div>
  )
}

