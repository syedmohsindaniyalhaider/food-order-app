import React, { useState, useRef } from "react";
import styles from "./Checkout.module.css";

const isEmpty = (value) => value.trim() === "";
const isFiveChars = (value) => value.trim().length === 5;

const Checkout = (props) => {
  const [formInputValid, setFormInputValid] = useState({
    name: true,
    street: true,
    city: true,
    postalCode: true,
  });

  const nameRef = useRef();
  const streetRef = useRef();
  const postalRef = useRef();
  const cityRef = useRef();

  const confirmHandler = (event) => {
    event.preventDefault();
    const nameInput = nameRef.current.value;
    const streetInput = streetRef.current.value;
    const postalInput = postalRef.current.value;
    const cityInput = cityRef.current.value;
    const nameIsValid = !isEmpty(nameInput);
    const streetIsValid = !isEmpty(streetInput);
    const postalIsValid = isFiveChars(postalInput);
    const cityIsValid = !isEmpty(cityInput);

    setFormInputValid({
      name: nameIsValid,
      street: streetIsValid,
      postalCode: postalIsValid,
      city: cityIsValid,
    });

    const formIsValid =
      nameIsValid && streetIsValid && cityIsValid && postalIsValid;
    if (!formIsValid) {
      return;
    }

    props.onConfirm({
      name: nameInput,
      street: streetInput,
      postalCode: postalInput,
      city: cityInput,
    });
    props.onClick();
  };

  const nameControl = `${styles.control} ${
    formInputValid.name ? "" : styles.invalid
  }`;
  const streetControl = `${styles.control} ${
    formInputValid.street ? "" : styles.invalid
  }`;
  const postalControl = `${styles.control} ${
    formInputValid.postalCode ? "" : styles.invalid
  }`;
  const cityControl = `${styles.control} ${
    formInputValid.city ? "" : styles.invalid
  }`;
  return (
    <>
      <form onSubmit={confirmHandler}>
        <div className={nameControl}>
          <label htmlFor="name">Your Name</label>
          <input type="text" id="name" ref={nameRef} />
          {!formInputValid.name && <p>Please enter a valid Name</p>}
        </div>
        <div className={streetControl}>
          <label htmlFor="street">Street</label>
          <input type="text" id="street" ref={streetRef} />
          {!formInputValid.street && <p>Please enter a valid Street</p>}
        </div>
        <div className={postalControl}>
          <label htmlFor="postal">Postal</label>
          <input type="text" id="postal" ref={postalRef} />
          {!formInputValid.postalCode && <p>Please enter a valid Postal</p>}
        </div>
        <div className={cityControl}>
          <label htmlFor="city">City</label>
          <input type="text" id="city" ref={cityRef} />
          {!formInputValid.city && <p>Please enter a valid City</p>}
        </div>
        <div className={styles.actions}>
          <button type="button" onClick={props.onCancel}>
            Cancel
          </button>
          <button type="submit" className={styles.submit}>
            Confirm
          </button>
        </div>
      </form>
    </>
  );
};

export default Checkout;
