import { Routes, Route, Link } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Login from './pages/Login';
import Join from './pages/Join';
import GlobalStyle from './styles/GlobalStyle';
import JoinComplete from './pages/JoinComplete';
import SearchId from './pages/SearchId';
import ResetPwChk from './pages/ResetPwChk';
import ResetPw from './pages/ResetPw';


function App() {
  
  return (
    <div>
      <GlobalStyle />
      <Header />
      <div><Link to="/">홈</Link></div>
      <div><Link to="/login">로그인</Link></div>
      <div><Link to="/join">회원가입</Link></div>


      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/join' element={<Join />} />
        <Route path='/join/joincomplete' element={<JoinComplete />} />
        <Route path='/search/id' element={<SearchId />} />
        <Route path='/search/pw' element={<ResetPw />} />
        <Route path='/search/pw/check' element={<ResetPwChk />} />


      </Routes>
    </div>
  );
}

export default App;
