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

  const navigate = useNavigate();

  // 사용자 비밀번호 받기, 유효성 검사
  const userPassword = e => {
    setPassword(e.target.value);
    const passwordReg = /^[A-Za-z0-9]{4,8}$/;

    if (!passwordReg.test(e.target.value)) {
      setPasswordMessage("비밀번호는 4~8자의 영문 대소문자와 숫자로만 입력해주세요");
      setPswMsgColor({color: '#F82A2A'});
    } else {
      setPasswordMessage("올바른 비밀번호 형식입니다");
      setPswMsgColor({color: '#84D270'});
    }
  }

  // 사용자 비밀번호 확인
  const userPasswordConfirm = e => {
    setPasswordConfirm(e.target.value);

    if(password !== e.target.value) {
      setPasswordConfirmMessage("입력한 비밀번호와 다릅니다");
      setPswConfirmMsgColor({color: '#F82A2A'});

    } else {
      setPasswordConfirmMessage("올바르게 입력되었습니다");
      setPswConfirmMsgColor({color: '#84D270'});
    }
  }

    // 비밀번호 재설정 - 새로운 비밀번호 입력
    function updatePw() {
      axios.post('/modifyPw', {
        userPassword: password,
        userNumber: sessionStorage.getItem("user numuber"),
      })
        .then(response => {
          if(password === passwordConfirm) {
            alert("비밀번호 변경이 완료되었습니다.");
            
            console.log(response.data);
            navigate('/');

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
          <div>회원 정보 확인</div>
          <div>{">"}</div>
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
  // background-color: pink;

  div:first-child {
    color: #aaa;
  }

  div:nth-child(2) {
    width: 20px; 
    height: 20px;
    color: #aaa;
  }

  // div:nth-child(2)::after {
  //   position: absolute;
  //   left: 50%; top: 50%;
  //   content: '';
  //   width: 10px; /* 사이즈 */
  //   height: 10px; /* 사이즈 */
  //   border-top: 2px solid #aaa; /* 선 두께 */
  //   border-right: 2px solid #aaa; /* 선 두께 */
  //   transform: rotate(45deg); /* 각도 */
  //   background-color: red;
  // }

  div:last-child {
    font-weight: 600;
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