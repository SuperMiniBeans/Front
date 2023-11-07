import axios from "axios";
import { useState, useEffect } from "react";
// import { response } from "express";

function MyPage() {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios.get('/myPage')
    .then(response => {
      console.log(response.data);
      console.log(response.data.userNumber);
      setData(response.data);
    })
    .catch(error => {
      console.log(error);
    })
  }, [])


  return(
    <div>
      {/* <div>{response.data.userName}</div> */}
      마이페이지 입니다
      {data ? (
        <div>
          <div>사용자 번호 : {data.userNumber}</div>
          <div>이름: {data.userName}</div>
        </div>
      )
        :
        (<div>---로딩중---</div>
      )}

    </div>
  )
}

export default MyPage;