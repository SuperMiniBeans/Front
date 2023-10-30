import styled from "styled-components";
import { Link } from "react-router-dom";
import { Container, FlexBox, FlexBoxSB } from "../styles/Layout";

function Header() {


  return(
    <Container>
      <HeaderWrap>
        <HeaderFlexBox>
          <H1Wrap><h1><Link to="/">LYS</Link></h1></H1Wrap>

          <GnbUserMenuWrap>
            <nav className="mainmenu">
              <Gnb>
                <li><Link to="/">OUTER</Link></li>
                <li><Link to="/">TOP</Link></li>
                <li><Link to="/">BOTTOM</Link></li>
                <li><Link to="/">ACC</Link></li>
                {/* <li><Link to="/">관리자</Link></li> */}
              </Gnb>
            </nav>

            <FlexBox style={{alignItems: 'center'}}>
              <FlexBox style={{alignItems: 'center'}}>
                <div><SearchInput type="search"></SearchInput></div>
                <div>검색버튼</div>
              </FlexBox>
              <div><Link to="/login">Login</Link></div>
              <div><Link to="/">장바구니</Link></div>
            </FlexBox>
          </GnbUserMenuWrap>
        </HeaderFlexBox>
      </HeaderWrap>
    </Container>
  ) 
}



const HeaderWrap = styled.div`
  positoin: relative;
  width: 100%;
  height: 100px;
  background-color: gray;
`

const HeaderFlexBox = styled(FlexBox)`
  positoin: relative;
  top:50%;
  transform: translateY(-50%);
  height: 60px;
  align-items: center;
  background-color: pink;
`

const H1Wrap = styled.div`
  margin-right: 40px;
`

// const MainMenu = styled.nav`

  

// `

const GnbUserMenuWrap = styled.div`
  position: relative;
  width: 100%;
  min-width: 720px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  // background-color: blue;
`

const Gnb = styled.ul`
  width: 248px;
  display: flex;
  justify-content: space-between;
  background-color: skyblue;
`

const SearchInput = styled.input`
  width: 280px;
  height: 32px;
  padding-left: 20px;
  font-size: 16px;
  border-radius: 20px;
  border: none;
  background-color: #eee;

`




export default Header;