import styled from "styled-components";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BtnBg } from "../styles/ButtonStyle";
import { FlexBox } from "../styles/Layout";
import PostCodeModal from "../components/PostCodeModal";

function Join() {
  const navigate = useNavigate();

  // 사용자 정보
  const [name, setName] = useState("");
  const [id, setId] = useState("");
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
  const [nameMessage, SetNameMessage] = useState("");
  const [idMessage, SetIdMessage] = useState("");
  const [emailMessage, setEmailMessage] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");
  const [passwordConfirmMessage, setPasswordConfirmMessage] = useState("");
  const [phoneNumMessage, setphoneNumMessage] = useState("");
  // 에러 메세지 색상
  const [nameMsgColor, setNameMsgColor] = useState({color: "#F82A2A"});
  const [idMsgColor, setIdMsgColor] = useState({color: "#F82A2A"});
  const [emailMsgColor, setEmailMsgColor] = useState({color: "#F82A2A"});
  const [pswMsgColor, setPswMsgColor] = useState({color: "#F82A2A"});
  const [pswConfirmMsgColor, setPswConfirmMsgColor] = useState({color: "#F82A2A"});
  const [phoneNumMsgColor, setPhoneNumMsgColor] = useState({color: "#F82A2A"});

  // 유효성 검사
  const [isName, setIsName] = useState(false);
  const [isId, setIsId] = useState(false);
  const [isUsingId, setIsUsingId] = useState(false)
  const [isEmail, setIsEmail] = useState(false);
  const [isPassword, setIsPassword] = useState(false);
  const [isPasswordConfirm, setIsPasswordConfirm] = useState(false);
  const [isPhoneNumber, setIsphoneNumber] = useState(false); 

  // 주소 검색창 팝업
  const [popup, setPopup] = useState(false);

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

  // 사용자 아이디 받기
  const idReg = /^[a-z0-9]{2,10}$/;

  const userId = e => {
    setId(e.target.value);

    if(!idReg.test(e.target.value)) {
      SetIdMessage("2~10자의 영문 소문자, 숫자를 사용해 주세요.");
      setIdMsgColor({color: '#F82A2A'});
      setIsId(false);
      if(blankReg.test(e.target.value) === true) {
        SetIdMessage("공백 없이 입력해 주세요.");
        setIdMsgColor({color: '#F82A2A'});
        setIsId(false);
      }
    } 
    else {
      SetIdMessage("")
      setIsId(true);
    }
  }

  // 아이디 중복 확인
  function checkId() {
    if(id === "") {
      alert("아이디를 입력해주세요.");
      setIsUsingId(false);
    } else if(!idReg.test(id)) {
      alert("2~10자의 영문 소문자, 숫자를 사용해 주세요.");
      setIsId(false);
      setIsUsingId(false);

      if(blankReg.test(id) === true) {
        alert("공백 없이 입력해 주세요.");
        setIdMsgColor({color: '#F82A2A'});
        setIsId(false);
        setIsUsingId(false);
      }
    }
    else {
      axios.post('/checkId', {
        userId: id
      })
        .then(response => {
          if(response.data === 1) {
            console.log(response.data);
            alert("이미 사용중인 아이디 입니다.");
            setIsUsingId(false);
          } 
          else {
            alert("사용 가능한 아이디 입니다.");
            console.log(response.data);
            setIsUsingId(true);
          }
        }).catch(error => {
          alert(error);
        })
    }
  }

  // 사용자 이메일 받기, 유효성 검사
  const userEmail = e => {
    setEmail(e.target.value);
    const emailReg = /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/;

    if (!emailReg.test(e.target.value)) {
      setEmailMessage("잘못된 이메일 형식입니다.");
      setEmailMsgColor({color: '#F82A2A'});
      setIsEmail(false);
      if(blankReg.test(e.target.value) === true) {
        setEmailMessage("공백 없이 입력해 주세요.");
        setEmailMsgColor({color: '#F82A2A'});
        setIsEmail(false);
      }
    } else {
      setEmailMessage("");
      setIsEmail(true);
    }
  }
  
  // 사용자 비밀번호 받기, 유효성 검사
  const userPassword = e => {
    setPassword(e.target.value);
    const passwordReg = /^[A-Za-z0-9]{4,8}$/;

    if (!passwordReg.test(e.target.value)) {
      setPasswordMessage("비밀번호는 4~8자의 영문 대소문자와 숫자로만 입력해주세요.");
      setPswMsgColor({color: '#F82A2A'});
      setIsPassword(false);
      if(blankReg.test(e.target.value) === true) {
        setPasswordMessage("공백 없이 입력해 주세요.");
        setPswMsgColor({color: '#F82A2A'});
        setIsPassword(false);
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
      setPswConfirmMsgColor({color: '#F82A2A'});
      setIsPasswordConfirm(false);
    } else {
      setPasswordConfirmMessage("");
      setIsPasswordConfirm(true);
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
      setphoneNumMessage("올바른 형식이 아닙니다.");
      setPhoneNumMsgColor({color: '#F82A2A'});
      setIsphoneNumber(false);
    } else {
      setphoneNumMessage("");
      setIsphoneNumber(true);
    }
  }

  // 유효성 all true
  let allTrue = isName && isId && isUsingId && isEmail && isPassword && isPasswordConfirm && isPhoneNumber === true;

  // 회원가입 버튼 클릭시 실행될 작업
  function SignUp() {

    if (
      //미입력 확인
      name === "" ||
      id === "" ||
      email === "" ||
      password === "" ||
      passwordConfirm === "" ||
      enroll_company.postcode === "" ||
      enroll_company.address1 === "" ||
      address2 === "" ||
      phoneNumber === ""
    ) {
      alert("빠진 정보를 입력해주세요.");
    }
    if(!isUsingId) {
      alert("아이디 중복 검사를 해주세요.");
    }
    if(!allTrue) {
      alert("입력한 정보를 다시 확인 해주세요.");
      console.log(isName, isId, isUsingId, isEmail, isPassword, isPasswordConfirm, isPhoneNumber);
    }
    else {
      axios.post('/join', {
        userName: name,
        userId: id,
        userPassword: password,
        userEmail: email,
        userAddressNumber: enroll_company.postcode,
        userAddress1: enroll_company.address1,
        userAddress2: address2,
        userAddress3: enroll_company.address3,
        userPhoneNumber: phoneNumber,
      })
        .then(response => {
          console.log(allTrue);
          console.log('성공',response, response.data, isName, isId, `아이디 중복:`+isUsingId, isEmail, isPassword, isPasswordConfirm, isPhoneNumber);
          alert(response.status + "회원가입이 완료되었습니다.");
          navigate('/join/joincomplete');
        }).catch(error => {
          alert(error);
          console.log('실패', isName, isId, isUsingId, isEmail, isPassword, isPasswordConfirm, isPhoneNumber);
        });
    }
  }

  return (
    <JoinWrapper>
      <TitleCenter><h2>회원가입</h2></TitleCenter>

      <FormWrap action="/join" method="POST">
        <ItemWrap>
          <LabelWrap>
            <label>이름</label>
          </LabelWrap>
          <div>
            <Input type="text" name="userName" value={name} placeholder="이름을 입력하세요" maxLength={6} onChange={userName}></Input>
            <div><ErrMsg style={nameMsgColor}>{nameMessage}</ErrMsg></div>
          </div>
        </ItemWrap>

        <ItemWrap>
          <LabelWrap>
            <label>아이디</label>
          </LabelWrap>
          <div>
            <FlexBox>
              <IdInput type="text" name="userId" value={id} placeholder="아이디를 입력하세요" maxLength={8} onChange={userId}></IdInput>
              <IdChkBtn onClick={checkId}>중복확인</IdChkBtn>
            </FlexBox>
            <div><ErrMsg style={idMsgColor}>{idMessage}</ErrMsg></div>
          </div>
        </ItemWrap>

        <ItemWrap>
          <LabelWrap>
            <label>이메일</label>
          </LabelWrap>
          <div>
            <Input type="text" name="userEmail" value={email} placeholder="이메일을 입력해주세요" onChange={userEmail}></Input>
            <div><ErrMsg style={emailMsgColor}>{emailMessage}</ErrMsg></div>
          </div>
        </ItemWrap>

        <ItemWrap>
          <LabelWrap>
            <label>비밀번호</label>
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

        <ItemWrap>
          <LabelWrap>
            <label>우편번호</label>
          </LabelWrap>
          <div>
            <FlexBox>
              <PostcodeInput type="number" name="userAddressNumber" value={enroll_company.postcode} placeholder="우편번호를 검색하세요" onChange={handleInput} readOnly></PostcodeInput>
              <AdrSearchBtn onClick={handleComplete}>우편번호 검색</AdrSearchBtn>
            </FlexBox>
            {popup && <PostCodeModal company={enroll_company} setcompany={setEnroll_company}></PostCodeModal>}
          </div>
        </ItemWrap>

        <ItemWrap>
          <LabelWrap>
            <label>주소</label>
          </LabelWrap>
          <div>
            <Input type="text" name="userAddress1" value={enroll_company.address1} onChange={handleInput} readOnly></Input>
          </div>
        </ItemWrap>

        <ItemWrap>
          <LabelWrap>
            <label>상세주소</label>
          </LabelWrap>
          <div>
            <Input type="text" name="userAddress2" value={address2} placeholder="상세주소를 입력해주세요" onChange={userAddress2} ></Input>
          </div>
        </ItemWrap>

        <ItemWrap>
          <LabelWrap>
            <label>참고항목</label>
          </LabelWrap>
          <div>
            <Input type="text" name="userAddress3" value={enroll_company.address3} onChange={handleInput}></Input>
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
      </FormWrap> 

      <JoinBtn type="submit" onClick={SignUp}>회원가입</JoinBtn>
    </JoinWrapper>
  )
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
  height: 88px;
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

const ErrMsg = styled.span`
  font-size: 12px;
`

const IdInput = styled.input`
  width: 300px;
  height: 40px;
  padding-left: 10px;
  border: 1px solid #aaa;
`

const IdChkBtn = styled(BtnBg)`
  margin-left: 10px;
  width: 120px;
`

const PostcodeInput = styled.input`
  width: 254px;
  height: 40px;
  padding-left: 10px;
  border: 1px solid #aaa;
`

const AdrSearchBtn = styled(BtnBg)`
  margin-left: 10px;
  width: 136px;
`

const JoinBtn = styled(BtnBg)`
  width: 100%;
`

export default Join;

