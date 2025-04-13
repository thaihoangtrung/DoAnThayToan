import { Metadata } from "next";
import BlogHomePage from "@/components/blog-home";
import FlashSalePage from "@/components/home/flash-sale-home";
import { HeroParallaxDemo } from "@/components/heroparallaxdemo";
import { Testimonial } from "@/components/testimonial";
import PolicyCommitments from "@/components/home/policycommitments";
import CardHomePage from "@/components/card-home";
import SectionSlideHome from "@/components/slide-home";
export default function Home() {
  return (
    <>
      <SectionSlideHome />
      <HeroParallaxDemo />
      <FlashSalePage />
      <PolicyCommitments />
      <CardHomePage />
      <Testimonial />
      <BlogHomePage />
    </>
  );
}
