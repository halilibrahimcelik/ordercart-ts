import React, { useState } from "react";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Cart from "./components/Cart";
import Product from "./components/Product";

function App() {
  const [viewcart, setViewcart] = useState<boolean>(false);
  const pageContent = viewcart ? <Cart /> : <Product />;
  const content = (
    <>
      <Header viewCart={viewcart} setViewCart={setViewcart} />
      {pageContent}
      <Footer viewCart={viewcart} />
    </>
  );
  return content;
}

export default App;
