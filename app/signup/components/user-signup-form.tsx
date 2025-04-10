"use client"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"

interface SignUpFormProps extends React.ComponentPropsWithoutRef<"div"> {
  username: string
  setUsername: (username: string) => void
  email: string
  setEmail: (email: string) => void
  password: string
  setPassword: (password: string) => void
  confirmPassword: string
  setConfirmPassword: (confirmPassword: string) => void
  onSubmit: (e: React.FormEvent) => void
  error: string
}

export function SignUpForm({
  className,
  username,
  setUsername,
  email,
  setEmail,
  password,
  setPassword,
  confirmPassword,
  setConfirmPassword,
  onSubmit,
  error,
  ...props
}: SignUpFormProps) {
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Đăng ký</CardTitle>
          <CardDescription>Nhập thông tin của bạn để tạo tài khoản</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="ten@email.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="username">Tên người dùng</Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="Tên của bạn"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Mật khẩu</Label>
                <Input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="confirm-password">Xác nhận mật khẩu</Label>
                <Input
                  id="confirm-password"
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
              {error && <div className="text-red-500 text-sm">{error}</div>}
              <Button type="submit" className="w-full">
                Tạo tài khoản
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              Đã có tài khoản?{" "}
              <Link href="/signin" className="underline underline-offset-4">
                Đăng nhập
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
