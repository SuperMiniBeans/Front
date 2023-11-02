import styled from "styled-components";
import { Link } from "react-router-dom";
import { FlexBox } from "../styles/Layout";
import { GoSearch } from "react-icons/go"
import { SlBag } from "react-icons/sl"

function Header() {
  // 로그인 상태 확인 여부
  // const [isLogin, setIsLogin] = useState();
  /* 로그인 되면 마이페이지 메뉴 보이게, 로그아웃은 마이페이지 옆에 보이게 ?? */

  /* 카테고리 Link to에도 쿼리스트링으로 지정?! 아니면 라우터로 설정? */
  /* OUTER클릭하면 OUTER에 속한 모든 제품 보이게 하기 */

  return(
    <HeaderWrap>
      <HeaderWrapFlex>
        <H1Wrap><h1><Link to="/">LYS</Link></h1></H1Wrap>

        <GnbUserWrap>
          <nav className="gnb">
            <Gnb>
              <MouseOver>
                <Link to="/productlist">OUTER</Link>
                <Lnb className="lnb">
                  <LnbLi><Link to='/'>COAT</Link></LnbLi>
                  <LnbLi><Link to='/'>JACKET</Link></LnbLi>
                  <LnbLi><Link to='/'>BLAZERS</Link></LnbLi>
                </Lnb>
              </MouseOver>
              <MouseOver>
                <Link to="/">TOP</Link>
                <Lnb className="lnb">
                  <LnbLi><Link to='/'>T-SHIRTS</Link></LnbLi>
                  <LnbLi><Link to='/'>SHIRTS</Link></LnbLi>
                  <LnbLi><Link to='/'>HOODIES/<br />SWEATSHIRTS</Link></LnbLi>
                  <LnbLi><Link to='/'>KNITWEAR</Link></LnbLi>
                </Lnb>
              </MouseOver>
              <MouseOver>
                <Link to="/">BOTTOM</Link>
                <Lnb className="lnb">
                  <LnbLi><Link to='/'>PANTS</Link></LnbLi>
                  <LnbLi><Link to='/'>JEANS</Link></LnbLi>
                </Lnb>
              </MouseOver>
              <MouseOver><Link to="/">ACC</Link></MouseOver>
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

      </HeaderWrapFlex>
    </HeaderWrap>
  ) 
}

/* 스타일 */
const HeaderWrap = styled.div`
  positoin: relative;
  width: 100%;
  height: 100px;
  margin-bottom: 100px;
  border-bottom: 1px solid #000;
  // background-color: skyblue;
`

const HeaderWrapFlex = styled(FlexBox)`
  positoin: relative;
  top:50%;
  transform: translateY(-50%);
  height: 60px;
  padding: 0 10px;
  align-items: center;
`

const H1Wrap = styled.div`
  margin-right: 64px;
`

const GnbUserWrap = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const Gnb = styled.ul`
  position: relative;
  width: 360px;
  display: flex;
  justify-content: space-between;
`

const MouseOver = styled.li`
  position: relative;

  &:hover {
    font-weight: 600;
  }

  &:hover .lnb {
    display: block;
  }
`
/* lnb 디자인.. 최선인가? */
const Lnb = styled.ul `
  display: none;
  position: absolute;
  // padding-top: 10px;
  left: 50%;
  transform: translateX(-50%);
  font-weight: 400;
  background-color: #fff;
  border: 1px solid #000;
  border-radius: 4px;
`

const LnbLi = styled.li`
  width: 120px;
  padding: 12px 10px;
  align-items: center;
  font-size: 14px;
  word-break: break-all;
  // border-bottom: 1px solid #000;


  &:hover {
    font-weight: 600;
  }

  // &:last-child {
  //   border-bottom: none;
  // }
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