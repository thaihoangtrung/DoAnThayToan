"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Trash2, Plus, RefreshCw, Pencil } from "lucide-react" // Added Pencil icon
import axios from "axios"

const API_URL = "http://localhost:8080"

interface Coupon {
  _id: string
  code: string
  value: number
  createdAt: string
  updatedAt: string
}

export default function CouponManagement() {
  const [coupons, setCoupons] = useState<Coupon[]>([])
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState<boolean>(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState<boolean>(false) // State for edit dialog
  const [newCoupon, setNewCoupon] = useState<{ code: string; value: number }>({ code: "", value: 0 })
  const [editingCoupon, setEditingCoupon] = useState<Coupon | null>(null) // State for the coupon being edited
  const [updatedValue, setUpdatedValue] = useState<number>(0) // State for the updated value
  const [isLoading, setIsLoading] = useState<boolean>(true)

  const fetchCoupons = async () => {
    setIsLoading(true)
    try {
      const response = await axios.get(`${API_URL}/coupon`)
      if (response.data && response.data.data) {
        setCoupons(response.data.data)
      } else {
        setCoupons([])
      }
    } catch (error) {
      console.error("Error fetching coupons:", error)
      setCoupons([])
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchCoupons()
  }, [])

  const handleCreateCoupon = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      // Ensure value is a number before sending
      const payload = { ...newCoupon, value: Number(newCoupon.value) || 0 }
      await axios.post(`${API_URL}/coupon`, payload)
      setNewCoupon({ code: "", value: 0 })
      setIsCreateDialogOpen(false)
      fetchCoupons()
    } catch (error) {
      console.error("Error creating coupon:", error)
      // Add user feedback here (e.g., toast notification)
    }
  }

  const handleDeleteCoupon = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this coupon?")) {
      return
    }
    try {
      // Assuming your backend needs the ID to delete
      await axios.delete(`${API_URL}/coupon/${id}`) // Corrected to use ID if needed by backend
      fetchCoupons()
    } catch (error) {
      console.error("Error deleting coupon:", error)
       // Add user feedback here
    }
  }

  // Function to open the edit dialog
  const handleOpenEditDialog = (coupon: Coupon) => {
    setEditingCoupon(coupon)
    setUpdatedValue(coupon.value)
    setIsEditDialogOpen(true)
  }

  // Function to handle the update submission
  const handleUpdateCoupon = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingCoupon) return

    try {
      await axios.put(`${API_URL}/coupon/update/${editingCoupon.code}`, {
        value: updatedValue,
      })
      setIsEditDialogOpen(false)
      setEditingCoupon(null)
      fetchCoupons()
    } catch (error) {
      console.error("Error updating coupon:", error)
      // Add user feedback here
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-2xl font-bold">Coupon Management</CardTitle>
          <div className="flex gap-2">
            <Button variant="outline" size="icon" onClick={fetchCoupons} disabled={isLoading} aria-label="Refresh Coupons">
              <RefreshCw className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
              <span className="sr-only">Refresh</span>
            </Button>
            <Button onClick={() => setIsCreateDialogOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Create Coupon
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {coupons.length === 0 && !isLoading ? (
            <div className="text-center py-8 text-muted-foreground">
              No coupons found. Create your first coupon to get started.
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Code</TableHead>
                  <TableHead>Value</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-8">
                      <RefreshCw className="h-6 w-6 animate-spin mx-auto" />
                      <span className="mt-2 block text-sm text-muted-foreground">Loading coupons...</span>
                    </TableCell>
                  </TableRow>
                ) : (
                  coupons.map((coupon) => (
                    <TableRow key={coupon._id}>
                      <TableCell className="font-medium">{coupon.code}</TableCell>
                      <TableCell>{coupon.value}</TableCell>
                      <TableCell>{formatDate(coupon.createdAt)}</TableCell>
                      <TableCell className="text-right space-x-1"> {/* Added space-x-1 for button spacing */} 
                        <Button variant="ghost" size="icon" onClick={() => handleOpenEditDialog(coupon)} aria-label={`Edit coupon ${coupon.code}`}>
                          <Pencil className="h-4 w-4 text-blue-500" />
                          <span className="sr-only">Edit</span>
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleDeleteCoupon(coupon._id)} aria-label={`Delete coupon ${coupon.code}`}>
                          <Trash2 className="h-4 w-4 text-destructive" />
                          <span className="sr-only">Delete</span>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Create Coupon Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Coupon</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleCreateCoupon} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="create-code">Coupon Code</Label>
              <Input
                id="create-code"
                placeholder="e.g. SUMMER25"
                value={newCoupon.code}
                onChange={(e) => setNewCoupon({ ...newCoupon, code: e.target.value.toUpperCase() })}
                required
                aria-required="true"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="create-value">Discount Value</Label>
              <Input
                id="create-value"
                type="number"
                min="0"
                placeholder="e.g. 25"
                value={newCoupon.value || ""}
                onChange={(e) => setNewCoupon({ ...newCoupon, value: Number.parseFloat(e.target.value) || 0 })}
                required
                aria-required="true"
              />
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">Create Coupon</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Edit Coupon Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Coupon: {editingCoupon?.code}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleUpdateCoupon} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="edit-code">Coupon Code</Label>
              <Input
                id="edit-code"
                value={editingCoupon?.code || ""}
                readOnly
                disabled
                className="bg-muted"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-value">New Discount Value</Label>
              <Input
                id="edit-value"
                type="number"
                min="0"
                placeholder="e.g. 30"
                value={updatedValue || ""}
                onChange={(e) => setUpdatedValue(Number.parseFloat(e.target.value) || 0)}
                required
                aria-required="true"
              />
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">Save Changes</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
} 