import styled from "styled-components";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BtnBg } from "../styles/ButtonStyle";

function ResetPwEmailChk() {
  /* 
  인증번호 받기 버튼 누르면 email유효성 검사( )
  인증번호 받기 버튼 누르면 인증번호 input 활성화( )
  다음 버튼 누르면 인증번호 올바르게 입력했는지 검사( )  
  */
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [checkNum, setCheckNum] = useState();

  const [emailMessage, setEmailMessage] = useState("");
  const [emailMsgColor, setEmailMsgColor] = useState({color: "#F82A2A"});

  const [isEmail, setIsEmail] = useState(false);
  const [isCheckNum, setIsCheckNum] = useState(false);


  //문자열에 공백이 있는 경우
  let blankReg = /[\s]/g;

  // 사용자 이메일 받기, 유효성 검사
  const userEmail = e => {
    setEmail(e.target.value);
    const emailReg = /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/;

    if (!emailReg.test(e.target.value)) {
      setEmailMessage("잘못된 이메일 형식입니다.");
      if(blankReg.test(e.target.value) === true) {
        setEmailMessage("공백 없이 입력해 주세요.");
      }
    } else {
      setEmailMessage("");
      setIsEmail(true);
    }
  }

  // 사용자 인증코드 받기
  const userVerifyCode = e => {
    setCheckNum(e.target.value)
  }
  // console.log(checkNum);

  // 인증번호 메일로 받기
  function getCheckNum() {
    if(!isEmail) {
      alert("이메일을 다시 확인 해주세요.");
    }
    axios.post('/verifyEmail', {
      userNumber: sessionStorage.getItem("userNumber"),
      userEmail: email
    })
      .then(response => {
        console.log('verifyEmail', response.data);
      }).catch(error => {
        console.log(error);
        alert("인증 에러1");
      })
  }

  // 이메일 인증 완료
  function completeCheckNum() {
    axios.post('/verifyCode', {
      userNumber: sessionStorage.getItem("userNumber"),
      verificationCode: checkNum,
    })
      .then(response => {
        if(response.data === 100) {
          alert("인증이 완료되었습니다.");
          console.log('verifyCode', response.data);
          navigate('/search/check/pw');
        }
      }).catch(error => {
        console.log(error);
        alert("인증 에러2");
      })
  }

  return(
    <ResetPwWrapper>
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
          <label>이메일</label>
        </LabelWrap> */}
        <div>
          <div className="flexbox">
            <Input id="email-input" type="text" name="userEmail" value={email} placeholder="이메일을 입력해주세요" onChange={userEmail} />
            <button id="certification" type="submit" onClick={getCheckNum}>인증번호 받기</button>
          </div>
          <div><ErrMsg style={emailMsgColor}>{emailMessage}</ErrMsg></div>
        </div>
      </ItemWrap>
      
      <ItemWrap>
        <div>
          <Input type="text" name="verificationCode" value={checkNum} placeholder="인증번호를 입력하세요" onChange={userVerifyCode}/>
        </div>
      </ItemWrap>

        <BtnBg type="submit" onClick={completeCheckNum}>다음</BtnBg>
    </ResetPwWrapper>
  )
}

const ResetPwWrapper = styled.div`
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

  div:nth-of-type(2) {
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

  div:nth-of-type(1),
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

  .flexbox {
    display: flex;
  }

  #email-input {
    width: calc(100% - 100px - 10px);
  }

  #certification {
    width: 100px;
    margin-left: 10px;
    color: #000;
    background-color: #fff;
    border: 1px solid #000;
    cursor: pointer;
    transition: all 0.3s;
    
    &:hover {
      background-color: #000;
      color: #fff;
      
    }
  }
`

const ErrMsg = styled.span`
  font-size: 14px;
`

export default ResetPwEmailChk;