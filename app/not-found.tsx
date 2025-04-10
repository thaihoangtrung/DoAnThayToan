import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
      <h2 className="text-3xl font-bold">404 - Không tìm thấy</h2>
      <p className="text-muted-foreground text-center max-w-[500px]">
        Xin lỗi, trang bạn đang tìm kiếm không tồn tại hoặc đã bị di chuyển.
      </p>
      <Button asChild>
        <Link href="/">Quay về trang chủ</Link>
      </Button>
    </div>
  )
}