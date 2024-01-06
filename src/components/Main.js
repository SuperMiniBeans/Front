// import { useState } from "react";
import styled from "styled-components";

import { Routes, Route, useParams } from "react-router-dom";

// import Home from "../pages/Home";

// import Login from "../pages/Login";
// import ResetPwIdChk from "../pages/ResetPwIdChk";
// import ResetPwEmailChk from "../pages/ResetPwEmailChk";
// import ResetPw from "../pages/ResetPw";
// import SearchId from "../pages/SearchId";
// import Join from "../pages/Join";
// import JoinComplete from "../pages/JoinComplete";

// import MyPage from "../pages/MyPage";
// import Admin from "../pages/Admin";

// import Product from "../pages/Product";
// import ProductDetail from "../pages/ProductDetail";

// import AddProduct from "../pages/AddProduct";
// import UpdateProduct from "../pages/UpdateProduct";

// import Cart from "../pages/Cart";
// import Order from "../pages/Order";
// import OrderComplete from "../pages/OrderComplete";

// 로그인한 사용자만 볼 수 있는 페이지는 redirect to='/login'처리하기( )


function Main() {


  return (
    <MainWrap>
      {/* <Routes>
        <Route path='/order/complete' element={<OrderComplete />} />
        <Route path='/order' element={<Order />} />
        <Route path='/cart' element={<Cart />} />

        <Route exact path='/admin/*' element={<Admin />} />
        <Route path='/admin/add' element={<AddProduct />} />
        <Route path='/admin/products/:id/edit' element={<UpdateProduct />} />

        <Route path='/myPage' element={<MyPage />} />

        <Route 
          path='/product/list/:majorName/:minorName?' element={<Product />} />
        <Route path='/product/list/detail/:id' element={<ProductDetail />} />

        <Route path='/join/joincomplete' element={<JoinComplete />} />
        <Route path='/join' element={<Join />} />

        <Route path='/search/id' element={<SearchId />} />
        <Route path='/search/check/pw' element={<ResetPw />} />
        <Route path='/search/check/email' element={<ResetPwEmailChk />} />
        <Route path='/search/check/id' element={<ResetPwIdChk />} />
        <Route path='/login' element={<Login />} />

        <Route exact path='/' element={<Home />} />
      </Routes> */}
    </MainWrap>
  );
}

const MainWrap = styled.section `
  // padding: 100px 0;
  background: pink;
`

export default Main;
