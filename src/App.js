import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Login from './pages/Login';
import Join from './pages/Join';
import GlobalStyle from './styles/GlobalStyle';
import JoinComplete from './pages/JoinComplete';
import SearchId from './pages/SearchId';
import ResetPwChk from './pages/ResetPwChk';
import ResetPw from './pages/ResetPw';
// import ProductDetail from './components/ProductDetail';
import Main from './components/Main';


function App() {
  
  return (
    <div>
      <GlobalStyle />
      <Header />
      <Main />

      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/join' element={<Join />} />
        <Route path='/join/joincomplete' element={<JoinComplete />} />
        <Route path='/search/id' element={<SearchId />} />
        <Route path='/search/check/pw' element={<ResetPw />} />
        <Route path='/search/check' element={<ResetPwChk />} />
      </Routes>
    </div>
  );
}

export default App;
