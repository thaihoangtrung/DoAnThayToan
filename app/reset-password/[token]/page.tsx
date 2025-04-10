"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import axios from "axios"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"

const ResetPassword = () => {
  const router = useRouter()
  const params = useParams()
  const token = params?.token as string

  const [formData, setFormData] = useState({
    newpassword: "",
    confirmPassword: "",
  })

  const [message, setMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isValidToken, setIsValidToken] = useState(false)

  useEffect(() => {
    if (!token || token.length < 20) {
      setMessage("Token không hợp lệ hoặc đã hết hạn")
      router.push("/forgot-password")
    } else {
      setIsValidToken(true)
    }
  }, [token, router])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setMessage("")

    if (!isValidToken) {
      setMessage("Token không hợp lệ hoặc đã hết hạn")
      setIsLoading(false)
      return
    }

    if (formData.newpassword !== formData.confirmPassword) {
      setMessage("Mật khẩu mới không khớp. Vui lòng thử lại.")
      setIsLoading(false)
      return
    }

    try {
      const response = await axios.post(
        `http://localhost:8080/auth/reset_password/${token}`,
        {
          password: formData.newpassword,
        }
      )

      if (response.status === 200) {
        setMessage("Mật khẩu đã được thay đổi thành công.")
        setFormData({
          newpassword: "",
          confirmPassword: "",
        })

        setTimeout(() => {
          router.push("/signin")
        }, 2000)
      }
    } catch (error: any) {
      console.error("Password reset error:", error)
      setMessage(
        error.response?.data?.message || "Đã xảy ra lỗi. Vui lòng thử lại."
      )
    } finally {
      setIsLoading(false)
    }
  }

  if (!isValidToken) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Card className="w-full max-w-md">
          <CardContent className="p-6">
            <p className="text-red-600 text-center">{message}</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="flex flex-col md:flex-row container mx-auto p-4 gap-4 mt-12">
      <div className="flex-grow p-4">
        <Card>
          <CardHeader>
            <CardTitle>Thay đổi mật khẩu</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="newpassword">Mật khẩu mới</Label>
                <Input
                  id="newpassword"
                  name="newpassword"
                  type="password"
                  value={formData.newpassword}
                  onChange={handleChange}
                  required
                  minLength={6}
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
                  minLength={6}
                />
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Đang xử lý..." : "Thay đổi mật khẩu"}
              </Button>
              {message && (
                <p
                  className={`mt-4 text-center ${message.includes("thành công")
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

export default ResetPassword
