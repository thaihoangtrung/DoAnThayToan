const ReturnPolicy = () => {
    return (
        <div className="mx-auto max-w-screen-2xl md:px-8 px-4 my-6">
            <h1 className="text-lg font-bold mb-4">3. Chính sách đổi trả</h1>
            <hr className="border-t-[1px] border-gray-300 mb-6" />
            <h2 className="text-lg font-semibold mt-6 mb-2">3.1. Điều kiện đổi trả</h2>
            <ul className="list-disc list-inside mb-4 md:ml-4 ml-2">
                <li>Sản phẩm còn nguyên vẹn, không có dấu hiệu đã qua sử dụng.</li>
                <li>Yêu cầu đổi trả trong vòng 7 ngày kể từ ngày nhận hàng.</li>
            </ul>
            <h2 className="text-lg font-semibold mt-6 mb-2">3.2. Quy trình đổi trả</h2>
            <ul className="mb-4  md:ml-4 ml-2">
                <li>1. Liên hệ bộ phận chăm sóc khách hàng qua số hotline hoặc email.</li>
                <li>2. Cung cấp thông tin đơn hàng và lý do đổi trả.</li>
                <li>3. Gửi sản phẩm về địa chỉ quy định để kiểm tra.</li>
                <li>4. Hoàn tiền hoặc đổi sản phẩm mới sau khi kiểm tra.</li>
            </ul>
        </div>
    );
};

export default ReturnPolicy;