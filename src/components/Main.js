// import { useState } from "react";
import { Routes, Route } from "react-router-dom";
// import Home from "../pages/Home";
import Login from "../pages/Login";
import ResetPwChk from "../pages/ResetPwChk";
import ResetPw from "../pages/ResetPw";
import SearchId from "../pages/SearchId";
import Join from "../pages/Join";
import JoinComplete from "../pages/JoinComplete";
import MyPage from "../pages/MyPage";
import Admin from "../pages/Admin";
// import Product from "../pages/Product";

function Main() {

  return (
    <div>
      <Routes>
        <Route path='/' element={<Admin />} />

        <Route path='/myPage' element={<MyPage />} />
        {/* <Route path='/product/*' element={<Product />} /> */}
        <Route path='/join/joincomplete' element={<JoinComplete />} />
        <Route path='/join' element={<Join />} />
        <Route path='/search/id' element={<SearchId />} />
        <Route path='/search/check/pw' element={<ResetPw />} />
        <Route path='/search/check' element={<ResetPwChk />} />
        <Route path='/login' element={<Login />} />
        {/* <Route path='/' element={<Home />} /> */}
      </Routes>
    </div>
  );
}

export default Main;
