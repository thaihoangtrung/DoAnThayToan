"use client"
import { motion } from 'framer-motion';
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import Image from "next/image"

export default function CardHomePage() {
    return (
        <div className="container mx-auto bg-white px-4 md:px-16 py-10">
            <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.4 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                >
                    <Card className="bg-white rounded-3xl relative overflow-hidden w-full aspect-[4/3]">
                        <Image
                            src="/black-sale.jpg"
                            alt="GenePill"
                            fill
                            className="object-cover"
                        />
                    </Card>
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.5 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                >
                    <Card className="bg-white aspect-[5/4] rounded-3xl p-4 flex flex-col items-center justify-center relative overflow-hidden border-b-black border-b-4">
                        <Image src="/images/tee-1.avif" alt="GenePill" width={300} height={300} className="object-cover" priority />
                    </Card>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.6 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                >
                    <Card className="bg-white rounded-3xl p-8 relative overflow-hidden">
                        <div className="absolute z-20 top-4 right-4 w-12 h-12 rounded-full border-2 border-black flex items-center justify-center">
                            <div className="w-6 h-6 rounded-full bg-black"></div>
                        </div>
                        <div className="h-full flex justify-between text-black relative z-10">
                            <Badge className="bg-black text-white hover:bg-black w-fit">Branding</Badge>
                            <Image src="/images/tee-6.avif" alt="GenePill" width={300} height={300} className="object-cover" />
                        </div>
                    </Card>
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                >
                    <Card className="bg-white rounded-3xl p-8 relative overflow-hidden border-b-black border-b-4">
                        <div className="flex gap-4 relative z-10 justify-end">
                            <div className="bg-[#FF5733] rounded-full p-4 flex items-center justify-end">
                                <div className="w-6 h-6 rounded-full border-2 border-white"></div>
                            </div>
                        </div>
                        <Image src="/images/tee-5.avif" alt="GenePill" width={300} height={300} className="object-cover" />
                    </Card>

                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                >
                    <Card className="bg-white aspect-[5/4] rounded-3xl p-4 flex flex-col items-center justify-center relative overflow-hidden">
                        <Image src="/images/tee-2.avif" alt="GenePill" width={300} height={300} className="object-cover" />
                    </Card>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.3 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                >
                    <Card className="bg-white rounded-3xl relative overflow-hidden w-full aspect-[4/3]">
                        <Image
                            src="/banner/banner-2.avif"
                            alt="GenePill"
                            fill
                            className="object-cover"
                        />
                    </Card>
                </motion.div>


            </div>

            <Carousel className="md:hidden bg-white">
                <CarouselContent>
                    <CarouselItem>
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: 0.6 }}
                            viewport={{ once: true }}
                            whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                        >
                            <Card className="bg-white rounded-3xl p-4 flex flex-col items-center justify-center relative overflow-hidden border-b-black border-b-4">
                                <Image src="/images/tee-1.avif" alt="GenePill" width={300} height={300} className="object-cover" priority />
                            </Card>
                        </motion.div>
                    </CarouselItem>

                    <CarouselItem>
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: 0.6 }}
                            viewport={{ once: true }}
                            whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                        >
                            <Card className="bg-white rounded-3xl p-4 flex flex-col items-center justify-center relative overflow-hidden">
                                <Image src="/images/tee-2.avif" alt="GenePill" width={300} height={300} className="object-cover" />
                            </Card>
                        </motion.div>
                    </CarouselItem>

                    <CarouselItem>
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: 0.6 }}
                            viewport={{ once: true }}
                            whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                        >
                            <Card className="bg-white rounded-3xl p-4 flex flex-col items-center justify-center relative overflow-hidden border-b-black border-b-4">
                                <Image src="/images/tee-3.avif" alt="GenePill" width={300} height={300} className="object-cover" />
                            </Card>
                        </motion.div>
                    </CarouselItem>

                    <CarouselItem>
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: 0.6 }}
                            viewport={{ once: true }}
                            whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                        >
                            <Card className="bg-white rounded-3xl relative overflow-hidden w-full aspect-[4/3]">
                                <Image
                                    src="/black-sale.jpg"
                                    alt="GenePill"
                                    fill
                                    className="object-cover"
                                />
                            </Card>
                        </motion.div>
                    </CarouselItem>

                    <CarouselItem>
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: 0.6 }}
                            viewport={{ once: true }}
                            whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                        >
                            <Card className="bg-white rounded-3xl p-4 relative overflow-hidden border-b-black border-b-4">
                                <div className="absolute top-4 right-4 z-10">
                                    <div className="bg-[#FF5733] rounded-full p-4 flex items-center justify-end">
                                        <div className="w-6 h-6 rounded-full border-2 border-white"></div>
                                    </div>
                                </div>
                                <Image src="/images/tee-5.avif" alt="GenePill" width={300} height={300} className="object-cover" />
                            </Card>
                        </motion.div>
                    </CarouselItem>

                    <CarouselItem>
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: 0.6 }}
                            viewport={{ once: true }}
                            whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                        >
                            <Card className="bg-white rounded-3xl p-4 relative overflow-hidden">
                                <div className="absolute z-20 top-4 right-4 w-12 h-12 rounded-full border-2 border-black flex items-center justify-center">
                                    <div className="w-6 h-6 rounded-full bg-black"></div>
                                </div>
                                <div className="h-full flex justify-between text-black relative z-10">
                                    <Badge className="bg-black text-white hover:bg-black w-fit">Branding</Badge>
                                    <Image src="/images/tee-6.avif" alt="GenePill" width={300} height={300} className="object-cover" />
                                </div>
                            </Card>
                        </motion.div>
                    </CarouselItem>
                </CarouselContent>
            </Carousel>
        </div>
    )
}
