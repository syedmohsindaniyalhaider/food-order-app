import React from "react";

import mealsImage from "../../../assets/meals.jpg";
import CartIcon from "../../Cart/CartIcon";
import styles from "./style.module.css";

const HeaderCartButton = (props) => {
  return (
    <button className={styles.button}>
      <span className={styles.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={styles.badge}>3</span>
    </button>
  );
};

const Header = (props) => {
  return (
    <>
      <header className={styles.header}>
        <h1>React Meals</h1>
        <HeaderCartButton />
      </header>
      <div className={styles["main-image"]}>
        <img src={mealsImage} alt="meal-image" />
      </div>
    </>
  );
};

export default Header;
