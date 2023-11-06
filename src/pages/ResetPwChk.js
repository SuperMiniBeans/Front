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

  const [phoneNumMessage, setphoneNumMessage] = useState("");
  const [IdMessage, SetIdMessage] = useState("");
  const [phoneNumMsgColor, setPhoneNumMsgColor] = useState({color: "F82A2A"});
  const [idMsgColor, setIdMsgColor] = useState({color: "#F82A2A"});

  const navigate = useNavigate();

  // 사용자 이름 받기
  const userName = e => {
    setName(e.target.value);
  }

  // 사용자 아이디 받기
  const userId = e => {
    setId(e.target.value);

    const idReg = /^[A-Za-z0-9]{4,10}$/;
    if (!idReg.test(e.target.value)) {
      SetIdMessage("잘못된 아이디 형식입니다");
      setIdMsgColor({color: '#F82A2A'});

    } else {
      SetIdMessage("올바른 아이디 형식입니다");
      setIdMsgColor({color: '#84D270'});

    }
  }

  // 사용자 연락처 받기
  const userPhoneNumber = e => {
    setphoneNumber(e.target.value);
    const phonNumReg = /^01([0|1|6|7|8|9])([0-9]{3,4})([0-9]{4})$/;

    if (!phonNumReg.test(e.target.value)) {
      setphoneNumMessage("올바른 형식이 아닙니다");
      setPhoneNumMsgColor({color: '#F82A2A'});
    } else {
      setphoneNumMessage("올바르게 입력되었습니다");
      setPhoneNumMsgColor({color: '#84D270'});
    }
  }

  // 비밀번호 재설정 - 회원정보 확인
  function checkUserInfo() {
    axios.post('/searchPw', {
      userName: name,
      userId: id,
      userPhoneNumber: phoneNumber
    })
      .then(response => {
        if(response.data !== null ) {
          sessionStorage.setItem("user number", response.data);
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
  font-size: 14px;
`

export default ResetPwChk;