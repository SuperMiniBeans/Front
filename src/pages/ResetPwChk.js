import styled from "styled-components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FlexBox } from "../styles/Layout";
import axios from "axios";
import { BtnBg } from "../styles/ButtonStyle";

function ResetPwChk() {
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [phoneNumber, setphoneNumber] = useState("");

  const [nameMessage, SetNameMessage] = useState("");
  const [phoneNumMessage, setphoneNumMessage] = useState("");
  const [nameMsgColor, setNameMsgColor] = useState({color: "#F82A2A"});
  const [IdMessage, SetIdMessage] = useState("");
  const [phoneNumMsgColor, setPhoneNumMsgColor] = useState({color: "F82A2A"});
  const [idMsgColor, setIdMsgColor] = useState({color: "#F82A2A"});

  const [isName, setIsName] = useState(false);
  const [isId, setIsId] = useState(false);
  const [isPhoneNumber, setIsphoneNumber] = useState(false); 

  const navigate = useNavigate();

  //문자열에 공백이 있는 경우
  let blankReg = /[\s]/g;

  // 사용자 이름 받기
  const userName = e => {
    setName(e.target.value);
    const nameReg = /^[가-힣]{2,5}$/;

    if(!nameReg.test(e.target.value)) {
      SetNameMessage("한글을 사용하여 입력해 주세요(자음 불가능).");
      setNameMsgColor({color: '#F82A2A'});
      if(blankReg.test(e.target.value) === true) {
        SetNameMessage("공백 없이 입력해 주세요.");
        setNameMsgColor({color: '#F82A2A'});
      }
    } else {
      SetNameMessage("");
      setIsName(true);
    }
  }

  // 사용자 아이디 받기
  const idReg = /^[a-z0-9]{2,10}$/;

  const userId = e => {
    setId(e.target.value);

    if(!idReg.test(e.target.value)) {
      SetIdMessage("2~10자의 영문 소문자, 숫자를 사용해 주세요.");
      setIdMsgColor({color: '#F82A2A'});
      if(blankReg.test(e.target.value) === true) {
        SetIdMessage("공백 없이 입력해 주세요.");
        setIdMsgColor({color: '#F82A2A'});
      }
    } 
    else {
      SetIdMessage("")
      setIsId(true);
    }
  }

  // 사용자 연락처 받기
  const userPhoneNumber = e => {
    setphoneNumber(e.target.value);
    const phonNumReg = /^01([0|1|6|7|8|9])([0-9]{3,4})([0-9]{4})$/;

    if (!phonNumReg.test(e.target.value)) {
      setphoneNumMessage("올바른 형식이 아닙니다.");
      setPhoneNumMsgColor({color: '#F82A2A'});
      setIsphoneNumber(false);
    } else {
      setphoneNumMessage("");
      setIsphoneNumber(true);
    }
  }

  // 비밀번호 재설정 - 회원정보 확인
  function checkUserInfo() {
    if(isName && isId && isPhoneNumber !== true) {
      alert("입력한 정보를 다시 확인 해주세요.");
    }
    axios.post('/searchPw', {
      userName: name,
      userId: id,
      userPhoneNumber: phoneNumber,
      userNumber: sessionStorage.getItem("userNumber")
    })
      .then(response => {
        if(response.data !== null ) {
          sessionStorage.setItem("userNumber", response.data);
          console.log(response.data);
          navigate('/search/check/pw');
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
          <div>회원 정보 확인</div>
          <span></span>
          <div>비밀번호 재설정</div>
        </ResetPwStep>
      </TitleWrap>
      
      <ItemWrap>
        <LabelWrap>
          <label>이름</label>
        </LabelWrap>
        <div>
          <Input type="text" name="userName" value={name} placeholder="이름을 입력하세요" onChange={userName}></Input>
          <div><ErrMsg style={nameMsgColor}>{nameMessage}</ErrMsg></div>
        </div>
      </ItemWrap>

      <ItemWrap>
        <LabelWrap>
          <label>아이디</label>
        </LabelWrap>
        <div>
          <FlexBox>
            <Input type="text" name="userId" value={id} placeholder="아이디를 입력하세요" maxLength={8} onChange={userId}></Input>
          </FlexBox>
          <div><ErrMsg style={idMsgColor}>{IdMessage}</ErrMsg></div>
        </div>
      </ItemWrap>

      <ItemWrap>
        <LabelWrap>
          <label>휴대폰 번호</label>
        </LabelWrap>
        <div>
          <Input type="text" name="userPhoneNumber" value={phoneNumber} placeholder="숫자만 입력해주세요" onChange={userPhoneNumber} ></Input>
          <div><ErrMsg style={phoneNumMsgColor}>{phoneNumMessage}</ErrMsg></div>
        </div>
      </ItemWrap>

      <BtnBg type="submit" onClick={checkUserInfo}>확인</BtnBg>
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

  div:last-child {
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
  font-size: 12px;
`

export default ResetPwChk;