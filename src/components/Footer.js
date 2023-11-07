import styled from "styled-components";
import { Container } from "../styles/Layout";

function Footer() {

  return(
    <FooterWrap>

      <Container>
        <FooterLogo><h1>LYS</h1></FooterLogo>


      </Container>
    </FooterWrap>
  )
}

const FooterWrap = styled.div`
  width: 100%;
  height: 360px;
  margin-top: 160px;
  bottom: 0;
  background-color: #000;
`

const FooterLogo = styled.div`
  color: #fff;
`

export default Footer;