import React, { useReducer } from "react";
import CartContext from "./CartContext";

const initialState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD": {
      const updatedTotalAmount =
        state.totalAmount + action.payload.price * action.payload.amount;
      const existingItemIndex = state.items.findIndex(
        (item) => item.id === action.payload.id
      );
      const existingCartItem = state.items[existingItemIndex];
      let updatedItems;
      if (existingCartItem) {
        const updatedItem = {
          ...existingCartItem,
          amount: existingCartItem.amount + action.payload.amount,
        };
        updatedItems = [...state.items];
        updatedItems[existingItemIndex] = updatedItem;
      } else {
        updatedItems = state.items.concat(action.payload);
      }
      return {
        items: updatedItems,
        totalAmount: updatedTotalAmount,
      };
    }
    case "REMOVE": {
      const existingItemIndex = state.items.findIndex(
        (item) => item.id === action.payload
      );
      const existingCartItem = state.items[existingItemIndex]; 
      const updatedTotalAmount = state.totalAmount - existingCartItem.price;
      let updatedItems;
      if (existingCartItem.amount === 1) {
        updatedItems = state.items.filter((item) => item.id !== action.payload);
      } else {
        const updatedItem = {
          ...existingCartItem,
          amount: existingCartItem.amount - 1,
        };
        updatedItems = [...state.items];
        updatedItems[existingItemIndex] = updatedItem;
      }
      return {
        items: updatedItems,
        totalAmount: updatedTotalAmount,
      };
    }
    default:
      return initialState;
  }
};

const CartProvider = (props) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  const addItemHandler = (item) => {
    dispatch({ type: "ADD", payload: item });
  };
  const removeItemHandler = (id) => {
    dispatch({ type: "REMOVE", payload: id });
  };

  const cartContext = {
    items: state.items,
    totalAmount: state.totalAmount,
    addItem: addItemHandler,
    removeItem: removeItemHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
