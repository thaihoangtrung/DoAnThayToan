"use client"
import { motion } from 'framer-motion';
import { Truck, RefreshCcw, ShieldCheck, Headphones } from 'lucide-react';

const policies = [
    { icon: <Headphones size={32} />, title: 'Hỗ trợ 24/7', description: 'Luôn sẵn sàng tư vấn và giải đáp mọi thắc mắc của bạn.' },
    { icon: <RefreshCcw size={32} />, title: 'Chính sách đổi trả', description: 'Đổi trả dễ dàng trong vòng 7 ngày nếu có lỗi từ nhà sản xuất.' },
    { icon: <ShieldCheck size={32} />, title: 'Cam kết chính hãng', description: '100% sản phẩm chính hãng, nhập khẩu trực tiếp từ nhà sản xuất.' },
    { icon: <Truck size={32} />, title: 'Giao hàng nhanh', description: 'Giao hàng tận nơi trên toàn quốc, nhanh chóng và an toàn.' }
];

export default function PolicyCommitments() {
    return (
        <>
            <div className='container mx-auto py-10'>
                <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 text-center px-4">
                    {policies.map((policy, index) => (
                        <motion.div initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: index * 0.1 }}
                            whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                            viewport={{ once: true }} key={index} className="flex flex-col items-center p-4 bg-white rounded-xl shadow-md">
                            <div className="text-black mb-3">{policy.icon}</div>
                            <h3 className="text-lg font-semibold mb-2">{policy.title}</h3>
                            <p className="text-sm text-gray-600">{policy.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </>
    );
}