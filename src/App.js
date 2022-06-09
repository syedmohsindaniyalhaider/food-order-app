import "./App.css";
import Header from "./Components/Layout/Header/Header";
import Meals from "./Components/Meals/Meals";
import Cart from "./Components/Cart/Cart";
import { useState } from "react";
import CartProvider from "./Store/CartProvider";

function App() {
  const [cartShown, setCartShown] = useState(false);

  const showCardHandler = () => {
    setCartShown(true);
  };
  const hideCardHandler = () => {
    setCartShown(false);
  };
  return (
    <CartProvider>
      {cartShown && <Cart setCartIsHidden={hideCardHandler} />}
      <Header setCartIsShown={showCardHandler} />
      <main>
        <Meals />
      </main>
    </CartProvider>
  );
}

export default App;
