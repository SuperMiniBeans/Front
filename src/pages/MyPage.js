import { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { Container } from "../styles/Layout";

function MyPage() {
   // 유저 정보 중 수정 가능한 정보는 input태그에 넣고 disalbled 설정, 수정 버튼 누르면 활성화하기

  const [data, setData] = useState(null);

  useEffect(() => {
    axios.post('/myPage', {
      userNumber: sessionStorage.getItem("userNumber"),
    })
    .then(response => {
      console.log(response.data);
      console.log(response.data.userNumber);
      setData(response.data);
    })
    .catch(error => {
      console.log(error);
      console.log(sessionStorage.getItem("userNumber"))
    })
  }, [])


  return(
    <Container>
      <div>
        {data ? (
          <>
            <Hello>
              <div className="hello">{data.userName}님, 안녕하세요!</div>
            </Hello>
            <div>
              

            </div>
            <div>
              <div>이름: {data.userName}</div>
              <div>사용자 번호 : {data.userNumber}</div>
            </div>
          </>
        )
          :
          (<div>---로딩중---</div>
        )}
      </div>
    </Container>
  )
}

const Hello = styled.div`
  height: 200px;
  border-bottom: 1px solid #000;
  // background-color: pink;


  .hello {
    padding-top: 100px;
    font-size: 40px;
    // background-color: yellow;
  }

`


export default MyPage;