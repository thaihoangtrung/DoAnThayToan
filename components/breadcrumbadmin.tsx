import { ArrowLeft } from "lucide-react";
import Link from "next/link";
export default function BreadcrumbAdminCustom() {
  return (
    <>
      <div className="container mx-auto mt-12">
        <Link href="/admin"><span className="flex items-center gap-2"><ArrowLeft /> Home Admin</span></Link>
      </div>
    </>
  );
}
