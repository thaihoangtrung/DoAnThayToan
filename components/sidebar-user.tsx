import Link from "next/link";
import { Badge } from "./ui/badge";
const SidebarUserPage = () => {
  return (
    <>
      <div className="p-4 gap-4 bg-white flex md:flex-col items-start shadow-md md:w-64 flex-row overflow-x-auto hide-scrollbar">
        <Link href="/personal-info">
          <Badge className="mb-2">Thông tin cá nhân</Badge>
        </Link>
        <Link href="/forget-password">
          <Badge className="mb-2">Quên mật khẩu</Badge>
        </Link>
        <Link href="/change-password">
          <Badge className="mb-2">Thay đổi mật khẩu</Badge>
        </Link>
      </div>
    </>
  );
};

export default SidebarUserPage;
