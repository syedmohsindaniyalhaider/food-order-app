import { createContext } from "react";

const initialContext = {
  items: [],
  totalAmount: 0,
  addItem: (item) => {},
  removeItem: (id) => {},
};

const CartContext = createContext(initialContext);

export default CartContext;
