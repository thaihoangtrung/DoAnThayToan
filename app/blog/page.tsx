import { getAllBlogs } from '@/lib/fetchapi/api';
import PostList from './components/blog-list';
import BreadcrumbCustom from '@/components/breadcrumb';

export default async function BlogPage() {
    const blogs = await getAllBlogs();

    if (!blogs || blogs.length === 0) {
        return <p className="text-center">No blogs available.</p>;
    }

    return (
        <div className="container mx-auto py-10">
            <h1 className="text-4xl font-bold text-center mb-8">Danh sách bài viết</h1>
            <BreadcrumbCustom nameFourth="Danh sách bài viết" />
            <section className="py-24 container mx-auto">
                <div className="mx-4 md:mx-16">
                    <div className="grid gap-10 md:grid-cols-2 lg:gap-10">
                        {blogs.slice(0, 2).map((blog: any) => (
                            <PostList key={blog._id} post={blog} aspect="landscape" preloadImage={true} />
                        ))}
                    </div>
                    <div className="my-8 grid gap-10 md:grid-cols-4 lg:gap-10">
                        {blogs.slice(2).map((blog: any) => (
                            <PostList key={blog._id} post={blog} aspect="square" />
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
