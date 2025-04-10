"use client"

import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

const formSchema = z.object({
  name: z.string().min(1, "Tên danh mục không được để trống"),
})

// Interface for the category object expected by this component
interface DialogCategory {
  _id: string // Use _id
  name: string
}

interface EditCategoryDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  // Ensure onEditCategory expects _id
  onEditCategory: (id: string, name: string) => Promise<boolean>
  category: DialogCategory // Expect category with _id
}

export function EditCategoryDialog({
  open,
  onOpenChange,
  onEditCategory,
  category,
}: EditCategoryDialogProps) {
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    // Use category.name for default value, but ensure the category object is correctly passed
    defaultValues: {
      name: "", // Initialize empty, set default below
    },
  })

  // Update default value when category changes (e.g., when dialog opens)
  useEffect(() => {
    if (category) {
      form.reset({ name: category.name });
    }
  }, [category, form]);


  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!category?._id) {
        console.error("Category ID is missing");
        // Optionally show an error message to the user
        return;
    }
    setIsLoading(true)
    try {
      // Pass category._id to the handler
      const success = await onEditCategory(category._id, values.name)
      if (success) {
        onOpenChange(false) // Close dialog on success
      }
      // If not successful, the dialog remains open, potentially showing an error message (handled in parent/handler)
    } catch (error) {
        console.error("Failed to submit edit form:", error);
        // Optionally show error to user here
    }
     finally {
      setIsLoading(false)
    }
  }

  // Reset form state when dialog closes
  useEffect(() => {
    if (!open) {
      form.reset({ name: category?.name || "" }); // Reset to current category name or empty
      setIsLoading(false); // Reset loading state
    }
  }, [open, form, category]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Chỉnh sửa danh mục</DialogTitle>
          <DialogDescription>
            Nhập tên mới cho danh mục blog `{category?.name}`.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tên danh mục mới</FormLabel>
                  <FormControl>
                    <Input placeholder="Nhập tên danh mục" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                disabled={isLoading}
              >
                Hủy
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Đang cập nhật..." : "Cập nhật"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
} 