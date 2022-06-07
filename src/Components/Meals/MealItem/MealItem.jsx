import React from "react";
import styles from "./style.module.css";

export const ItemForm = (rpop) => {
  return (
    <form className={styles.form}>
      <input type="text" />
      <button>+ Add</button>
    </form>
  );
};

const MealItem = (props) => {
  const price = `$${props.price.toFixed(2)}`;
  return (
    <li className={styles.meal}>
      <div>
        <h3>{props.name}</h3>
        <div className={styles.description}>{props.description}</div>
        <div className={styles.price}>{price}</div>
      </div>
      <div>
        <ItemForm />
      </div>
    </li>
  );
};

export default MealItem;
