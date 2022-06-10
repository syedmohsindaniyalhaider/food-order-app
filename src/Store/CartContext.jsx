import { createContext } from "react";

const initialContext = {
  items: [],
  totalAmount: 0,
  addItem: (item) => {},
  removeItem: (id) => {},
  clearCart: () => {},
};

const CartContext = createContext(initialContext);

export default CartContext;
