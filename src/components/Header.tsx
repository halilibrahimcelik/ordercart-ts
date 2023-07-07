import React from "react";
import Nav from "./Nav";
import useCart from "../hooks/useCart";

type PropsTypes = {
  viewCart: boolean;
  setViewCart: React.Dispatch<React.SetStateAction<boolean>>;
};
const Header = ({ viewCart, setViewCart }: PropsTypes) => {
  const { totalItem, totalPrice } = useCart();
  const content = (
    <header className="header">
      <div className="header_title-bar">
        <h1>Acme Co.</h1>
        <div className="header__price-box">
          <p>Total Items:{totalItem} </p>
          <p>Total Price: {totalPrice}</p>
        </div>
      </div>
      <Nav setViewCart={setViewCart} viewCart={viewCart} />
    </header>
  );
  return content;
};

export default Header;
