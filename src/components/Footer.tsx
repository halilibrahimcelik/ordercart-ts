import React from "react";
import useCart from "../hooks/useCart";
type PropsTypes = {
  viewCart: boolean;
};
const Footer = ({ viewCart }: PropsTypes) => {
  const { totalItem, totalPrice } = useCart();
  const year: number = new Date().getFullYear();

  const pageContent = viewCart ? (
    <p>Shopping Cart © {year}</p>
  ) : (
    <>
      <p>Total Items:{totalItem} </p>
      <p> Total Price:{totalPrice} </p>
      <p>Shoppin Cart © {year}</p>
    </>
  );
  const content = <footer className="footer">{pageContent}</footer>;
  return content;
};

export default Footer;
