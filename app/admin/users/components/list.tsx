"use client"

import { useEffect, useState } from "react"
import axios from "axios"
import { format } from "date-fns"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Loader2 } from "lucide-react"
import { useUserStore } from "@/lib/store/useUserStore"

interface User {
  _id: string
  username: string
  email: string
  fullName: string
  avatarUrl: string
  loginCount: string
  role: string
  status: boolean
  createdAt: string
  updatedAt: string
}

export default function UserTable() {
  const token = useUserStore((state) => state.token)
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  console.log("token", token)
  useEffect(() => {
    if (!token) return
    const fetchUsers = async () => {
      try {
        setLoading(true)
        const response = await axios.get("http://localhost:8080/users", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        if (response.data) {
          setUsers(response.data.data)
        } else {
          setError("Failed to fetch users")
        }
      } catch (err) {
        setError("An error occurred while fetching users")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchUsers()
  }, [token])

  const getInitials = (name: string) => {
    if (!name || name.trim() === "") return "U"
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), "MMM dd, yyyy")
    } catch (e) {
      return dateString
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-destructive">{error}</p>
      </div>
    )
  }

  return (
    <>
      <section className="container mx-auto p-4">
        <Card>
          <CardHeader>
            <CardTitle>Users</CardTitle>
            <CardDescription>Manage your users and their permissions.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Username</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead>Last Updated</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user._id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={user.avatarUrl} alt={user.username} />
                          <AvatarFallback>{getInitials(user.fullName || user.username)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{user.fullName || user.username}</p>
                          <p className="text-xs text-muted-foreground">Login count: {user.loginCount}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{user.username}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{user.role}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={user.status ? "default" : "secondary"}
                        className={user.status ? "bg-green-100 text-green-800" : ""}
                      >
                        {user.status ? "Active" : "Inactive"}
                      </Badge>
                    </TableCell>
                    <TableCell>{formatDate(user.createdAt)}</TableCell>
                    <TableCell>{formatDate(user.updatedAt)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </section>
    </>
  )
}

