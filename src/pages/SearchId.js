import styled from "styled-components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BtnBg, BtnBorder } from "../styles/ButtonStyle";

function SearchId() {
  const [name, setName] = useState("");
  const [phoneNumber, setphoneNumber] = useState("");

  const [phoneNumMessage, setphoneNumMessage] = useState("");
  const [phoneNumMsgColor, setPhoneNumMsgColor] = useState({color: "#F82A2A"});

  const navigate = useNavigate();


  // 사용자 이름 받기
  const userName = e => {
    setName(e.target.value);
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

  // 비밀번호 재설정 페이지로 이동
  function goResetPwChk() {
    navigate('/search/check');
  }

  // 아이디 찾기 버튼 클릭시 실행될 작업
  function onSearchId() {
    axios.post('/searchId', {
      userName: name,
      userPhoneNumber: phoneNumber
    })
      .then(response => {
        if(
          response.data.userName === name && 
          response.data.userPhoneNumber === phoneNumber
        ) {
          alert(response.data.userId);
        }
      }).catch(error => {
        console.log(error, name, phoneNumber);
        alert(error);
        alert("일치하는 회원 정보가 없습니다.");
      });
  }

  return(
    <SearchIdWrapper>
      <TitleWrap><h2>아이디 찾기</h2></TitleWrap>

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
          <label>휴대폰 번호</label>
        </LabelWrap>
        <div>
          <Input type="text" name="userPhoneNumber" value={phoneNumber} placeholder="숫자만 입력해주세요" onChange={userPhoneNumber} ></Input>
          <div><ErrMsg style={phoneNumMsgColor}>{phoneNumMessage}</ErrMsg></div>
        </div>
      </ItemWrap>

      <SbmtBtnWrap>
        <BtnBg type="submit" onClick={onSearchId}>확인</BtnBg>
        <BtnBorder type="submit" onClick={goResetPwChk}>비밀번호 재설정</BtnBorder>
      </SbmtBtnWrap>

    </SearchIdWrapper>
  )
}

const SearchIdWrapper = styled.div`
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

const SbmtBtnWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 90px;
  margin-top: 6px;
` 

export default SearchId;