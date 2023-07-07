import React from "react";

import { CardItemType } from "../context/CardPorvider";
import { ReducerAction } from "../context/CardPorvider";
import { ReducerActionType } from "../context/CardPorvider";

type PropsType = {
  item: CardItemType;
  dispatch: React.Dispatch<ReducerAction>;
  REDUCER_ACTIONS: ReducerActionType;
};
const CartLineItem = ({ item, dispatch, REDUCER_ACTIONS }: PropsType) => {
  const img: string = new URL(`../images/${item.sku}.jpg`, import.meta.url)
    .href;
  const lineTotal: number = item.price * item.quantity;

  const highestQuantity: number = 20 > item.quantity ? 20 : item.quantity;
  const optionValues: number[] = [...Array(highestQuantity).keys()].map(
    (n) => n + 1
  );
  const option: React.ReactElement | React.ReactElement[] = optionValues.map(
    (value) => {
      return (
        <option key={`opt${value}`} value={value}>
          {value}
        </option>
      );
    }
  );

  const onQuantityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const quantityValue: number = parseInt(e.target.value);
    dispatch({
      type: REDUCER_ACTIONS.QUANTITY,
      payload: { ...item, quantity: quantityValue },
    });
  };
  const onRemoveFromCart = () =>
    dispatch({ type: REDUCER_ACTIONS.REMOVE, payload: item });

  const content = (
    <li className="cart__item">
      <img src={img} alt={item.name} className="cart__img" />
      <div aria-label="Item Name">{item.name}</div>
      <div aria-label="Item Price">{item.price}</div>
      <div aria-label="Price Per Item">
        {new Intl.NumberFormat("tr-TR", {
          style: "currency",
          currency: "TRY",
        }).format(item.price)}
      </div>
      <label htmlFor="itemQty" className="offscreen">
        Item Quantity
      </label>
      <select
        name="Item Quantity"
        id="itemQty"
        className="cart__select"
        aria-label="item-quantity"
        onChange={onQuantityChange}
      >
        {option}
      </select>

      <div aria-aria-label="Line Item Subtotal" className="cart__item-subtotal">
        {new Intl.NumberFormat("tr-TR", {
          style: "currency",
          currency: "TRY",
        }).format(lineTotal)}
        <button
          className="cart__button"
          title="Remove Item From Cart"
          aria-label="Remove Item From Cart"
          onClick={onRemoveFromCart}
        >
          X
        </button>
      </div>
    </li>
  );

  return content;
};

export default CartLineItem;
