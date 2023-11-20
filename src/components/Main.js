// import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import ResetPwChk from "../pages/ResetPwChk";
import ResetPw from "../pages/ResetPw";
import SearchId from "../pages/SearchId";
import Join from "../pages/Join";
import JoinComplete from "../pages/JoinComplete";
import MyPage from "../pages/MyPage";
import Admin from "../pages/Admin";
import Product from "../pages/Product";
import ProductDetail from "./ProductDetail";
import AddProduct from "./AddProduct";
import styled from "styled-components";


function Main() {

  return (
    <MainWrap>
      <Routes>
        <Route exact path='/admin/*' element={<Admin />} />
        <Route path="/admin/add" element={<AddProduct />} />

        <Route path='/myPage' element={<MyPage />} />

        <Route path="/product/list/*" element={<Product />} />
        <Route path="/product/list/detail" element={<ProductDetail />} />

        <Route path='/join/joincomplete' element={<JoinComplete />} />
        <Route path='/join' element={<Join />} />

        <Route path='/search/id' element={<SearchId />} />
        <Route path='/search/check/pw' element={<ResetPw />} />
        <Route path='/search/check' element={<ResetPwChk />} />
        <Route path='/login' element={<Login />} />

        <Route exact path='/' element={<Home />} />
      </Routes>
    </MainWrap>
  );
}

const MainWrap = styled.section `
  // margin-bottom: 600px;
  // background-color: #ccc;

`

export default Main;
