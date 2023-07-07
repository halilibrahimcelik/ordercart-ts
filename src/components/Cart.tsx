import React, { useState } from "react";
import useCart from "../hooks/useCart";
import CartLineItem from "./CartLineItem";
const Cart = () => {
  const [confirm, setConfirm] = useState<boolean>(false);
  const { cart, dispatch, REDUCER_ACTIONS, totalItem, totalPrice } = useCart();

  const onSubmitOrder = () => {
    dispatch({ type: REDUCER_ACTIONS.SUBMIT });
    setConfirm(true);
  };

  const pageContent = confirm ? (
    <div>
      <h1>Thank you for your order!</h1>
      <p>You will receive an email confirmation shortly.</p>
    </div>
  ) : (
    <>
      <h2 className="offscreen">Cart</h2>
      <ul className="cart">
        {cart.map((item) => {
          return (
            <CartLineItem
              key={item.sku}
              item={item}
              dispatch={dispatch}
              REDUCER_ACTIONS={REDUCER_ACTIONS}
            />
          );
        })}
      </ul>
      <div className="cart__totals">
        <p>Total Items: {totalItem} </p>
        <p>Total Price: {totalPrice} </p>
        <button
          className="cart__submit"
          onClick={onSubmitOrder}
          disabled={!totalItem}
        >
          Place Order{" "}
        </button>
      </div>
    </>
  );

  const content = <main className="main main--cart">{pageContent}</main>;
  return content;
};

export default Cart;
