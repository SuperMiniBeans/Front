import styled from 'styled-components';
import { useEffect, useState } from 'react';
import GlobalStyle from './styles/GlobalStyle';
import Header from './components/Header';
import Main from './components/Main';
import Footer from './components/Footer';
import axios from 'axios';
import { Routes, Route, useParams } from "react-router-dom";

import Home from "./pages/Home";

import Login from './pages/Login';
import ResetPwIdChk from "./pages/ResetPwIdChk";
import ResetPwEmailChk from "./pages/ResetPwEmailChk";
import ResetPw from "./pages/ResetPw";
import SearchId from "./pages/SearchId";
import Join from "./pages/Join";
import JoinComplete from "./pages/JoinComplete";

import MyPage from "./pages/MyPage";
import Admin from "./pages/Admin";

import Product from "./pages/Product";
import ProductDetail from "./pages/ProductDetail";

import AddProduct from "./pages/AddProduct";
import UpdateProduct from "./pages/UpdateProduct";

import Cart from "./pages/Cart";
import Order from "./pages/Order";
import OrderComplete from "./pages/OrderComplete"; 


function App() {
  const [isLogin, setIsLogin] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  // 사용자 로그인 상태관리
  useEffect(() => {
    if(sessionStorage.getItem("아이디") === null) {
      console.log('isLogin?', isLogin);
    } else {
      console.log('isLogin?', isLogin);
      setIsLogin(true);
    }
  }, []);

  // 관리자 로그인 상태관리
  useEffect(() => {
    if(sessionStorage.getItem("아이디") !== 'admin') {
      console.log('isAdmin?', isAdmin);
    } else {
      console.log('isAdmin?', isAdmin);
      setIsAdmin(true);
    }
  }, []);

  // 카테고리 선택 
  // const [majorCategory, setMajorCategory] = useState(null);
  // const [minorCategory, setMinorCategory] = useState(null);

  // const [cateProduct, setCateProduct] = useState();

  // const handleCategoryClick = (majorValue, minorValue) => {
  //   console.log('카테고리 클릭', majorValue, minorValue);

  //   const categoryValue = {
  //     categoryMajorCode: majorValue,
  //   }

  //   if(minorValue) {
  //     categoryValue.categoryMinorCode = minorValue;
  //   }

  //   axios.post('/divideCode', categoryValue)
  //     .then(res => {
  //       setMajorCategory(majorValue);

  //       if(minorValue) {
  //         setMinorCategory(minorValue);
  //       }

  //       setCateProduct(res.data);
  //     })
  //     .catch(error => {
  //       console.log(error);
  //     })
  // }


  // console.log('cateProduct', cateProduct);





  return (
    <div>
      <GlobalStyle />
      
      <Header 
        isLogin={isLogin} setIsLogin={setIsLogin} 
        isAdmin={isAdmin} setIsAdmin={setIsAdmin}
        // onCategoryClick={handleCategoryClick}
      />

      {/* 라우터 경로 설정 */}
      <MainContentWrap>
        <Routes>
          <Route path='/order/complete' element={<OrderComplete />} />
          <Route path='/order' element={<Order />} />
          <Route path='/cart' element={<Cart />} />

          <Route exact path='/admin/*' element={<Admin />} />
          <Route path='/admin/add' element={<AddProduct />} />
          <Route path='/admin/products/:id/edit' element={<UpdateProduct />} />

          <Route path='/myPage' element={<MyPage />} />

          <Route path='/product/list/:majorName/:minorName?' element={<Product />} />
          <Route path='/product/list/detail/:id' element={<ProductDetail />} />

          <Route path='/join/joincomplete' element={<JoinComplete />} />
          <Route path='/join' element={<Join />} />

          <Route path='/search/id' element={<SearchId />} />
          <Route path='/search/check/pw' element={<ResetPw />} />
          <Route path='/search/check/email' element={<ResetPwEmailChk />} />
          <Route path='/search/check/id' element={<ResetPwIdChk />} />
          <Route path='/login' element={<Login />} />

          <Route exact path='/' element={<Home />} />
        </Routes>
      </MainContentWrap>

      {/* <Main 
        // onCategoryClick={handleCategoryClick}
        // cateProduct={cateProduct}
      /> */}
      <Footer />
    </div>
  );
}

const MainContentWrap = styled.div`
  padding: 40px 0 200px;
`

export default App;
