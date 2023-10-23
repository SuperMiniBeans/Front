import styled from "styled-components";
import { useState } from "react";
import axios from "axios";
// import { response } from "express";
import Post from "../components/Post";
import { CompleteBtn } from "../styles/ButtonStyle";
import { FlexBox } from "../styles/Layout";

function Join() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  // const [postcode, setPostcode] = useState("");
  // const [address, setAddress] = useState("");
  const [enroll_company, setEnroll_company] = useState({
    postcode: '',
    address: '',
  });
  const [detailAddress, setDetailAddress] = useState("");
  const [etcAddress, setEtcAddress] = useState("");
  const [phoneNumber, setphoneNumber] = useState("");

  const [emailMessage, setEmailMessage] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");
  const [passwordConfirmMessage, setPasswordConfirmMessage] = useState("");
  const [phoneNumMessage, setphoneNumMessage] = useState("");


  // 주소 검색창 팝업
  const [popup, setPopup] = useState(false);


  // 사용자 이름 받기
  const userName = e => {
    setName(e.target.value);
  }

  // 사용자 이메일 받기, 유효성 검사
  const userEmail = e => {
    setEmail(e.target.value);
    const emailReg = /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/;

    if (!emailReg.test(e.target.value)) {
      setEmailMessage("잘못된 이메일 형식입니다");
    } else {
      setEmailMessage("올바른 이메일 형식입니다");
    }
  }

  // 이메일 중복 체크
  // function checkEmail() {
  //   console.log(e.target.value);
  //   axios.get(' ')
  //     .then(response => {
  //       if(response === false) {
  //         alert('사용 가능한 아이디입니다');
  //       } else {
  //         alert('이미 사용중인 아이디입니다');
  //       }
  //     })
  // }

  // 사용자 비밀번호 받기, 유효성 검사
  const userPassword = e => {
    setPassword(e.target.value);
    const passwordReg = /^[A-Za-z0-9]{4,8}$/;

    if (!passwordReg.test(e.target.value)) {
      setPasswordMessage("잘못된 비밀번호 형식입니다");
    } else {
      setPasswordMessage("올바른 비밀번호 형식입니다");
    }
  }

  // 사용자 비밀번호 확인
  const userPasswordConfirm = e => {
    setPasswordConfirm(e.target.value);

    if(password !== e.target.value) {
      setPasswordConfirmMessage("입력한 비밀번호와 다릅니다");
    } else {
      setPasswordConfirmMessage("올바르게 입력되었습니다");
    }
  }
    
  // 주소 검색 관련
  const handleInput = (e) => {
    setEnroll_company({
      ...enroll_company,
      [e.target.name]: e.target.value,
    })
  }
  
  const handleComplete = (data) => {
    setPopup(!popup);
  }

  const userDetailAddress = e => {
    setDetailAddress(e.target.value);
  }

  const userEtcAddress = e => {
    setEtcAddress(e.target.value);
  }

  // 사용자 연락처 받기
  const userPhoneNumber = e => {
    setphoneNumber(e.target.value);
    const phonNumReg = /^01([0|1|6|7|8|9])([0-9]{3,4})([0-9]{4})$/;

    if (!phonNumReg.test(e.target.value)) {
      setphoneNumMessage("올바른 형식이 아닙니다");
    } else {
      setphoneNumMessage("올바르게 입력되었습니다");
    }
  }

  // 회원가입 버튼 클릭시 실행될 작업
  function SignUp() {
    axios.post('/join', {
      userName: name,
      userEmail: email,
      userPassword: password,
      address: enroll_company,
      userPhoneNumber: phoneNumber,
    })
      .then(response => {
        alert(response.status + " 회원가입이 완료되었습니다.");
        console.log(name, email, password, phoneNumber);
      }).catch(error => {
        alert(error);
        console.log(name, email, password, phoneNumber);
      });
  }

  return (
    <JoinWrapper>
      <div className="Join">
        <h2 style={{textAlign: 'center'}}>회원가입</h2>

        <FormWrap action="/join" method="POST">
          <ItemWrap>
            <div>
              <label>이름</label>
            </div>
            <div>
              <Input type="text" value={name} placeholder="이름을 입력하세요" onChange={userName}></Input>
            </div>
          </ItemWrap>

          <ItemWrap className="ItemWrap">
            <div>
              <label>이메일</label>
            </div>
            <div>
              <FlexBox>
                <Input type="text" value={email} placeholder="이메일 입력 후 중복확인 버튼을 눌러주세요" onChange={userEmail}></Input>
                <button style={{width: '90px'}}>중복확인</button>
              </FlexBox>
              <div><span>{emailMessage}</span></div>
            </div>
          </ItemWrap>

          <ItemWrap>
            <div>
              <label>비밀번호</label>
            </div>
            <div>
              <Input
                type="password" value={password} placeholder="영문,숫자를 조합하여 4~8자리로 입력해주세요" maxLength={8} onChange={userPassword} ></Input>
              <div><span>{passwordMessage}</span></div>
            </div>
          </ItemWrap>

          <ItemWrap>
            <div>
              <label>비밀번호 확인</label>
            </div>
            <div>
              <Input
                type="password" value={passwordConfirm} placeholder="비밀번호를 다시 입력해주세요" maxLength={8} onChange={userPasswordConfirm}></Input>
              <div><span>{passwordConfirmMessage}</span></div>
            </div>
          </ItemWrap>

          <ItemWrap>
            <div>
              <label>우편번호</label>
            </div>
            <div>
              <FlexBox>
                <Input type="number" value={enroll_company.postcode} placeholder="우편번호를 검색하세요" onChange={handleInput} readOnly></Input>
                <button onClick={handleComplete} style={{width: '120px'}}>우편번호 검색</button>
              </FlexBox>
              {popup && <Post company={enroll_company} setcompany={setEnroll_company}></Post>}
            </div>
          </ItemWrap>

          <ItemWrap>
            <div>
              <label>주소</label>
            </div>
            <div>
              <Input type="text" value={enroll_company.address} onChange={handleInput} readOnly></Input>
            </div>
          </ItemWrap>

          <ItemWrap>
            <div>
              <label>상세주소</label>
            </div>
            <div>
              <Input type="text" value={detailAddress} placeholder="상세주소를 입력해주세요" onChange={userDetailAddress} ></Input>
            </div>
          </ItemWrap>

          <ItemWrap>
            <div>
              <label>참고항목</label>
            </div>
            <div>
              <Input type="text" value={etcAddress} onChange={userEtcAddress}></Input>
            </div>
          </ItemWrap>
          
          <ItemWrap>
            <div>
              <label>휴대폰 번호</label>
            </div>
            <div>
              <Input type="text" value={phoneNumber} placeholder="숫자만 입력해주세요" onChange={userPhoneNumber} ></Input>
              <div><span>{phoneNumMessage}</span></div>
            </div>
          </ItemWrap>
        </FormWrap>

        <br /><br />

        <CompleteBtn type="submit" onClick={SignUp}>회원가입</CompleteBtn>
      </div>
    </JoinWrapper>
  );
}

/* 스타일 정의 */
const JoinWrapper = styled.div`
  width: 400px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  flex-direction: column;
`;

const FormWrap = styled.div`
  display: flex;
  flex-direction: column;
`;

const ItemWrap = styled.div`
  height: 88px;
`

const Input = styled.input`
  width: 100%;
  height: 40px;
  margin-bottom: 4px;
  padding-left: 10px;
  border: 1px solid #aaa;
`

export default Join;

