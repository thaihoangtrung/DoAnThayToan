"use client";

import { useState } from "react";
import axios from "axios";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post("http://localhost:8080/contacts", formData);
      console.log("Phản hồi từ server:", response.data);
      setFormData({ name: "", email: "", phone: "", message: "" });
    } catch (error) {
      console.error("Lỗi gửi dữ liệu:", error);
    }

    setLoading(false);
  };

  return (
    <div className="flex min-h-[70vh] w-full items-center justify-center p-6 md:p-10 container mx-auto">
      <div className="w-full">
        <div className="w-full space-y-8">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold">Liên Hệ</h1>
            <p className="text-gray-500 dark:text-gray-400">
              Vui lòng điền vào biểu mẫu dưới đây để liên hệ với chúng tôi.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* Hình ảnh */}
            <div>
              <img
                src="/logo/contact.webp"
                alt="Contact"
                className="w-full h-[500px] object-cover aspect-square hover:scale-105 transition-all duration-300"
              />
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4 p-10 border rounded-lg border-gray-200">
              <div className="space-y-2">
                <Label htmlFor="name">Họ và Tên</Label>
                <Input
                  id="name"
                  placeholder="Nhập họ và tên của bạn"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  placeholder="Nhập email của bạn"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Số điện thoại</Label>
                <Input
                  id="phone"
                  placeholder="Nhập số điện thoại"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Tin nhắn</Label>
                <Textarea
                  id="message"
                  placeholder="Nhập tin nhắn của bạn"
                  className="min-h-[100px]"
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
              </div>
              <Button type="submit" disabled={loading}>
                {loading ? "Đang gửi..." : "Gửi tin nhắn"}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
