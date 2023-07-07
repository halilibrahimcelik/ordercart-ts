import { useContext } from "react";

import { CartContext, UseCartContextType } from "../context/CardPorvider";

const useCart = (): UseCartContextType => {
  return useContext(CartContext);
};

export default useCart;
