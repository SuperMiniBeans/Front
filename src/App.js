import { Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Join from './pages/Join';
import GlobalStyle from './styles/GlobalStyle';


function App() {
  
  return (
    <div>
      <GlobalStyle />
      <div><Link to="/">홈</Link></div>
      <div><Link to="/login">로그인</Link></div>
      <div><Link to="/join">회원가입</Link></div>


      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/join' element={<Join />} />
      </Routes>
    </div>
  );
}

export default App;
