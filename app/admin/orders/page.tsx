import BreadcrumbAdminCustom from "@/components/breadcrumbadmin";
import OrdersManagement from "./components/list";

export default function OrderPage() {
    return (
        <>
        <BreadcrumbAdminCustom />
            <OrdersManagement />
        </>
    )
}