import styled from "styled-components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BtnBg, BtnBorder } from "../styles/ButtonStyle";

function SearchId() {
  const [name, setName] = useState("");
  const [phoneNumber, setphoneNumber] = useState("");

  const [nameMessage, SetNameMessage] = useState("");
  const [phoneNumMessage, setphoneNumMessage] = useState("");
  const [nameMsgColor, setNameMsgColor] = useState({color: "#F82A2A"});
  const [phoneNumMsgColor, setPhoneNumMsgColor] = useState({color: "#F82A2A"});

  const [isName, setIsName] = useState(false);
  const [isPhoneNumber, setIsPhoneNumber] = useState(false);

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
      setIsName(false);
      if(blankReg.test(e.target.value) === true) {
        SetNameMessage("공백 없이 입력해 주세요.");
        setNameMsgColor({color: '#F82A2A'});
        setIsName(false);
      }
    } else {
      SetNameMessage("");
      setIsName(true);
    }
  }

  // 사용자 연락처 받기
  const userPhoneNumber = e => {
    setphoneNumber(e.target.value);
    const phonNumReg = /^01([0|1|6|7|8|9])([0-9]{3,4})([0-9]{4})$/;

    if (!phonNumReg.test(e.target.value)) {
      setphoneNumMessage("올바른 형식이 아닙니다");
      setPhoneNumMsgColor({color: '#F82A2A'});
      if(blankReg.test(e.target.value) === true) {
        setphoneNumMessage("공백 없이 입력해 주세요.");
        setPhoneNumMsgColor({color: '#F82A2A'});
      }
    } else {
      setphoneNumMessage("");
      setIsPhoneNumber(true);
    }
  }

  // 비밀번호 재설정 페이지로 이동
  function goResetPwChk() {
    navigate('/search/check');
  }

  // 아이디 찾기 버튼 클릭시 실행될 작업
  function onSearchId() {
    if(isName && isPhoneNumber !== true) {
      alert("입력한 정보를 다시 확인해주세요.");
    }
    axios.post('/searchId', {
      userName: name,
      userPhoneNumber: phoneNumber,
    })
    .then(response => {
      alert(`${name}님의 아이디 입니다. 확인을 누르면 로그인 페이지로 이동합니다. \n ID: ` + response.data);
      navigate('/login');
    }).catch(error => {
      console.log(error, name, phoneNumber);
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
          <div><ErrMsg style={nameMsgColor}>{nameMessage}</ErrMsg></div>
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
  font-size: 12px;
`

const SbmtBtnWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 90px;
  margin-top: 6px;
` 

export default SearchId;