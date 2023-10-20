import styled, {css} from "styled-components";
import axios from "axios";
import { useState } from "react";

const Wrapper = styled.div`
  width: 400px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  background-color: pink;
`;

const Input = styled.input`
  width: 100%;
  height: 40px;
  border: 1px solid #aaa;
`





function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailMessage, setEmailMessage] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");

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

  return(
    <Wrapper>

    <h2>로그인</h2>

    <div className="ItemWrap">
        <div>
          <label>이메일</label>
        </div>
        <div className="inputWrap">
          <Input type="text" value={email} placeholder="이메일을 입력해주세요" onChange={userEmail}></Input>
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
            type="password" value={password} placeholder="비밀번호를 입력해주세요" maxLength={8} onChange={userPassword} ></Input>
          <p>{passwordMessage}</p>
        </div>
      </div>
    </Wrapper>

  )
}


export default Login;