import { useEffect, useState } from 'react';
import GlobalStyle from './styles/GlobalStyle';
import Header from './components/Header';
import Main from './components/Main';
import Footer from './components/Footer';
import axios from 'axios';


function App() {

  // 사용자 로그인 상태관리
  const [isLogin, setIsLogin] = useState(false);
  useEffect(() => {
    if(sessionStorage.getItem("아이디") === null) {
      console.log('isLogin?', isLogin);
    } else {
      console.log('isLogin?', isLogin);
      setIsLogin(true);
    }
  }, []);

  // 관리자 로그인 상태관리
  const [isAdmin, setIsAdmin] = useState(false);
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
      <Main 
        // onCategoryClick={handleCategoryClick}
        // cateProduct={cateProduct}
      />
      <Footer />
    </div>
  );
}

export default App;
