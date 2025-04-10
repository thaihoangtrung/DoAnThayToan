"use client";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import SidebarUserPage from "@/components/sidebar-user";
import axios from "axios";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");

    try {
      const response = await axios.post("http://localhost:8080/auth/forgotpassword", {
        email,
      });

      if (response.status === 200) {
        setMessage("Liên kết đặt lại mật khẩu đã được gửi đến email của bạn.");
        setEmail("");
      } else {
        setMessage("Đã xảy ra lỗi. Vui lòng thử lại.");
      }
    } catch (error: any) {
      console.error("Forgot password error:", error);
      setMessage(
        error.response?.data?.message || "Đã xảy ra lỗi. Vui lòng thử lại."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen container mx-auto mt-12">
      <div className="flex-grow p-4">
        <Card>
          <CardHeader>
            <CardTitle>Quên mật khẩu</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col gap-4">
                <Label htmlFor="email">Địa chỉ email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={handleChange}
                  placeholder="Nhập email của bạn"
                  required
                />
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Đang gửi..." : "Gửi liên kết đặt lại mật khẩu"}
                </Button>
                {message && (
                  <p className="mt-4 text-center text-green-600">
                    {message}
                  </p>
                )}
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ForgotPassword;
