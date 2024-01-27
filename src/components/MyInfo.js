import { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";

function MyInfo() {
  const [userInfo, setUserInfo] = useState(null);  

  useEffect(() => {
    axios.post('/myPage', {
      userNumber: sessionStorage.getItem("userNumber"),
    })
    .then(response => {
      setUserInfo(response.data);
    })
    .catch(error => {
      console.log(error);
    })
  }, []);

  return(
    <>
      {userInfo ? 
        (
          <MyInfoContents>
            <table>
              <colgroup>
                <col />
                <col />
              </colgroup>

              <tbody>
                <tr>
                  <th scope="row">
                    아이디
                  </th>
                  <td>
                    {userInfo.userId}
                  </td>
                </tr>

                {/* <tr>
                  <th scope="row">
                    비밀번호
                  </th>
                  <td>
                    {userInfo.userPassword}
                  </td>
                </tr> */}

                <tr>
                  <th scope="row">
                    이름
                  </th>
                  <td>
                    {userInfo.userName}
                  </td>
                </tr>

                <tr>
                  <th scope="row">
                    이메일
                  </th>
                  <td>{userInfo.userEmail}</td>
                </tr>

                <tr>
                  <th scope="row">
                    주소
                  </th>
                  <td>
                    {userInfo.userAddress1} {userInfo.userAddress2} {userInfo.userAddress3}
                  </td>
                </tr>

                <tr>
                  <th scope="row">
                    휴대전화
                  </th>
                  <td>
                    {userInfo.userPhoneNumber}
                  </td>
                </tr>
              </tbody>
            </table>
          </MyInfoContents> 
        )
        :
        (
          <div>로딩중</div>
        )
      }
    </>
  )
}

const MyInfoContents = styled.div`
  table {
    width: 100%;
  }

  tbody {
    
    th {
      width: 120px;
      height: auto;
      padding: 16px 0;
      text-align: left;
    }
  }
`

export default MyInfo;