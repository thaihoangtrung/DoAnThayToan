// app/admin/page.tsx
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";

const adminRoutes = [
  { title: "Blogs", href: "/admin/blogs" },
  { title: "Blogs Categories", href: "/admin/blogs-categories" },
  { title: "Categories", href: "/admin/categories" },
  { title: "Contacts", href: "/admin/contacts" },
  { title: "Coupon", href: "/admin/coupon" },
  { title: "Orders", href: "/admin/orders" },
  { title: "Products", href: "/admin/products" },
  { title: "Users", href: "/admin/users" },
];

export default function AdminDashboard() {
  return (
    <div className="p-6 container mx-auto">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {adminRoutes.map((route) => (
          <Link key={route.href} href={route.href}>
            <Card className="cursor-pointer hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center font-semibold text-lg">
                {route.title}
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
