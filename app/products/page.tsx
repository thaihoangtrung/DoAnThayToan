import { Metadata } from "next";
import { BlogList } from "./components/product-list"
import { getProducts } from "@/lib/fetchapi/api"
import BreadcrumbCustom from "@/components/breadcrumb";

const ProductPage = async () => {
  const listProducts = await getProducts()
  return (
    <>
      <div className="container mx-auto py-10">
        <BreadcrumbCustom nameFourth='Danh sách sản phẩm' />
        <h1 className="text-4xl font-bold text-center mb-8">Sản Phẩm</h1>
        <BlogList listProducts={listProducts} />
      </div>
    </>
  )
}

export default ProductPage;