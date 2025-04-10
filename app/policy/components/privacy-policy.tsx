const PrivacyPolicy = () => {
    return (
        <div className="mx-auto max-w-screen-2xl md:px-8 px-4 my-6">
            <h1 className="text-lg font-bold mb-4">2. Chính sách bảo mật</h1>
            <hr className="border-t-[1px] border-gray-300 mb-6" />
            <h2 className="text-lg font-semibold mt-6 mb-2">2.1. Thu thập thông tin</h2>
            <ul className="list-disc list-inside mb-4 md:ml-4 ml-2">
                <li>Chúng tôi thu thập các thông tin như họ tên, số điện thoại, địa chỉ email và địa chỉ giao hàng để phục vụ cho quá trình đặt hàng và hỗ trợ khách hàng.</li>
            </ul>
            <h2 className="text-lg font-semibold mt-6 mb-2">2.2. Sử dụng thông tin</h2>
            <ul className="list-disc list-inside mb-4  md:ml-4 ml-2">
                <li>Thông tin được sử dụng để xử lý đơn hàng, chăm sóc khách hàng, gửi thông báo về chương trình khuyến mãi hoặc các thông tin liên quan.</li>
            </ul>

            <h2 className="text-lg font-semibold mt-6 mb-2">2.3. Bảo mật thông tin</h2>
            <ul className="list-disc list-inside mb-4  md:ml-4 ml-2">
                <li>Cam kết không chia sẻ thông tin khách hàng cho bên thứ ba, ngoại trừ khi có yêu cầu từ cơ quan pháp luật.</li>
                <li>Sử dụng các biện pháp bảo mật để đảm bảo an toàn thông tin cá nhân.</li>
            </ul>
        </div>
    );
};

export default PrivacyPolicy;