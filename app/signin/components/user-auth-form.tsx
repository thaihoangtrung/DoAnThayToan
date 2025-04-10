"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"

interface LoginFormProps extends React.ComponentPropsWithoutRef<"div"> {
  username: string
  setUsername: (username: string) => void
  password: string
  setPassword: (password: string) => void
  onSubmit: (e: React.FormEvent) => void
  error: string
}

export function LoginForm({
  className,
  username,
  setUsername,
  password,
  setPassword,
  onSubmit,
  error,
  ...props
}: LoginFormProps) {
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Đăng nhập</CardTitle>
          <CardDescription>Nhập tên đăng nhập và mật khẩu để truy cập tài khoản</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="username">Tên đăng nhập</Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="tên đăng nhập"
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
              {error && <div className="text-red-500 text-sm">{error}</div>}
              <Button type="submit" className="w-full">
                Đăng nhập
              </Button>
            </div>
           <div className="flex items-center justify-between">
           <div className="mt-4 text-center text-sm">
              Chưa có tài khoản?{" "}
              <Link href="/signup" className="underline underline-offset-4">
                Đăng ký
              </Link>
            </div>
            <div className="mt-4 text-center text-sm">
              <Link href="/forget-password">
                Quên mật khẩu
              </Link>
            </div>
           </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
