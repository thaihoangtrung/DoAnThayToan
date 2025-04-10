import Image from "next/image"
export default function SectionSlideHome() {
  return (
    <div className="md:h-[400px] h-[100px]">
      <Image src="/banner/banner-1.avif" alt="Banner" width={1920} height={500} priority className="object-cover" />
    </div>
  )
}

