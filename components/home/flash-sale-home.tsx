"use client"
import Link from 'next/link'
import { motion } from 'framer-motion';
const products = [
  { id: 1, imageUrl: '/images/jordan-20.avif', link: '#', isSale: false },
  { id: 2, imageUrl: '/images/jordan-21.avif', link: '#', isSale: true },
  { id: 3, imageUrl: '/images/jordan-13.avif', link: '#', isSale: true },
  { id: 4, imageUrl: '/images/jordan-16.avif', link: '#', isSale: false },
  { id: 5, imageUrl: '/images/jordan-17.avif', link: '#', isSale: true },
  { id: 6, imageUrl: '/images/jordan-10.avif', link: '#', isSale: true },
]

export default function FlashSalePage() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-4">Sản Phẩm Đang Giảm Giá</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 auto-rows-fr">
          {products.map((product) => (
            <motion.div
              key={`pc-sale-${product.id}`}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: product.id * 0.1 }}
              viewport={{ once: true }}
              className="group relative before:absolute before:inset-0 before:opacity-5 rounded-2xl border"
            >
              <Link href={product.link}>
                <div className='relative md:h-[200px] h-[150px] overflow-hidden group mx-auto rounded-md flex flex-col'>
                  {product.isSale && (
                    <div className='absolute z-10 right-0'>
                      <p className='bg-red-600 group-hover:bg-red-500 transition-all duration-500 ease-in-out w-fit px-3 rounded-bl-lg text-xs font-medium py-1 text-white mb-1'>
                        SALE
                      </p>
                    </div>
                  )}
                  <div className='w-full h-full absolute z-0'>
                    <motion.img
                      src={product.imageUrl}
                      alt={product.imageUrl}
                      className="absolute rounded-2xl object-cover group-hover:scale-110 transition-transform duration-300 ease-in-out p-4"
                    />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}