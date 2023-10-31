import styled from "styled-components";
import { Link } from "react-router-dom";
import { Container, FlexBox } from "../styles/Layout";
import { GoSearch } from "react-icons/go"
import { SlBag } from "react-icons/sl"

function Header() {


  return(
    <Container>
      <HeaderWrap>
        <HeaderFlexBox>
          <H1Wrap><h1><Link to="/">LYS</Link></h1></H1Wrap>

          <GnbUserWrap>
            <nav className="mainmenu">
              <Gnb>
                <li><Link to="/">OUTER</Link></li>
                <li><Link to="/">TOP</Link></li>
                <li><Link to="/">BOTTOM</Link></li>
                <li><Link to="/">ACC</Link></li>
                {/* <li><Link to="/">관리자</Link></li> */}
              </Gnb>
            </nav>

            <UserWrap>
              <SearchWrap>
                <div><input type="search"></input></div>
                <div><button type="submit"><GoSearch /></button></div>
              </SearchWrap>
              <div><Link to="/login">Login</Link></div>
              <ShoppingBag><Link to="/"><SlBag /></Link></ShoppingBag>
            </UserWrap>
          </GnbUserWrap>

        </HeaderFlexBox>
      </HeaderWrap>
    </Container>
  ) 
}

/* 스타일 */
const HeaderWrap = styled.div`
  positoin: relative;
  width: 100%;
  height: 100px;
  margin-bottom: 100px;
`

const HeaderFlexBox = styled(FlexBox)`
  positoin: relative;
  top:50%;
  transform: translateY(-50%);
  height: 60px;
  align-items: center;
`

const H1Wrap = styled.div`
  margin-right: 40px;
`

const GnbUserWrap = styled.div`
  position: relative;
  width: 100%;
  // min-width: 720px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const Gnb = styled.ul`
  width: 248px;
  display: flex;
  justify-content: space-between;
`

const UserWrap = styled.div`
  display: flex;
  align-items: center;
`

const SearchWrap = styled.div`
  position: relative;
  display: flex;
  margin: 0 20px ; 

  align-items: center;

  input {
    width: 280px;
    height: 32px;
    padding: 0 40px 0 20px;
    border-radius: 20px;
    border: none;
    background-color: #eee;
    &:focus {
      outline: none;
    }
    &::-ms-clear,
    &::-ms-reveal {
      display:none;
    }
    &::-webkit-search-decoration,
    &::-webkit-search-cancel-button,
    &::-webkit-search-results-button,
    &::-webkit-search-results-decoration {
      display: none;
    }
  }

  button {
    position: absolute;
    right: 10px;
    top:50%;
    transform: translateY(-50%);
    width: 18px;
    height: 18px;
    border: none;
    cursor: pointer;
  }

  /* 검색 버튼 아이콘 */
  svg {
    width: 18px;
    height: 18px;
  }
`

/* 장바구니 아이콘 */
const ShoppingBag = styled.div`
  svg {
    width: 20px;
    height: 32px;
    margin-left: 20px;
  }
`

export default Header;