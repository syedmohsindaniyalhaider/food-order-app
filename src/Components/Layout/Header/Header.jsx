import React, { useContext } from "react";

import mealsImage from "../../../assets/meals.jpg";
import CartContext from "../../../Store/CartContext";
import CartIcon from "../../Cart/CartIcon";
import styles from "./style.module.css";

const HeaderCartButton = (props) => {
  const cartCtx = useContext(CartContext);

  const numOfCartItems = cartCtx.items.reduce((curNum, item) => {
    return curNum + item.amount;
  }, 0);
  return (
    <button className={styles.button} onClick={props.cartIsShown}>
      <span className={styles.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={styles.badge}>{numOfCartItems}</span>
    </button>
  );
};

const Header = (props) => {
  return (
    <>
      <header className={styles.header}>
        <h1>React Meals</h1>
        <HeaderCartButton cartIsShown={props.setCartIsShown} />
      </header>
      <div className={styles["main-image"]}>
        <img src={mealsImage} alt="meal-image" />
      </div>
    </>
  );
};

export default Header;
