export function formatVND(amount: string | number): string {
  // Chuyển string về number, nếu không hợp lệ thì trả về "0 ₫"
  const numberAmount = Number(amount);
  if (isNaN(numberAmount)) return '0 ₫';

  return numberAmount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
}
