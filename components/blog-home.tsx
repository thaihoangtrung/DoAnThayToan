"use client"
import Image from 'next/image'
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import CircularText from './ui/circulartext';
import Link from 'next/link';

export default function BlogHomePage() {
  return (
    <>
      <div className="bg-white">
        <div className="mx-auto px-4 py-8 container relative">
          <h1 className="text-4xl font-bold text-center mb-8 text-black">Tin tức</h1>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {items.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`relative overflow-hidden rounded-2xl shadow-lg group ${item.isLarge ? 'md:col-span-2 md:row-span-2' : ''}`}
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  width={600}
                  height={600}
                  className="w-full h-full object-cover"
                />

                <div className="absolute inset-0 bg-black bg-opacity-60 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <p className={`text-white ${item.isLarge ? 'text-2xl' : 'text-xl'} font-bold`}>
                      {item.title}
                    </p>
                    {item.description && <p className="text-white">{item.description}</p>}
                  </div>
                </div>
                <div className="absolute bottom-2 right-2 bg-white p-2 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <ArrowRight className="w-5 h-5 text-black transition-transform duration-300 rotate-45 group-hover:rotate-0" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}


const items = [
  {
    id: 1,
    title: "Hướng Dẫn Chọn Giày Sneaker Chính Hãng",
    description: "Những bí quyết giúp bạn nhận biết giày thật - giả một cách dễ dàng.",
    image: "/blogs/blog-1.avif",
    isLarge: true,
  },
  {
    id: 2,
    title: "Lịch Sử Và Sự Phát Triển Của Air Jordan 5",
    description: "Tìm hiểu câu chuyện đằng sau một trong những dòng giày huyền thoại của Nike.",
    image: "/images/jordan-5.avif",
    isLarge: false,
  },
  {
    id: 3,
    title: "Công Nghệ Đột Phá Trong Giày Sneaker",
    description: "Những công nghệ mới nhất giúp giày sneaker thoải mái và bền bỉ hơn.",
    image: "/blogs/blog-3.jpg",
    isLarge: false,
  },
  {
    id: 4,
    title: "Trải Nghiệm Đôi Giày Jordan 4 Huyền Thoại",
    description: "Giày Jordan 4 có gì đặc biệt mà khiến dân chơi giày mê mẩn?",
    image: "/images/jordan-4.avif",
    isLarge: false,
  },
  {
    id: 5,
    title: "Cách Bảo Quản Và Vệ Sinh Giày Sneaker",
    description: "Hướng dẫn chi tiết giúp đôi giày của bạn luôn như mới.",
    image: "/blogs/blog-2.jpg",
    isLarge: false,
  },
];
