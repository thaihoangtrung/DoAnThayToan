const TermsOfUse = () => {
    return (
        <div className="mx-auto max-w-screen-2xl md:px-8 px-4 my-6">
            <h1 className="text-lg font-bold mb-4">1. Điều khoản sử dụng</h1>
            <hr className="border-t-[1px] border-gray-300 mb-6" />
            <h2 className="text-lg font-semibold mt-6 mb-2">1.1. Quy định chung</h2>
            <ul className="list-disc list-inside mb-4 md:ml-4 ml-2">
                <li>Website của chúng tôi cung cấp các sản phẩm và dịch vụ đến khách hàng dựa trên các điều khoản được liệt kê dưới đây.</li>
                <li>Khi truy cập và sử dụng website, bạn đồng ý tuân thủ các điều khoản này.</li>
            </ul>
            <h2 className="text-lg font-semibold mt-6 mb-2">1.2 Quyền và trách nhiệm của người dùng</h2>
            <ul className="list-disc list-inside mb-4  md:ml-4 ml-2">
                <li>Khách hàng phải cung cấp thông tin chính xác khi đăng ký tài khoản hoặc mua hàng.</li>
                <li>Người dùng không được phép sử dụng website cho các mục đích bất hợp pháp hoặc vi phạm đạo đức xã hội.</li>
            </ul>

            <h2 className="text-lg font-semibold mt-6 mb-2">1.3 Quyền và trách nhiệm của chúng tôi</h2>
            <ul className="list-disc list-inside mb-4  md:ml-4 ml-2">
                <li>Chúng tôi có quyền thay đổi nội dung website, chính sách mà không cần thông báo trước.</li>
                <li>Cam kết bảo mật thông tin khách hàng và cung cấp sản phẩm, dịch vụ đúng chất lượng đã cam kết.</li>
            </ul>
        </div>
    );
};

export default TermsOfUse;