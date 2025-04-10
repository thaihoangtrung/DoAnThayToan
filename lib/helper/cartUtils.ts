import { addToCart } from "../fetchapi/api"
import { useCartStore } from "../store/useCartStore";

export const handleAddToCart = async (id: number, quantity: number = 1, price: number, size : string) => {
  const addItem = useCartStore.getState().addItem;
  try {
    addItem({ id, quantity, price, size });
    await addToCart(id, quantity, price, size)
  } catch (error) {
    console.error('Error adding to cart:', error)
  }
}
