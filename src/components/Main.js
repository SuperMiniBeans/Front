import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Product from "../pages/Product";
import productMockData from "../data/prductMockdata";
import ProductDetail from "./ProductDetail";

function Main() {
  const [products] = useState(productMockData);

  return (
    <div>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path="/productlist/*" element={<Product products={products} />} />
        <Route path="/productlist/productdetail" element={<ProductDetail products={products} />} />
      </Routes>



    </div>
  );
}

export default Main;
