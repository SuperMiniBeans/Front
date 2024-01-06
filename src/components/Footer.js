import styled from "styled-components";
import { BiLogoInstagram } from "react-icons/bi"
import { Container, FlexBoxSB } from "../styles/Layout";
import { Link } from "react-router-dom";

function Footer() {

  return(
    <FooterWrap>
      <Container>
        <InfoWrap>
          <FlexBoxSB className="flexbox_sb">
            <ul className="flexbox_col">
              <h1 className="footer_logo">LYS</h1>
              <div style={{display: 'flex'}}>
                <li>대표 OOO</li>
                <span className="divide_line">|</span>
                <li>주소  서울시 OO구 OO동</li>
              </div>
              <div style={{display: 'flex'}}>
                <li>사업자 번호 123456789</li>
                <span className="divide_line">| </span>
                <li>통신판매업 번호 123-ㅇㅇㅇㅇ-123</li>
                <span className="divide_line">| </span>
                <li>asdf@gmail.com</li>
              </div>
            </ul>

            <CScenter>
              <p>고객센터</p>
              <p className="ars">02-1234-1234</p>
              <p>평일 9:00 ~ 18:00</p>
              <p>점심시간 12:00 ~ 13:00</p>
              <p>주말 및 공휴일 휴무</p>
              <Link to='#'><BiLogoInstagram /></Link>
            </CScenter>
          </FlexBoxSB>
        </InfoWrap>
      </Container>
    </FooterWrap>
  )
}

const FooterWrap = styled.footer`
  position: relative;
  width: 100%;
  min-width: 1200px;
  height: 360px;
  // margin-top: 160px;
  bottom: 0;
  align-items: center;
  background-color: #000;
`

const InfoWrap = styled.div`
  position: relative;
  top: 180px;
  transform: translateY(-86px);
  width: 100%;
  height: 172px;
  font-size: 14px;
  color: #eee;
  // background-color: green;

  .flexbox_sb {
    width: 100%;
    top: 50%;
    transform: translateY(-50%);
    height: 172px;
    // background-color: grey;
  }

  .flexbox_col {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .footer_logo {
    font-size: 64px;
    margin-bottom: 48px;
  }

  .divide_line {
    margin: 0 10px;
  }
`

const CScenter = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  
  .ars {
    font-size: 24px;
    margin-bottom: 20px;
  }

  svg {
    position: relative;
    left: -4px; bottom: -6px;
    width: 32px;
    height: 32px;
    margin-top: 10px;
    color: #fff;
    // background-color: grey;
  }
`

export default Footer;