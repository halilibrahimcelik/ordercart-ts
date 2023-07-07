import React from "react";
import { ProductType } from "../context/ProductsProvider";

import { ReducerActionType, ReducerAction } from "../context/CardPorvider";

type PropsTypes = {
  product: ProductType;
  dispatch: React.Dispatch<ReducerAction>;
  REDUCER_ACTIONS: ReducerActionType;
  inCart: boolean;
};
const ProductItem = ({
  product,
  dispatch,
  REDUCER_ACTIONS,
  inCart,
}: PropsTypes): React.ReactElement => {
  const img: string = new URL(`../images/${product.sku}.jpg`, import.meta.url)
    .href;

  const onAddToCart = () =>
    dispatch({
      type: REDUCER_ACTIONS.ADD,
      payload: { ...product, quantity: 1 },
    });

  const itemInCart = inCart ? " → Item in Cart: ✔️" : null;
  const content = (
    <article className="product">
      <h3>{product.name} </h3>
      <img src={img} alt={product.name} className="product__img" />
      <p>
        {new Intl.NumberFormat("tr-TR", {
          style: "currency",
          currency: "TRY",
        }).format(product.price)}{" "}
        {itemInCart}
      </p>
      <button onClick={onAddToCart}>Add To Cart</button>
    </article>
  );
  return content;
};

export default ProductItem;
