import styled from "styled-components";
import { Link } from "react-router-dom";
import { Container, FlexBox, FlexBoxSB } from "../styles/Layout";

function Header() {


  return(
    <Container>
      <HeaderWrap>
        <HeaderFlexBox>
          <div><h1><Link to="/">LYS</Link></h1></div>
          <FlexBoxSB>

          </FlexBoxSB>
          <nav className="mainmenu">
            <Gnb>
              <li><Link to="/">OUTER</Link></li>
              <li><Link to="/">TOP</Link></li>
              <li><Link to="/">BOTTOM</Link></li>
              <li><Link to="/">ACC</Link></li>
              {/* <li><Link to="/">관리자</Link></li> */}
            </Gnb>
          </nav>

          <div>
            <FlexBox>
              <div><input type="search"></input></div>
              <div>검색버튼</div>
            </FlexBox>
            <div><Link to="/login">Login</Link></div>
            <div><Link to="/">장바구니</Link></div>
          </div>

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
  top:50%;
  transform: translateY(-50%);
  background-color: pink;
`

const MainMenu = styled.nav`

  

`

const Gnb = styled.ul`
  width: 248px;
  display: flex;
  justify-content: space-between;
  background-color: skyblue;

`



export default Header;