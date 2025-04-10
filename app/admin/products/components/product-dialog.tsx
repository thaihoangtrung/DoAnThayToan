"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import axios from "axios"

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

interface ProductDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (data: FormData) => Promise<boolean>
  title: string
  defaultValues?: {
    name: string
    description: string
    price: string
    quantity: string
    category: string
    imageUrl?: string
  }
}

export function ProductDialog({ open, onOpenChange, onSubmit, title, defaultValues }: ProductDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [categories, setCategories] = useState<Category[]>([])
  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)

  const formSchema = z.object({
    name: z.string().min(1, "Product name is required"),
    description: z.string().min(1, "Description is required"),
    price: z
      .string()
      .min(1, "Price is required")
      .refine((val) => !isNaN(Number(val)) && Number(val) > 0, { message: "Price must be a positive number" }),
    quantity: z
      .string()
      .min(1, "Quantity is required")
      .refine((val) => !isNaN(Number(val)) && Number(val) >= 0 && Number.isInteger(Number(val)), {
        message: "Quantity must be a non-negative integer",
      }),
    category: z.string().min(1, "Category is required"),
    image: z.any().optional(),
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: defaultValues?.name || "",
      description: defaultValues?.description || "",
      price: defaultValues?.price || "",
      quantity: defaultValues?.quantity || "",
      category: defaultValues?.category || "",
      image: undefined,
    },
  })

  useEffect(() => {
    fetchCategories()

    // Set preview URL if we have a default image
    if (defaultValues?.imageUrl) {
      setPreviewUrl(`http://localhost:8080${defaultValues.imageUrl}`)
    }
  }, [defaultValues])

  const fetchCategories = async () => {
    try {
      const response = await axios.get("http://localhost:8080/categories")
      setCategories(Array.isArray(response.data.data) ? response.data.data : [])
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
  console.log("categories", categories)
  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true)
    try {
      const formData = new FormData()
      formData.append("name", values.name)
      formData.append("description", values.description)
      formData.append("price", values.price)
      formData.append("quantity", values.quantity)
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
          <DialogDescription>Fill in the details for the product.</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter product name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Enter product description" className="min-h-[100px]" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price</FormLabel>
                    <FormControl>
                      <Input type="number" step="0.01" min="0" placeholder="Enter price" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="quantity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Quantity</FormLabel>
                    <FormControl>
                      <Input type="number" step="1" min="0" placeholder="Enter quantity" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

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

