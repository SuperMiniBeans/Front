import styled from "styled-components";
import { useState } from "react";
import axios from "axios";
import Post from "../components/Post";

const Wrapper = styled.div`
  width: 400px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  background-color: pink;
`;

const FormWrap = styled.div`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  width: 100%;
  height: 40px;
  border: 1px solid #aaa;
`

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


  const [popup, setPopup] = useState(false);




  const userName = e => {
    setName(e.target.value);
  }

  const userEmail = e => {
    setEmail(e.target.value);
    const emailReg = /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/;

    if (!emailReg.test(e.target.value)) {
      setEmailMessage("잘못된 이메일 형식");
    } else {
      setEmailMessage("올바른 이메일 형식");
    }
  }

  const userPassword = e => {
    setPassword(e.target.value);
    const passwordReg = /^[A-Za-z0-9]{4,8}$/;

    if (!passwordReg.test(e.target.value)) {
      setPasswordMessage("잘못된 비밀번호 형식");
    } else {
      setPasswordMessage("올바른 비밀번호 형식");
    }
  }

  const userPasswordConfirm = e => {
    setPasswordConfirm(e.target.value);

    if(password !== e.target.value) {
      setPasswordConfirmMessage("입력한 비밀번호와 다릅니다");
    } else {
      setPasswordConfirmMessage("올바르게 입력되었습니다");
    }
  }
    
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

  const userPhoneNumber = e => {
    setphoneNumber(e.target.value);
    const phonNumReg = /^01([0|1|6|7|8|9])([0-9]{3,4})([0-9]{4})$/;

    if (!phonNumReg.test(e.target.value)) {
      setphoneNumMessage("올바른 형식이 아닙니다");
    } else {
      setphoneNumMessage("굿");
    }
  }
  




  function SignUp() {
    function request() {

      axios.post('/join', {
        name: name,
        email: email,
        password: password,
        address: enroll_company,
        phone: phoneNumber
      })
        .then(response => {
          alert(response.status + " 회원가입이 완료되었습니다.");
          console.log(name, email, password, enroll_company, phoneNumber);
        }).catch(error => {
          console.log("요청한 데이터: " + name + ", " + email + ", " + password)
          console.log(name, email, password, enroll_company, phoneNumber);

          alert(error);
        });
    }
    request();
  }

  // const onSubmit = useCallback(
  //   async (e) => {
  //     e.preventDefault();
  //     try {
  //       await axios
  //       .post('/join', {
  //         name: name,
  //         email: email,
  //         password: password,
  //         address: {setDetailAddress},
  //         phonenumber: phoneNumber
  //       })
  //       .then((res) => {
  //         console.log('응답', res);
  //         if(res.status === 200) {
  //           console.log('회원가입 성공');
  //         }
  //       })
  //     } catch(err) {
  //       console.log(err);
  //     }
  //   },
  //   [email, name, password, setDetailAddress, phoneNumber]
  // )
  





  return (
    <Wrapper>
      <div className="Join">
        <h2>회원가입</h2>

        <FormWrap action="/join" method="POST">
          <div className="ItemWrap">
            <div>
              <label>이름</label>
            </div>
            <div>
              <Input type="text" value={name} placeholder="이름을 입력하세요" onChange={userName} ></Input>
            </div>
          </div>

          <div className="ItemWrap">
            <div>
              <label>이메일</label>
            </div>
            <div className="inputWrap">
              <Input type="text" value={email} placeholder="이메일 입력 후 중복확인 버튼을 눌러주세요" onChange={userEmail}></Input>
              {/* @
              <select name="email_select">
                <option value='write'>직접 입력</option>
                <option value='gmail.com'>gmail.com</option>
                <option value='naver.com'>naver.com</option>
              </select> */}
              <button>중복확인</button>
              <p>{emailMessage}</p>
            </div>
          </div>

          <div className="ItemWrap">
            <div>
              <label>비밀번호</label>
            </div>
            <div>
              <Input
                type="password" value={password} placeholder="영문,숫자를 조합하여 4~8자리로 입력해주세요" maxLength={8} onChange={userPassword} ></Input>
              <p>{passwordMessage}</p>
            </div>
          </div>

          <div className="ItemWrap">
            <div>
              <label>비밀번호</label>
            </div>
            <div>
              <Input
                type="password" value={passwordConfirm} placeholder="비밀번호를 다시 입력해주세요" maxLength={8} onChange={userPasswordConfirm}></Input>
              <p>{passwordConfirmMessage}</p>
            </div>
          </div>

          <div className="ItemWrap">
            <div>
              <label>우편번호</label>
            </div>
            <div>
              <Input type="number" value={enroll_company.postcode} placeholder="우편번호" onChange={handleInput} readOnly></Input>
              <button onClick={handleComplete}>우편번호 검색</button>
              {popup && <Post company={enroll_company} setcompany={setEnroll_company}></Post>}
            </div>
          </div>

          <div className="ItemWrap">
            <div>
              <label>주소</label>
            </div>
            <div>
              <Input type="text" value={enroll_company.address} onChange={handleInput} readOnly></Input>
            </div>
          </div>

          <div className="ItemWrap">
            <div>
              <label>상세주소</label>
            </div>
            <div>
              <Input type="text" value={detailAddress} placeholder="상세주소를 입력해주세요" onChange={userDetailAddress} ></Input>
            </div>
          </div>

          <div className="ItemWrap">
            <div>
              <label>참고항목</label>
            </div>
            <div>
              <Input type="text" value={etcAddress} onChange={userEtcAddress} ></Input>
            </div>
          </div>
          
          <div className="ItemWrap">
            <div>
              <label>휴대폰 번호</label>
            </div>
            <div>
              <Input type="text" value={phoneNumber} placeholder="숫자만 입력해주세요" onChange={userPhoneNumber} ></Input>
              <p>{phoneNumMessage}</p>
            </div>
          </div>

        </FormWrap>

        <br /><br />

        <button type="submit" onClick={SignUp}>회원가입</button>
      </div>
    </Wrapper>
  );
}

export default Join;

