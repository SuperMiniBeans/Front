import { Container, FlexBox } from "../styles/Layout";
import { BtnBg, BtnBorder } from "../styles/ButtonStyle"
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

function OrderComplete() {
  const navigate = useNavigate();

  const goOrderList = () => {
    navigate('/myPage');
  }

  const goHome = () => {
    navigate('/');
  }

  return(
    <OrderCompleteWrap>
      <Container>
        <h2>주문이 완료 되었습니다.</h2>

        <BtnWrap>
          <div>
            <OrderListBtn onClick={goOrderList}>주문 내역 확인하기</OrderListBtn>
          </div>

          <div>
            <HomeBtn onClick={goHome}>홈으로 가기</HomeBtn>
          </div>
        </BtnWrap>

      </Container>
    </OrderCompleteWrap>
  )
}

const OrderCompleteWrap = styled.div`
  h2 {
    text-align: center;
    margin-bottom: 40px;
  }
`

const BtnWrap = styled.div`
  display: flex;
  justify-content: center;
`

const OrderListBtn = styled(BtnBorder)`
  width: 160px;
  margin-right: 20px;
`

const HomeBtn = styled(BtnBg)`
  width: 160px;
`


export default OrderComplete;