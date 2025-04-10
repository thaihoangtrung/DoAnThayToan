const PolicyForSales = () => {
    return (
        <div className="mx-auto max-w-screen-2xl md:px-8 px-4 my-6">
            <h1 className="text-lg font-bold mb-4">4. Chính sách cho website bán hàng</h1>
            <hr className="border-t-[1px] border-gray-300 mb-6" />
            <h2 className="text-lg font-semibold mt-6 mb-2">4.1. Cam kết chất lượng sản phẩm</h2>
            <ul className="list-disc list-inside mb-4 md:ml-4 ml-2">
                <li>Tất cả sản phẩm trên website đều đảm bảo chất lượng như mô tả.</li>
                <li>Chúng tôi cam kết hoàn tiền nếu phát hiện sản phẩm không đúng như cam kết.</li>
            </ul>
            <h2 className="text-lg font-semibold mt-6 mb-2">4.2. Phương thức thanh toán</h2>
            <ul className="list-disc list-inside mb-4  md:ml-4 ml-2">
                <li>Thanh toán trực tiếp khi nhận hàng (COD).</li>
                <li>Thanh toán trực tuyến qua thẻ ngân hàng hoặc ví điện tử.</li>
            </ul>

            <h2 className="text-lg font-semibold mt-6 mb-2">4.3. Giao hàng và vận chuyển</h2>
            <ul className="list-disc list-inside mb-4  md:ml-4 ml-2">
                <li>Thời gian giao hàng từ 2-5 ngày làm việc tùy thuộc vào địa chỉ nhận hàng.</li>
                <li>Hỗ trợ giao hàng miễn phí cho các đơn hàng từ 500.000 VNĐ trở lên.</li>
            </ul>
            <h2 className="text-lg font-semibold mt-6 mb-2">4.4. Chăm sóc khách hàng</h2>
            <ul className="list-disc list-inside mb-4  md:ml-4 ml-2">
                <li>Bộ phận chăm sóc khách hàng hoạt động từ 8:00 - 20:00 hàng ngày để hỗ trợ giải đáp mọi thắc mắc.</li>
                <li>Liên hệ qua hotline: 090xxxxxxx hoặc email: support@website.com.</li>
            </ul>
        </div>
    );
};

export default PolicyForSales;