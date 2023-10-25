import styled from "styled-components";
import { useState } from "react";
import axios from "axios";
// import { response } from "express";
import { BtnBg } from "../styles/ButtonStyle";
import { FlexBox } from "../styles/Layout";
import Post from "../components/Post";

function Join() {
  // 사용자 정보
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [enroll_company, setEnroll_company] = useState({
    postcode: '',
    address1: '',
    address3: '',
  });
  const [address2, setAddress2] = useState("");
  const [phoneNumber, setphoneNumber] = useState("");

  // 에러 메세지
  const [emailMessage, setEmailMessage] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");
  const [passwordConfirmMessage, setPasswordConfirmMessage] = useState("");
  const [phoneNumMessage, setphoneNumMessage] = useState("");
  // const [msgColor, setMsgColor] = useState("green");

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
  function checkEmail() {
    axios.get('/join')
      .then(response => {
        if(response.data === 1) {
          alert('이미 사용중인 아이디입니다');
        } else {
          alert('사용 가능한 아이디입니다');
        }
      })
  }

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
          [e.target.name]:e.target.value,
      })
  }
  
  const handleComplete = (data) => {
    setPopup(!popup);
  }

  // 사용자 상세주소 받기
  const userAddress2 = e => {
    setAddress2(e.target.value);
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
    if (
      //입력칸 공백 확인
      name === "" ||
      email === "" ||
      password === "" ||
      passwordConfirm === "" ||
      enroll_company.postcode === "" ||
      enroll_company.address1 === "" ||
      address2 === "" ||
      phoneNumber === "" 
    ) {
      alert("정보를 입력해주세요.");
    } else {
      axios.post('/join', {
        userName: name,
        userEmail: email,
        userPassword: password,
        userAddressNumber: enroll_company.postcode,
        userAddress1: enroll_company.address1,
        userAddress2: address2,
        userAddress3: enroll_company.address3,
        userPhoneNumber: phoneNumber,
      })
        .then(response => {
          alert(response.status + " 회원가입이 완료되었습니다.");
          console.log('성공','이름:'+ name, '이메일:'+email,'비밀번호:'+password, '우편번호:'+enroll_company.postcode, '주소:'+enroll_company.address1, '상세주소:'+address2, '참고항목:'+enroll_company.address3, '휴대폰 번호:'+phoneNumber);
        }).catch(error => {
          alert(error);
          console.log('실패', '이름:'+ name, '이메일:'+email,'비밀번호:'+password, '우편번호:'+enroll_company.postcode, '주소:'+enroll_company.address1, '상세주소:'+address2, '참고항목:'+enroll_company.address3, '휴대폰 번호:'+phoneNumber);
        });
    }
  }

  return (
    <JoinWrapper>
      <div className="Join">
        <TitleCenter><h2>회원가입</h2></TitleCenter>

        <FormWrap action="/join" method="POST">
          <ItemWrap>
            <div>
              <label>이름</label>
            </div>
            <div>
              <Input type="text" name="userName" value={name} placeholder="이름을 입력하세요" onChange={userName}></Input>
            </div>
          </ItemWrap>

          <ItemWrap className="ItemWrap">
            <div>
              <label>이메일</label>
            </div>
            <div>
              <FlexBox>
                <EmailInput type="text" name="userEmail" value={email} placeholder="이메일을 입력해주세요" onChange={userEmail}></EmailInput>
                <EmailChkBtn onClick={checkEmail} style={{width: '90px'}}>중복확인</EmailChkBtn>
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
                type="password" name="userPassword" value={password} placeholder="영문,숫자를 조합하여 4~8자리로 입력해주세요" maxLength={8} onChange={userPassword} ></Input>
              <div><span>{passwordMessage}</span></div>
            </div>
          </ItemWrap>

          <ItemWrap>
            <div>
              <label>비밀번호 확인</label>
            </div>
            <div>
              <Input
                type="password" name="userPasswordConfirm" value={passwordConfirm} placeholder="비밀번호를 다시 입력해주세요" maxLength={8} onChange={userPasswordConfirm}></Input>
              <div><span>{passwordConfirmMessage}</span></div>
            </div>
          </ItemWrap>

          <ItemWrap>
            <div>
              <label>우편번호</label>
            </div>
            <div>
              <FlexBox>
                <PostcodeInput type="number" name="userAddressNumber" value={enroll_company.postcode} placeholder="우편번호를 검색하세요" onChange={handleInput} readOnly></PostcodeInput>
                <AdrSearchBtn onClick={handleComplete} style={{width: '120px'}}>우편번호 검색</AdrSearchBtn>
              </FlexBox>
              {popup && <Post company={enroll_company} setcompany={setEnroll_company}></Post>}
            </div>
          </ItemWrap>

          <ItemWrap>
            <div>
              <label>주소</label>
            </div>
            <div>
              <Input type="text" name="userAddress1" value={enroll_company.address1} onChange={handleInput} readOnly></Input>
            </div>
          </ItemWrap>

          <ItemWrap>
            <div>
              <label>상세주소</label>
            </div>
            <div>
              <Input type="text" name="userAddress2" value={address2} placeholder="상세주소를 입력해주세요" onChange={userAddress2} ></Input>
            </div>
          </ItemWrap>

          <ItemWrap>
            <div>
              <label>참고항목</label>
            </div>
            <div>
              <Input type="text" name="userAddress3" value={enroll_company.address3} onChange={handleInput}></Input>
            </div>
          </ItemWrap>
          
          <ItemWrap>
            <div>
              <label>휴대폰 번호</label>
            </div>
            <div>
              <Input type="text" name="userPhoneNumber" value={phoneNumber} placeholder="숫자만 입력해주세요" onChange={userPhoneNumber} ></Input>
              <div><span>{phoneNumMessage}</span></div>
            </div>
          </ItemWrap>
        </FormWrap>

        <JoinBtn type="submit" onClick={SignUp}>회원가입</JoinBtn>
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
`

const TitleCenter = styled.div`
  margin-bottom: 30px;
  text-align: center;
`

const FormWrap = styled.div`
  display: flex;
  flex-direction: column;
`;

const ItemWrap = styled.div`
  height: 80px;
`

const Input = styled.input`
  width: 100%;
  height: 40px;
  padding-left: 10px;
  border: 1px solid #aaa;
`

const EmailInput = styled.input`
  width: 300px;
  height: 40px;
  padding-left: 10px;
  border: 1px solid #aaa;
`

const EmailChkBtn = styled(BtnBg)`
margin-left: 10px;
  width: 120px;
`

const PostcodeInput = styled.input`
  width: 270px;
  height: 40px;
  padding-left: 10px;
  border: 1px solid #aaa;
`

const AdrSearchBtn = styled(BtnBg)`
  margin-left: 10px;
  width: 120px;
`

const JoinBtn = styled(BtnBg)`
  width: 100%;
`

export default Join;

