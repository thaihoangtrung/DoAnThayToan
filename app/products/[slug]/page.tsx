import { notFound } from "next/navigation"
import { getProductDetails, getProducts } from "@/lib/fetchapi/api"
import ProductDetail from "../components/product-detail"

export async function generateStaticParams() {
  try {
    const products = await getProducts()
    return products.map((product: any) => ({
      slug: product.slug,
    }))
  } catch (error) {
    console.error("Error generating static params:", error)
    return []
  }
}


export default async function ProductDetailsPage({ params }: { params: { slug: string } }) {
  try {

    const product = await getProductDetails(params?.slug)
    if (!product) {
      notFound()
    }
    return (
      <>
        <ProductDetail detail={product} />
      </>
    )
  } catch (error) {
    console.error("Error loading product details:", error)
    notFound()
  }
}

