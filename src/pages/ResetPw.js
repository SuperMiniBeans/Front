import styled from "styled-components";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BtnBg } from "../styles/ButtonStyle";

function ResetPw() {
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const [passwordMessage, setPasswordMessage] = useState("");
  const [passwordConfirmMessage, setPasswordConfirmMessage] = useState("");
  const [pswMsgColor, setPswMsgColor] = useState({color: "#F82A2A"});
  const [pswConfirmMsgColor, setPswConfirmMsgColor] = useState({color: "#F82A2A"});

  const [isPassword, setIsPassword] = useState(false);
  const [isPasswordConfirm, setIsPasswordConfirm] = useState(false);

  const navigate = useNavigate();

  //문자열에 공백이 있는 경우
  let blankReg = /[\s]/g;

  // 사용자 비밀번호 받기, 유효성 검사
  const userPassword = e => {
    setPassword(e.target.value);
    const passwordReg = /^[A-Za-z0-9]{4,8}$/;

    if (!passwordReg.test(e.target.value)) {
      setPasswordMessage("비밀번호는 4~8자의 영문 대소문자와 숫자로만 입력해주세요.");
      if(blankReg.test(e.target.value) === true) {
        setPasswordMessage("공백 없이 입력해 주세요.");
      }
    } 
    else {
      setPasswordMessage("");
      setIsPassword(true);
    }
  }

  // 사용자 비밀번호 확인
  const userPasswordConfirm = e => {
    setPasswordConfirm(e.target.value);

    if(password !== e.target.value) {
      setPasswordConfirmMessage("입력한 비밀번호와 다릅니다.");
      if(blankReg.test(e.target.value) === true) {
        setPasswordConfirmMessage("공백 없이 입력해 주세요.");
      }
    } else {
      setPasswordConfirmMessage("");
      setIsPasswordConfirm(true);
    }
  }

  // 비밀번호 재설정 - 새로운 비밀번호 입력
  function updatePw() {
    if(isPassword && isPasswordConfirm !== true) {
      alert("입력한 정보를 다시 확인 해주세요.");
    }
    axios.post('/modifyPw', {
      userPassword: password,
      userNumber: sessionStorage.getItem("userNumber"),
    })
      .then(response => {
        if(password === passwordConfirm) {
          alert("비밀번호 변경이 완료되었습니다. 확인을 누르면 로그인 페이지로 이동합니다.");
          console.log(response.data);
          navigate('/login');
        }
      }).catch(error => {
        alert(error);
        alert("입력한 정보를 다시 확인해주세요.");
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
          <LabelWrap>
            <label>새로운 비밀번호 입력</label>
          </LabelWrap>
          <div>
            <Input
              type="password" name="userPassword" value={password} placeholder="4~8자의 영문 대소문자와 숫자로만 입력해주세요" maxLength={8} onChange={userPassword} ></Input>
            <div><ErrMsg style={pswMsgColor}>{passwordMessage}</ErrMsg></div>
          </div>
        </ItemWrap>

        <ItemWrap>
          <LabelWrap>
            <label>비밀번호 확인</label>
          </LabelWrap>
          <div>
            <Input
              type="password" value={passwordConfirm} placeholder="비밀번호를 다시 입력해주세요" maxLength={8} onChange={userPasswordConfirm}></Input>
            <div><ErrMsg style={pswConfirmMsgColor}>{passwordConfirmMessage}</ErrMsg></div>
          </div>
        </ItemWrap>

        <BtnBg type="submit" onClick={updatePw}>확인</BtnBg>
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

  div:nth-of-type(3) {
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
  div:nth-of-type(2) {
    color: #aaa;
  }
`

const LabelWrap = styled.div`
  margin-bottom: 4px;
  font-weight: 600;
`

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
  font-size: 14px;
`

export default ResetPw;