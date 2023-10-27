import styled from "styled-components";
// import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useCookies } from "react-cookie";
import { FlexBox, FlexBoxSB, FlexBoxCol } from "../styles/Layout";
import { BtnBg, BtnBorder } from "../styles/ButtonStyle";


function Login() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  const [IdMessage, SetIdMessage] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");

  const [idMsgColor, setIdMsgColor] = useState({color: "red"});
  const [pswMsgColor, setPswMsgColor] = useState({color: "red"});
  

  /* 쿠키에 저장할 값 */
  const [cookies, setCookie, removeCookie] = useCookies(["rememberUserId"]);
  const [rememberId, setrememberId] = useState(false);

  const navigate = useNavigate();

  // 사용자 아이디 받기
  const userId = e => {
    setId(e.target.value);

    const idReg = /^[A-Za-z0-9]{2,10}$/;
    if (!idReg.test(e.target.value)) {
      SetIdMessage("잘못된 아이디 형식입니다");
      setIdMsgColor({color: '#F82A2A'});

    } else {
      SetIdMessage("올바른 아이디 형식입니다");
      setIdMsgColor({color: '#84D270'});

    }
  }

 // 사용자 비밀번호 받기, 유효성 검사
  const userPassword = e => {
  setPassword(e.target.value);
  const passwordReg = /^[A-Za-z0-9]{4,8}$/;

  if (!passwordReg.test(e.target.value)) {
    setPasswordMessage("비밀번호는 4~8자의 영문 대소문자와 숫자로만 입력해주세요");
    setPswMsgColor({color: '#F82A2A'});
  } else {
    setPasswordMessage("올바른 비밀번호 형식입니다");
    setPswMsgColor({color: '#84D270'});
  }
}

  // 아이디 저장 쿠키 설정
  useEffect(() => {
    if(cookies.rememberUserId !== undefined) {
      setId(cookies.rememberUserId);
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
      userId: id,
      userPassword: password
    })
      .then(response => {
        if(response.data.userId === id && response.data.userPassword === password) {
          console.log(response.data.msg);
          console.log(id, password);
          alert(response.status + "로그인이 완료되었습니다.");
          navigate('/');
        }
      }).catch(error => {
        console.log(id, password);
        alert(error);
      });
  }

  return(
    <LoginWrapper>
      <TitleCenter><h2>로그인</h2></TitleCenter>

      <FormWrap action="/login" method="POST">
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
            <label>비밀번호</label>
          </LabelWrap>
          <div>
            <Input
              type="password" name="userPassword" value={password} placeholder="4~8자의 영문 대소문자와 숫자로만 입력해주세요" maxLength={8} onChange={userPassword} ></Input>
            <div><ErrMsg style={pswMsgColor}>{passwordMessage}</ErrMsg></div>
          </div>
        </ItemWrap>

        <FlexBoxSB>
          <div>
            <input type="checkbox" name="saveId" onChange={e => handleOnCheck(e)} checked={rememberId}></input> 아이디 저장
          </div>
          <FlexBox>
            <div onClick={() => navigate('/search/id')}><p><Link to='search/id'>아이디 찾기</Link></p></div>
            <div><span>&nbsp;|&nbsp;</span></div>
            <div onClick={() => navigate('/search/pw/check')}><p><Link to='search/pw/check'>비밀번호 재설정</Link></p></div>
          </FlexBox>
        </FlexBoxSB>

        <FlexBoxCol>
          <BtnBg type="submit" onClick={SignIn}>로그인</BtnBg>
          <BtnBorder type="submit" onClick={goJoin}>회원가입</BtnBorder>
        </FlexBoxCol>
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
  font-size: 14px;
`

export default Login;