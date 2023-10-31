import { BtnBg } from "../styles/ButtonStyle";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";


function JoinComplete() {
  const navigate = useNavigate();

  // 로그인 페이지로 이동
  function goLogin() {
    navigate('/login');
  }

  return(
    <JoinCompleteWrapper>
      <TitleWrap><h2>회원가입이 완료되었습니다!</h2></TitleWrap>

      <BtnBg onClick={goLogin}>로그인 페이지로 이동하기</BtnBg>
    </JoinCompleteWrapper>
  )
}

const JoinCompleteWrapper = styled.div`
  width: 400px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  flex-direction: column;
`;

const TitleWrap = styled.div`
  margin-bottom: 30px;
  text-align: center;
`

export default JoinComplete;