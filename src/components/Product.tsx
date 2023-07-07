import React from "react";
import useCart from "../hooks/useCart";
import useProducts from "../hooks/useProducts";
import ProductItem from "./ProductItem";

const Product = () => {
  const { products } = useProducts();
  const { dispatch, REDUCER_ACTIONS, cart } = useCart();

  let pageContent: React.ReactElement | React.ReactElement[] = <p>Loading..</p>;
  if (products?.length > 0) {
    pageContent = products.map((product) => {
      const inCart: boolean = cart.some((item) => item.sku === product.sku);

      return (
        <ProductItem
          key={product.sku}
          product={product}
          dispatch={dispatch}
          REDUCER_ACTIONS={REDUCER_ACTIONS}
          inCart={inCart}
        />
      );
    });
  }

  const content = <main className="main main--products">{pageContent}</main>;
  return content;
};

export default Product;
