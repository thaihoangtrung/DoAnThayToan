"use client"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import axios from "axios"
import { useUserStore } from "@/lib/store/useUserStore"
import { useRouter } from "next/navigation"

const ChangePassword = () => {
  const token = useUserStore((state) => state.token)
  const [formData, setFormData] = useState({
    oldpassword: "",
    newpassword: "",
    confirmPassword: "",
  })
  const [message, setMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const isInvalid =
    !formData.oldpassword || !formData.newpassword || !formData.confirmPassword

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setMessage("")

    if (formData.newpassword !== formData.confirmPassword) {
      setMessage("Mật khẩu mới không khớp. Vui lòng thử lại.")
      setIsLoading(false)
      return
    }

    try {
      const response = await axios.post(
        "http://localhost:8080/auth/changepassword",
        {
          oldpassword: formData.oldpassword,
          newpassword: formData.newpassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      if (response.status === 200) {
        setMessage("Mật khẩu đã được thay đổi thành công.")
        setFormData({
          oldpassword: "",
          newpassword: "",
          confirmPassword: "",
        })
        setTimeout(() => {
          useUserStore.getState().clearUser()
          router.push("/signin")
        }, 1500)
      } else {
        setMessage("Đã xảy ra lỗi. Vui lòng thử lại.")
      }
    } catch (error: any) {
      if (error.response?.status === 401) {
        setMessage("Mật khẩu hiện tại không đúng.")
      } else {
        setMessage(
          error.response?.data?.message || "Đã xảy ra lỗi. Vui lòng thử lại."
        )
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col md:flex-row mt-12">
      <div className="flex-grow p-4">
        <Card className="max-w-xl mx-auto shadow-md border border-gray-200">
          <CardHeader>
            <CardTitle className="text-xl">Thay đổi mật khẩu</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="oldpassword">Mật khẩu hiện tại</Label>
                <Input
                  id="oldpassword"
                  name="oldpassword"
                  type="password"
                  value={formData.oldpassword}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="newpassword">Mật khẩu mới</Label>
                <Input
                  id="newpassword"
                  name="newpassword"
                  type="password"
                  value={formData.newpassword}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="confirmPassword">Xác nhận mật khẩu mới</Label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
              </div>
              <Button
                type="submit"
                className="w-full"
                disabled={isLoading || isInvalid}
              >
                {isLoading ? "Đang xử lý..." : "Thay đổi mật khẩu"}
              </Button>
              {message && (
                <p
                  className={`mt-4 text-center text-sm ${message.includes("thành công")
                    ? "text-green-600"
                    : "text-red-600"
                    }`}
                >
                  {message}
                </p>
              )}
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default ChangePassword
