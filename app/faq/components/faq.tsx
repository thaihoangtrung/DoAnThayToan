"use client";
import { useState } from "react";

export default function FAQPage() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  return (
    <section>
      <div className="mx-auto flex w-full container flex-col items-center px-4 py-16 md:px-10 md:py-20">
        <div className="mx-auto flex max-w-xl flex-col items-center justify-center px-6 text-center lg:max-w-3xl lg:px-10">
          <h1 className="text-3xl lg:text-5xl font-bold">
            Câu hỏi thường gặp
          </h1>
        </div>

        <div className="flex w-full flex-col" suppressHydrationWarning>
          {faqData.map((faq, index) => (
            <div key={faq.id} className="relative my-1 w-full rounded-md pr-8 py-4">
              <div className="max-w-2xl">
                <h2
                  className="text-base font-bold cursor-pointer"
                  onClick={() => toggleFAQ(index)}
                >
                  {faq.question}
                </h2>
                {openFAQ === index && (
                  <p className="mt-4 text-base font-light text-gray-500">
                    {faq.answer}
                  </p>
                )}
              </div>
              <button
                className="absolute right-5 top-9 focus:outline-none"
                onClick={() => toggleFAQ(index)}
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="12" cy="12" r="12" fill="white"></circle>
                  <path
                    d="M7.04688 11.9999H16.9469"
                    stroke="black"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                  {openFAQ !== index && (
                    <path
                      d="M12 7.05005V16.95"
                      stroke="black"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                  )}
                </svg>
              </button>
            </div>
          ))}
        </div>

        <p className="mx-auto mt-12 text-center text-base text-gray-500">
          Không tìm thấy câu trả lời bạn đang tìm kiếm? Liên hệ với
          <a href="#" className="text-black font-bold">
            {" "}
            đội ngũ hỗ trợ khách hàng của chúng tôi.
          </a>
        </p>
      </div>
    </section>
  );
}

const faqData = [
  {
    id: 1,
    question: "Các kích thước giày và áo quần của bạn có chính xác không?",
    answer: "Chúng tôi cung cấp bảng kích thước chi tiết cho từng sản phẩm. Vui lòng tham khảo bảng kích thước trên trang sản phẩm để chọn kích thước phù hợp nhất với bạn.",
  },
  {
    id: 2,
    question: "Tôi có thể trả hàng nếu sản phẩm không vừa?",
    answer: "Có, bạn có thể trả hàng trong vòng 30 ngày kể từ ngày nhận hàng. Sản phẩm phải còn nguyên vẹn và chưa qua sử dụng.",
  },
  {
    id: 3,
    question: "Thời gian giao hàng mất bao lâu?",
    answer: "Thời gian giao hàng thường mất từ 3 đến 7 ngày làm việc, tùy thuộc vào địa điểm giao hàng của bạn.",
  },
  {
    id: 4,
    question: "Bạn có chính sách giảm giá cho đơn hàng số lượng lớn không?",
    answer: "Có, chúng tôi có chính sách giảm giá cho đơn hàng số lượng lớn. Vui lòng liên hệ với chúng tôi để biết thêm chi tiết.",
  },
  {
    id: 5,
    question: "Tôi có thể thay đổi hoặc hủy đơn hàng sau khi đã đặt không?",
    answer: "Nếu bạn muốn thay đổi hoặc hủy đơn hàng, vui lòng liên hệ với chúng tôi ngay lập tức. Chúng tôi sẽ cố gắng hỗ trợ bạn trước khi đơn hàng được xử lý.",
  },
  {
    id: 6,
    question: "Bạn có hỗ trợ khách hàng qua điện thoại không?",
    answer: "Có, bạn có thể gọi cho chúng tôi theo số điện thoại hỗ trợ khách hàng là (84) 37-422-5294 trong giờ làm việc.",
  },
  {
    id: 7,
    question: "Bạn có chấp nhận các phương thức thanh toán nào?",
    answer: "Chúng tôi chấp nhận tất cả các loại thẻ tín dụng chính và PayPal. Bạn cũng có thể thanh toán qua chuyển khoản ngân hàng.",
  },
  {
    id: 8,
    question: "Sản phẩm của bạn có bảo hành không?",
    answer: "Có, chúng tôi cung cấp bảo hành cho một số sản phẩm nhất định. Vui lòng xem thông tin bảo hành trên trang sản phẩm hoặc liên hệ với chúng tôi để biết thêm chi tiết.",
  },
  {
    id: 9,
    question: "Tôi có thể theo dõi đơn hàng của mình như thế nào?",
    answer: "Sau khi đơn hàng được gửi đi, bạn sẽ nhận được email xác nhận kèm theo mã theo dõi để bạn có thể theo dõi trạng thái giao hàng của mình.",
  },
  {
    id: 10,
    question: "Bạn có cung cấp dịch vụ giao hàng quốc tế không?",
    answer: "Có, chúng tôi cung cấp dịch vụ giao hàng quốc tế đến nhiều quốc gia khác nhau. Vui lòng kiểm tra trang vận chuyển của chúng tôi để biết thêm thông tin về phí và thời gian giao hàng quốc tế.",
  },
];
