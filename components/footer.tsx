import Link from "next/link"
import { Facebook, Instagram, Twitter } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-black text-white py-32 mt-32">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          <div className="col-span-2 md:col-span-2">
          <h1 className="text-3xl text-white py-4">Đồ Án Thầy Toàn</h1>
            <div className="flex space-x-4">
              <Link href="#" aria-label="Facebook">
                <Facebook size={24} />
              </Link>
              <Link href="#" aria-label="Instagram">
                <Instagram size={24} />
              </Link>
              <Link href="#" aria-label="Twitter">
                <Twitter size={24} />
              </Link>
            </div>
          </div>
          <div>
            <p className="text-xl font-bold mb-4">Liên Kết Nhanh</p>
            <ul className="space-y-2">
              <li>
                <Link href="/">Trang chủ</Link>
              </li>
              <li>
                <Link href="/products">Sản phẩm</Link>
              </li>
              <li>
                <Link href="/contact">Liên hệ</Link>
              </li>
            </ul>
          </div>
          <div>
            <p className="text-xl font-bold mb-4">Chính Sách</p>
            <ul className="space-y-2">
              <li>
                <Link href="/policy">Điều khoản sử dụng</Link>
              </li>
              <li>
                <Link href="/policy">Chính sách bảo mật</Link>
              </li>
            </ul>
          </div>
          <div>
            <p className="text-xl font-bold mb-4">Chính Sách</p>
            <ul className="space-y-2">
              <li>
                <Link href="/policy">Chính sách đổi trả</Link>
              </li>
              <li>
                <Link href="/faq">Câu hỏi thường gặp</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
}

