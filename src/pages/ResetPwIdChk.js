import styled from "styled-components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FlexBox } from "../styles/Layout";
import axios from "axios";
import { BtnBg } from "../styles/ButtonStyle";

function ResetPwIdChk() {
  const [id, setId] = useState("");

  const [IdMessage, SetIdMessage] = useState("");
  const [idMsgColor, setIdMsgColor] = useState({color: "#F82A2A"});
  const [isId, setIsId] = useState(false);

  const navigate = useNavigate();

  //문자열에 공백이 있는 경우
  let blankReg = /[\s]/g;

  // 사용자 아이디 받기
  const idReg = /^[a-z0-9]{2,10}$/;

  const userId = e => {
    setId(e.target.value);

    if(!idReg.test(e.target.value)) {
      SetIdMessage("2~10자의 영문 소문자, 숫자를 사용해 주세요.");
      if(blankReg.test(e.target.value) === true) {
        SetIdMessage("공백 없이 입력해 주세요.");
      }
    } 
    else {
      SetIdMessage("")
      setIsId(true);
    }
  }

  // 사용자 아이디 확인
  function checkUserInfo() {
    if(!isId) {
      alert("입력한 정보를 다시 확인 해주세요.");
    }
    axios.post('/searchPw', {
      userId: id,
      userNumber: sessionStorage.getItem("userNumber")
    })
      .then(response => {
        if(response.data !== null ) {
          sessionStorage.setItem("userNumber", response.data);
          console.log(response.data);
          navigate('/search/check/email');
        }
      }).catch(error => {
        alert(error);
        alert("입력한 정보를 다시 확인해주세요.");
      })
  }

  return(
    <ResetPwChkWrapper>
      <TitleWrap>
        <h2>비밀번호 재설정</h2>
        <ResetPwStep>
          <div>아이디 입력</div>
          <span></span>
          <div>본인 확인</div>
          <span></span>
          <div>비밀번호 재설정</div>
        </ResetPwStep>
      </TitleWrap>

      <ItemWrap>
        {/* <LabelWrap>
          <label>아이디</label>
        </LabelWrap> */}
        <div>
          <FlexBox>
            <Input type="text" name="userId" value={id} placeholder="아이디를 입력하세요" maxLength={8} onChange={userId} />
          </FlexBox>
          <div><ErrMsg style={idMsgColor}>{IdMessage}</ErrMsg></div>
        </div>
      </ItemWrap>

      <BtnBg type="submit" onClick={checkUserInfo}>다음</BtnBg>
    </ResetPwChkWrapper>
  )
}

const ResetPwChkWrapper = styled.div`
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

const ResetPwStep = styled.div`
  positon: relative;
  margin-top: 24px; 
  display: flex;
  justify-content: center; 
  text-align: center;
  line-height: 20px;

  div:first-child {
    font-weight: 600;
  }

  span {
    position: relative;
    width: 20px; 
    height: 20px;
  }

  span::after {
    position: absolute;
    left: 24%; top: 32%;
    content: '';
    width: 6px;
    height: 6px;
    border-top: 2px solid #aaa; 
    border-right: 2px solid #aaa; 
    transform: rotate(45deg); 
    // background-color: red;
  }

  div:nth-of-type(2),
  div:nth-of-type(3) {
    color: #aaa;
  }
`

// const LabelWrap = styled.div`
//   margin-bottom: 4px;
//   font-weight: 600;
// `

const Input = styled.input`
  width: 100%;
  height: 40px;
  padding-left: 10px;
  border: 1px solid #aaa;
`

const ItemWrap = styled.div`
  height: 88px;
`

const ErrMsg = styled.span`
  font-size: 12px;
`

export default ResetPwIdChk;