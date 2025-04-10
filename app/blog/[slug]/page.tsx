import BreadcrumbCustom from "@/components/breadcrumb"
import { getAllBlogs, getBlogDetails } from "@/lib/fetchapi/api"
import parse from "html-react-parser"

interface BlogDetail {
  _id: string;
  title: string;
  content: string;
  slug: string;
  createdAt: string;
  author?: {
    id: number;
    name: string;
    email: string;
  };
}

export async function generateStaticParams() {
  const blogs = await getAllBlogs();
  return blogs.map((blog: any) => ({
    slug: blog.slug,
  }));
}

interface PageProps {
  params: { slug: string };
}

export default async function BlogDetailsPage({ params }: PageProps) {
  const { slug } = params;
  const blog: BlogDetail = await getBlogDetails(slug);

  return (
    <section className="py-12 mx-auto container">
      <BreadcrumbCustom nameSecond="Danh sách bài viết" linkSecond="/blog" nameFourth="Chi tiết bài viết" />
      <div className="px-4 md:px-16">
        <h2 className="font-manrope text-4xl font-bold text-center mt-8">{blog.title}</h2>
        <div className="my-2 border-b-2 border-black"></div>
        <div className="mx-auto blog">{parse(blog.content)}</div>
      </div>
    </section>
  );
}
