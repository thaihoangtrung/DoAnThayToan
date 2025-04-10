"use client"
import { motion } from 'framer-motion';
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
export function Testimonial() {
    const testimonials = [
        {
            name: "Nguyễn Minh",
            image: "/testimonials/kh-01.avif",
            feedback:
                "Mình rất thích đôi sneaker này, mang cực kỳ êm và phong cách! Giao hàng cũng rất nhanh chóng.",
        },
        {
            name: "Trần Hạnh",
            image: "/testimonials/kh-02.avif",
            feedback:
                "Chất lượng áo tuyệt vời, đường may chắc chắn, vải mềm mịn! Mình sẽ tiếp tục ủng hộ shop.",
        },
        {
            name: "Lê Hoàng",
            image: "/testimonials/kh-04.avif",
            feedback:
                "Dịch vụ tư vấn rất chuyên nghiệp, giao hàng nhanh, sản phẩm đúng như mô tả! Rất đáng tiền.",
        },
        {
            name: "Phạm Anh",
            image: "/testimonials/kh-05.avif",
            feedback:
                "Đã mua rất nhiều lần, chất lượng luôn ổn định, rất hài lòng với dịch vụ và sản phẩm!",
        },
        {
            name: "Tuấn Nguyễn",
            image: "/testimonials/kh-06.avif",
            feedback:
                "Mình thích các mẫu áo của shop, rất trendy và chất lượng! Chắc chắn sẽ mua thêm.",
        },
        {
            name: "Bùi Thanh",
            image: "/testimonials/kh-03.avif",
            feedback:
                "Giày rất đẹp, đi cực kỳ thoải mái. Giá hợp lý và nhiều ưu đãi!",
        },
        {
            name: "Linh Trần",
            image: "/testimonials/kh-07.avif",
            feedback:
                "Chưa bao giờ thất vọng khi mua hàng ở đây, dịch vụ tuyệt vời!",
        },
        {
            name: "Hải Nam",
            image: "/testimonials/kh-08.avif",
            feedback:
                "Sản phẩm đúng mô tả, giao hàng nhanh, rất hài lòng!",
        },
        {
            name: "Minh Châu",
            image: "/testimonials/kh-09.avif",
            feedback:
                "Rất thích phong cách phục vụ của shop, chuyên nghiệp và tận tình!",
        },
    ];

    return (
        <section className="relative px-4">
            <div className="mx-auto container py-16 md:px-10">
                <h2 className="mx-auto mb-6 w-full max-w-3xl text-center text-3xl font-semibold md:mb-12 md:text-5xl">
                    Khách hàng nói gì về chúng tôi?
                </h2>
                <div className="hidden md:block">
                    <div className="grid grid-cols-5 gap-5 mb-5 md:px-16">
                        {testimonials.slice(0, 5).map((testimonial, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                                className="gap-6 overflow-hidden rounded-2xl border border-solid border-gray-300 bg-white p-4"
                            >
                                <div className="mb-4 flex items-center flex-row">
                                    <img
                                        src={testimonial.image}
                                        alt={testimonial.name}
                                        className="mr-4 h-14 w-14 object-cover rounded-full"
                                    />
                                    <p className="text-base font-semibold">{testimonial.name}</p>
                                </div>
                                <p className="text-sm">{testimonial.feedback}</p>
                            </motion.div>
                        ))}
                    </div>
                    <div className="grid grid-cols-4 gap-5">
                        {testimonials.slice(5, 9).map((testimonial, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                                className="gap-6 overflow-hidden rounded-2xl border border-solid border-gray-300 bg-white p-4"
                            >
                                <div className="mb-4 flex items-center flex-row">
                                    <img
                                        src={testimonial.image}
                                        alt={testimonial.name}
                                        className="mr-4 h-14 w-14 object-cover rounded-full"
                                    />
                                    <p className="text-base font-semibold">{testimonial.name}</p>
                                </div>
                                <p className="text-sm">{testimonial.feedback}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
                <div className="md:hidden">
                    <Carousel>
                        <CarouselContent>
                            {testimonials.map((testimonial, index) => (
                                <CarouselItem key={index} className="flex justify-center basis-4/5">
                                    <motion.div initial={{ opacity: 0, y: 50 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.4, delay: index * 0.1 }}
                                        viewport={{ once: true }} className="gap-6 overflow-hidden rounded-2xl border border-solid border-gray-300 bg-white p-4">
                                        <div className="mb-4 flex items-center flex-row">
                                            <img
                                                src={testimonial.image}
                                                alt={testimonial.name}
                                                className="mr-4 h-14 w-14 object-cover rounded-full"
                                            />
                                            <p className="text-base font-semibold">{testimonial.name}</p>
                                        </div>
                                        <p className="text-sm">{testimonial.feedback}</p>
                                    </motion.div>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                    </Carousel>
                </div>
            </div>
        </section>
    );
}
