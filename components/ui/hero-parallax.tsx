"use client";
import React from "react";
import {
  motion,
  MotionValue,
} from "framer-motion";
import Carousel from "./carouselreactbits";
export const HeroParallax = () => {
  return (
    <div className="overflow-hidden relative flex flex-col py-28"> 
      <div className="container gap-4 flex md:flex-row flex-col items-center justify-between relative mx-auto py-20 px-4 w-full left-0 top-0">
      <div>
        <h1 className="text-2xl md:text-4xl font-bold ">
          Chào mừng bạn đến với <br /> "Thế giới giày sneaker - Phong cách & Chất lượng"!
        </h1>
        <p className="text-base md:text-xl mt-4">
          Chúng tôi tự hào là địa chỉ tin cậy chuyên cung cấp giày sneaker chính hãng từ các thương hiệu hàng đầu thế giới như Nike, Adidas, Jordan, Converse,... Với cam kết về chất lượng sản phẩm, giá cả cạnh tranh và dịch vụ chuyên nghiệp, chúng tôi tin rằng sẽ mang đến cho bạn những trải nghiệm mua sắm tuyệt vời nhất.
        </p>
      </div>
      <div className="relative">
        <Carousel
          baseWidth={400}
          autoplay={true}
          autoplayDelay={3000}
          pauseOnHover={true}
          loop={true}
          round={false}
        />
      </div>
    </div>
    </div>
  );
};


export const ProductCard = ({
  product,
  translate,
}: {
  product: {
    img: string;
  };
  translate: MotionValue<number>;
}) => {
  return (
    <motion.div
      style={{
        x: translate,
      }}
      whileHover={{
        y: -20,
      }}
      key={product.img}
      className="group/product h-64 w-[20rem] relative flex-shrink-0"
    >
      <div
        className="block"
      >
        <motion.img
          src={product.img}
          alt={product.img}
          className="absolute rounded-2xl object-cover group-hover:scale-110 transition-transform duration-300 ease-in-out p-4"
        />
      </div>
    </motion.div>
  );
};
