import React, { createContext, useState, useEffect } from "react";

export type ProductType = {
  sku: string;
  name: string;
  price: number;
};

// const initState:ProductType[] = [

// ]

const initState: ProductType[] = [
  {
    sku: "item0001",
    name: "Widget",
    price: 9.99,
  },
  {
    sku: "item0002",
    name: "Premium Widget",
    price: 19.99,
  },
  {
    sku: "item0003",
    name: "Deluxe Widget",
    price: 29.99,
  },
];

export type UseProductsContextType = {
  products: ProductType[];
};
const initContextState: UseProductsContextType = {
  products: [],
};

export const ProductsContext =
  createContext<UseProductsContextType>(initContextState);

type ChildrenType = {
  children?: React.ReactElement | React.ReactElement[];
};

export const ProductsProvider = ({
  children,
}: ChildrenType): React.ReactElement => {
  const [products, setProducts] = useState<ProductType[]>(initState);

  //this is for fetching data from server
  // useEffect(() => {

  //   const fetchProducts = async ():Promise <ProductType[] |void> => {
  //     try {
  //       const data= await fetch("http://localhost:3500/products");
  //       const response= await data.json();
  //       return response;
  //     } catch (error) {
  //     if(error instanceof Error){
  //       console.log(error.message);
  //     }

  //    }
  //   }
  //   fetchProducts().then(products=>setProducts(products as ProductType[]));
  // }, []);

  return (
    <ProductsContext.Provider value={{ products }}>
      {children}
    </ProductsContext.Provider>
  );
};
