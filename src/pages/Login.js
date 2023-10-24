import styled from "styled-components";
// import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FlexBox, FlexBoxSB } from "../styles/Layout";
import { useCookies } from "react-cookie";


function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailMessage, setEmailMessage] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");

  /* 쿠키에 저장할 값 */
  const [cookies, setCookie, removeCookie] = useCookies(["rememberUserId"]);
  const [rememberId, setrememberId] = useState(false);

  const navigate = useNavigate();

  /* 아이디 유효성 검사 */
  const userEmail = e => {
    setEmail(e.target.value);
    
    const emailReg = /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/;

    if (!emailReg.test(e.target.value)) {
      setEmailMessage("잘못된 이메일 형식입니다");
    } else {
      setEmailMessage("올바른 이메일 형식입니다");
    }
  }

  /* 비밀번호 유효성 검사 */
  const userPassword = e => {
    setPassword(e.target.value);

    const passwordReg = /^[A-Za-z0-9]{4,8}$/;

    if (!passwordReg.test(e.target.value)) {
      setPasswordMessage("잘못된 비밀번호 형식입니다");
    } else {
      setPasswordMessage("올바른 비밀번호 형식입니다");
    }
  }

  // 아이디 저장 쿠키 설정
  useEffect(() => {
    if(cookies.rememberUserId !== undefined) {
      setEmail(cookies.rememberUserId);
      setrememberId(true);
    }
  }, []);

  const handleOnCheck = e => {
    setrememberId(e.target.checked);
    if(!e.target.checked) {
      removeCookie("rememberUserId");
    }
  }

  /* 회원가입 페이지로 이동 */
  function goJoin() {
    navigate('/join');
  }

  // 로그인 버튼 클릭시 실행될 작업
  function SignIn() {
    axios.post('/login', {
      userEmail: email,
      userPassword: password
    })
      .then(response => {
        alert(response.status + "로그인이 완료되었습니다.");
        console.log(email, password);
        navigate('/');
      }).catch(error => {
        console.log(email, password);
        alert(error);
      });
  }

  return(
    <LoginWrapper>
      <TitleCenter><h2>로그인</h2></TitleCenter>

      <FormWrap action="/login" method="POST">
        <ItemWrap>
          <div>
            <label>이메일</label>
          </div>
          <div className="inputWrap">
            <Input type="text" value={email} placeholder="이메일을 입력해주세요" onChange={userEmail}></Input>
            <p>{emailMessage}</p>
          </div>
        </ItemWrap>

        <ItemWrap>
          <div>
            <label>비밀번호</label>
          </div>
          <div>
            <Input
              type="password" value={password} placeholder="비밀번호를 입력해주세요" maxLength={8} onChange={userPassword}></Input>
            <p>{passwordMessage}</p>
          </div>
        </ItemWrap>

        <FlexBoxSB>
          <div>
            <input type="checkbox" name="saveId" onChange={e => handleOnCheck(e)} checked={rememberId}></input> 아이디 저장
          </div>
          <FlexBox style={{'color': 'grey'}}>
            <div><p>아이디 찾기</p></div>
            <div><span>&nbsp;|&nbsp;</span></div>
            <div><p>비밀번호 재설정</p></div>
          </FlexBox>
        </FlexBoxSB>

        <CompleteBtn type="submit" onClick={SignIn}>로그인</CompleteBtn>
        <CompleteBtn2 type="submit" onClick={goJoin}>회원가입</CompleteBtn2>
      </FormWrap>


    </LoginWrapper>
  )
}

const LoginWrapper = styled.div`
  width: 400px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  flex-direction: column;
`;

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

const Input = styled.input`
  width: 100%;
  height: 40px;
  padding-left: 10px;
  border: 1px solid #aaa;
`

const CompleteBtn = styled.button`
  width: 100%;
  height: 40px;
  text-align: center;
  color: #fff;
  background-color: #000;
  cursor: pointer;
`

const CompleteBtn2 = styled.button`
  width: 100%;
  height: 40px;
  text-align: center;
  border: 1px solid #000;
  background-color: #fff;
  cursor: pointer;
`

export default Login;