import { useEffect, useState } from 'react';
import GlobalStyle from './styles/GlobalStyle';
import Header from './components/Header';
import Main from './components/Main';
import Footer from './components/Footer';


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
  }, [isLogin]);

  // 관리자 로그인 상태관리
  const [isAdmin, setIsAdmin] = useState(false);
  useEffect(() => {
    if(sessionStorage.getItem("아이디") !== 'admin') {
      console.log('isAdmin?', isAdmin);
    } else {
      console.log('isAdmin?', isAdmin);
      setIsAdmin(true);
    }
  }, [isAdmin]);


  return (
    <div>
      <GlobalStyle />
      
      <Header isLogin={isLogin} isAdmin={isAdmin}/>
      <Main />
      <Footer />
    </div>
  );
}

export default App;
