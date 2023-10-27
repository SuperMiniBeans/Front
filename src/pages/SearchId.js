import styled from "styled-components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function SearchId() {
  const [name, setName] = useState("");
  const [phoneNumber, setphoneNumber] = useState("");

  const [phoneNumMessage, setphoneNumMessage] = useState("");
  const [phoneNumMsgColor, setPhoneNumMsgColor] = useState({color: "F82A2A"});

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

  function onSearchId() {
    axios.post('/login', {
      userName: name,
      userPhoneNumber: phoneNumber
    })
      .then(response => {
        alert(response.status + "로그인이 완료되었습니다.");
        console.log(name, phoneNumber);
        navigate('/');
      }).catch(error => {
        console.log(name, phoneNumber);
        alert(error);
        alert("일치하는 회원 정보가 없습니다.");
      });
  }

  return(
    <SearchIdWrapper>
      <div>아이디 찾기</div>

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

      <div>
        <div><button type="submit" onClick={onSearchId}>확인</button></div>
        <div><button type="submit" onClick={() => navigate('/search/pw/check')}>비밀번호 재설정</button></div>
      </div>


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

export default SearchId;