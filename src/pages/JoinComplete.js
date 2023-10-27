import { Link } from "react-router-dom";
// import styled from "styled-components";

function JoinComplete() {

  return(
    <div>
      <div>회원가입이 완료되었습니다!</div>

      <button><Link to="/login">로그인 페이지로 이동하기</Link></button>

    </div>
  )
}

export default JoinComplete;