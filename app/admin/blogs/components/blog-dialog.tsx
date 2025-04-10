"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Category {
  _id: string
  name: string
}

interface BlogDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (data: FormData) => Promise<boolean>
  title: string
  defaultValues?: {
    title: string
    content: string
    category: string
    imageUrl?: string
  }
}

export function BlogDialog({ open, onOpenChange, onSubmit, title, defaultValues }: BlogDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [categories, setCategories] = useState<Category[]>([])
  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)

  const formSchema = z.object({
    title: z.string().min(1, "Title is required"),
    content: z.string().min(1, "Content is required"),
    category: z.string().min(1, "Category is required"),
    image: z.any().optional(),
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: defaultValues?.title || "",
      content: defaultValues?.content || "",
      category: defaultValues?.category || "",
      image: undefined,
    },
  })

  useEffect(() => {
    fetchCategories()

    if (defaultValues?.imageUrl) {
      setPreviewUrl(`http://localhost:8080${defaultValues.imageUrl}`)
    }
  }, [defaultValues])

  const fetchCategories = async () => {
    try {
      const response = await fetch("http://localhost:8080/blogcategorys")
      const data = await response.json()
      setCategories(Array.isArray(data.data) ? data.data : [])
    } catch (error) {
      console.error("Failed to fetch categories:", error)
    }
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setSelectedImage(file)
      const fileUrl = URL.createObjectURL(file)
      setPreviewUrl(fileUrl)
    }
  }

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true)
    try {
      const formData = new FormData()
      formData.append("title", values.title)
      formData.append("content", values.content)
      formData.append("category", values.category)

      if (selectedImage) {
        formData.append("image", selectedImage)
      }

      const success = await onSubmit(formData)
      if (success) {
        form.reset()
        setSelectedImage(null)
        setPreviewUrl(null)
      }
      return success
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>Fill in the details for the blog post.</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter blog title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Content</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Enter blog content" className="min-h-[120px]" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category._id} value={category._id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="image"
              render={({ field: { value, onChange, ...field } }) => (
                <FormItem>
                  <FormLabel>Image</FormLabel>
                  <FormControl>
                    <div className="space-y-2">
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          handleImageChange(e)
                          onChange(e.target.files?.[0] || null)
                        }}
                        {...field}
                      />
                      {previewUrl && (
                        <div className="relative w-full h-40 rounded-md overflow-hidden border">
                          <img
                            src={previewUrl || "/placeholder.svg"}
                            alt="Preview"
                            className="object-contain w-full h-full"
                          />
                        </div>
                      )}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={isSubmitting}>
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Saving..." : defaultValues ? "Update" : "Create"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

