import styled from "styled-components";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Container, FlexBox } from "../styles/Layout";
import { GoSearch } from "react-icons/go"
import { SlBag } from "react-icons/sl"
import { useDispatch, useSelector } from "react-redux";
import { fetchCartList } from "../store";
  
function Header({ isLogin, setIsLogin, isAdmin }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const categories = useSelector(state => state.categories);
  const cartItems = useSelector(state => state.cart.items);
  const cartCount = useSelector(state => state.cart.cartCount);

  // 로그아웃 클릭하면 실행될 코드
  const onLogout = () => {
    sessionStorage.removeItem("아이디");
    sessionStorage.removeItem("비밀번호");
    sessionStorage.removeItem("userNumber");
    setIsLogin(false);
    navigate('/');
  }

  // 장바구니에 담긴 상품 수량 표시하기
  useEffect(() => {
    if(isLogin) {
      dispatch(fetchCartList());
    }
  }, [isLogin]);

  return(
    <HeaderWrap>
        <HeaderWrapFlex>
          <H1Wrap>
            <h1><Link to="/">LYS</Link></h1>
          </H1Wrap>

          <GnbUserWrap>
            <nav className="gnb">
              <Gnb>
                <MouseOver>
                  <Link to="/product/list/ALL">ALL</Link>
                </MouseOver>

                {categories.majorCategories.map(category => (
                  <MouseOver 
                    // onClick={() => onCategoryClick(category.value)} 
                    key={category.id}
                  >
                    <Link to={`/product/list/${category.name}`}>
                      {category.name}
                    </Link>

                    <Lnb className="lnb">
                      {categories.minorCategories[category.value].map(subcategory => (
                        <LnbLi 
                          className="LnbLi" 
                          onClick={e => {
                            e.stopPropagation(); 
                            // onCategoryClick(category.value, subcategory.value)
                          }}
                          key={subcategory.id}
                        >
                          <Link to={`/product/list/${category.name}/${subcategory.name}`}>
                            {subcategory.name}
                          </Link>
                        </LnbLi>
                      ))}
                    </Lnb>

                  </MouseOver>
                ))}

                {isAdmin ? 
                  <MouseOver>
                    <Link to="/admin/*">관리자</Link>
                  </MouseOver>
                :
                  <></>
                }
              </Gnb>
            </nav>

            <UserWrap>
              {/* <SearchWrap>
                <div><input type="search"></input></div>
                <div><button type="submit"><GoSearch /></button></div>
              </SearchWrap> */}

              {
                isLogin ? 
                  <>
                    <LogoutLi onClick={onLogout}>로그아웃</LogoutLi>
                    <MyPageLi><Link to="/myPage">마이페이지</Link></MyPageLi>
                  </>
                  : 
                  <LoginLi><Link to="/login">로그인</Link></LoginLi>
              }

              <ShoppingBag>
                <Link to="/cart">
                  {
                    isLogin && cartItems.length > 0 ?
                      <span id="car_count">{cartCount}</span>
                    :
                      <></>
                  }
                  
                  <SlBag />
                </Link>
              </ShoppingBag>

              <SearchWrap>
                <div><input type="search"></input></div>
                <div><button type="submit"><GoSearch /></button></div>
              </SearchWrap>
            </UserWrap>
          </GnbUserWrap>

        </HeaderWrapFlex>

    </HeaderWrap>
  ) 
}

/* 스타일 */
const HeaderWrap = styled.header`
  position: relative;
  width: 100%;
  min-width: 1200px;
  height: 100px;
  padding: 0 10px;
  border-bottom: 1px solid #333;
  z-index: 10;
`

const HeaderWrapFlex = styled(FlexBox)`
  position: relative;
  top: 50px;
  transform: translateY(-30px);
  height: 60px;
  align-items: center;
`

const H1Wrap = styled.div`
  margin-right: 40px;
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
  display: flex;
  justify-content: space-between;

  li {
    min-width: 80px;
    text-align: center;
  }
`

const MouseOver = styled.li`
  position: relative;
  line-height: 60px;

  &:hover {
    font-weight: 600;
  }

  &:hover .lnb {
    display: block;
    position: absolute;
    top:100%;
    left: 50%;
    transform: translateX(-50%);
    line-height: 16px;
    font-weight: 400;
    background-color: #fff;
    border: 1px solid #333;
  }
`
/* lnb 디자인.. 최선인가? */
const Lnb = styled.ul `
  display: none;
`

const LnbLi = styled.li`
  width: 160px;
  padding: 12px 20px;
  align-items: center;
  font-size: 14px;
  word-break: break-all;
  border-bottom: 1px solid #333;

  &:hover {
    font-weight: 600;
  }

  &:last-child {
    border-bottom: none;
  }
`

const UserWrap = styled.ul`
  display: flex;
  align-items: center;
`

const SearchWrap = styled.li`
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
const LoginLi = styled.li`
  margin-left: 40px;
  margin-right: 20px;
  font-size: 12px;
`

const LogoutLi = styled.li`
  width: 80px;
  margin-left: 40px;
  font-size: 12px;
  text-align: center;
  cursor: pointer;
  // background: pink;
`

const MyPageLi = styled.li`
  width: 80px;
  // margin: 0 20px;
  font-size: 12px;
  text-align: center;
  cursor: pointer;
`

/* 장바구니 아이콘 */
const ShoppingBag = styled.li`
  position: relative;

  #car_count {
    position:absolute;
    top: -2px;
    right: -4px;
    width: 12px;
    height: 12px;
    font-size: 10px;
    text-align: center;
    line-height: 12px;
    color: #fff;
    border-radius: 50%;
    background-color: #F82A2A;
  }

  svg {
    width: 18px;
    height: auto;
  }
`

export default Header;