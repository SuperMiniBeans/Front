import axios from "axios";
import { useEffect } from "react";
// import { response } from "express";

function MyPage() {

  useEffect(() => {
    axios.post('/join', {
      userId: '',
    })
    .then(response => {
      console.log(response.data);
    })
    .catch(error => {
      console.log(error);
    })
  }, [])





  return(
    <div>
      {/* <div>{response.data.userName}</div> */}
      마이페이지 입니다

    </div>
  )
}

export default MyPage;