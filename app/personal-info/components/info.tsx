"use client"
import { useEffect, useState, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import axios from "axios"
import { useUserStore } from "@/lib/store/useUserStore"
import { Camera, Loader2 } from "lucide-react"

const PersonalPageUI = () => {
  const token = useUserStore((state) => state.token)
  const [userInfo, setUserInfo] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    avatarUrl: "",
  })
  const [tempUserInfo, setTempUserInfo] = useState(userInfo)
  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (!token) return

    const fetchUser = async () => {
      try {
        const res = await axios.get("http://localhost:8080/auth/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        const data = res.data.data
        setUserInfo(data)
        setTempUserInfo(data)
      } catch (error: any) {
        if (error.response?.status === 401) {
        } else {
          console.error("Lỗi lấy thông tin người dùng:", error)
        }
      } finally {
        setIsLoading(false)
      }
    }

    fetchUser()
  }, [token])

  useEffect(() => {
    if (isEditing) {
      setTempUserInfo(userInfo)
    }
  }, [isEditing, userInfo])


  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setIsUploadingAvatar(true)
    try {
      const formData = new FormData()
      formData.append("avatar", file)

      const res = await axios.post("http://localhost:8080/auth/change_avatar", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      })

      const newAvatarUrl = res.data.data.url
      setUserInfo((prev) => ({ ...prev, avatarUrl: newAvatarUrl }))
      setTempUserInfo((prev) => ({ ...prev, avatarUrl: newAvatarUrl }))
    } catch (error: any) {
      console.error("Lỗi khi cập nhật ảnh đại diện:", error)
    } finally {
      setIsUploadingAvatar(false)
    }
  }

  const triggerFileInput = () => {
    fileInputRef.current?.click()
  }

  if (isLoading) return <p className="p-4">Đang tải thông tin...</p>

  return (
    <>
      <div className="container mx-auto mt-12">
        <Card>
          <CardHeader>
            <CardTitle>Thông tin cá nhân</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-center mb-6 relative">
              <div className="relative group">
                {userInfo.avatarUrl ? (
                  <img
                    src={userInfo.avatarUrl || "/placeholder.svg"}
                    alt="Avatar"
                    className="w-24 h-24 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-500 text-xl">{userInfo.fullName?.charAt(0) || "U"}</span>
                  </div>
                )}

                <button
                  type="button"
                  onClick={triggerFileInput}
                  className="absolute bottom-0 right-0 bg-primary text-white p-2 rounded-full shadow-md hover:bg-primary/90 transition-colors"
                  disabled={isUploadingAvatar}
                >
                  {isUploadingAvatar ? <Loader2 className="h-4 w-4 animate-spin" /> : <Camera className="h-4 w-4" />}
                </button>

                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleAvatarChange}
                  accept="image/*"
                  className="hidden"
                  disabled={isUploadingAvatar}
                />
              </div>
            </div>

            <form>
              <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="fullName">Họ và tên</Label>
                  <Input
                    id="fullName"
                    name="fullName"
                    value={tempUserInfo.fullName}
                    required
                    disabled={!isEditing}
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" name="email" value={tempUserInfo.email} disabled />
                </div>
              </div>
            </form>

            {!isEditing && (
              <div className="w-full mt-8">
                <Button onClick={() => setIsEditing(true)}>Chỉnh sửa</Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </>
  )
}

export default PersonalPageUI

