import React, { useState, useContext } from "react";
import CartContext from "../../Store/CartContext";
import Modal from "../UI/Modal/Modal";
import Checkout from "./Checkout";
import styles from "./style.module.css";

const CartItem = (props) => {
  const price = `$${props.price.toFixed(2)}`;

  return (
    <li className={styles["cart-item"]}>
      <div>
        <h2>{props.name}</h2>
        <div className={styles.summary}>
          <span className={styles.price}>{price}</span>
          <span className={styles.amount}>x {props.amount}</span>
        </div>
      </div>
      <div className={styles.actions}>
        <button onClick={props.onRemove}>−</button>
        <button onClick={props.onAdd}>+</button>
      </div>
    </li>
  );
};

const Cart = (props) => {
  const [isCheckout, setIsCheckout] = useState(false);
  const cartCtx = useContext(CartContext);

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };
  const cartItemAddHandler = (item) => {
    cartCtx.addItem(item);
  };

  const cartItems = (
    <ul className={styles["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  const orderHandler = () => {
    setIsCheckout(true);
  };

  const submitOrderHandler = async (userData) => {
    await fetch("https://meals-6f865-default-rtdb.firebaseio.com/orders.json", {
      method: "POST",
      body: JSON.stringify({
        user: userData,
        orderedItems: cartCtx.items,
      }),
    });
    cartCtx.clearCart();
  };

  return (
    <Modal>
      {cartItems}
      <div className={styles.total}>
        <span>Total Amount: </span>
        <span>{totalAmount}</span>
      </div>
      {isCheckout && (
        <Checkout
          onCancel={props.setCartIsHidden}
          onConfirm={submitOrderHandler}
          onClick={props.setCartIsHidden}
        />
      )}
      {!isCheckout && (
        <div className={styles.actions}>
          <button
            className={styles["button--alt"]}
            onClick={props.setCartIsHidden}
          >
            Close
          </button>
          {hasItems && (
            <button className={styles.button} onClick={orderHandler}>
              Order
            </button>
          )}
        </div>
      )}
    </Modal>
  );
};

export default Cart;
