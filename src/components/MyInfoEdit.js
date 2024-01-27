import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

function MyInfoEdit() {
  const navigate = useNavigate();

  const [userInfo, setUserInfo] = useState(null);
  const [isEditing, setIsEditing] = useState({
    name: false,
    password: false,
    email: false,
  });
  const [updatedInfo, setUpdatedInfo] = useState({});

  const handleEdit = (field) => {
    setIsEditing({ ...isEditing, [field]: true });
  }

  const handleChange = (event) => {
    setUpdatedInfo({
      ...updatedInfo,
      [event.target.name]: event.target.value,
    });
  }

  const handleCancel = () => {
    setUpdatedInfo(userInfo); // 수정을 취소하면 원래의 userInfo로 되돌림
    setIsEditing(false);
  }

  const handleSave = (field) => {
    axios.post('/update', updatedInfo)
    .then(response => {
      setUserInfo(updatedInfo);
      setIsEditing({ ...isEditing, [field]: false });
    })
    .catch(error => {
      console.log(error);
    })
  }

  
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
          <MyInfoEditContents>
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

                <tr>
                  <th scope="row">
                    비밀번호
                  </th>
                  <td>
                    {isEditing ? (
                      <input
                        type="text"
                        value={updatedInfo.userPassword}
                        name="userName"
                        onChange={handleChange}
                      />
                      // navigate('/search/check/id')
                    ) : (
                      <>
                        ****
                        {/* {userInfo.userPassword} */}
                      </>
                    )}
                  </td>
                </tr>

                {/* <tr>
                  <th scope="row">
                    비밀번호
                  </th>
                  <td>
                    {isEditing.password ? (
                      <input 
                        type="text" 
                        value={updatedInfo.name} 
                        onChange={handleChange} 
                        name="password" 
                      />
                    ) : (
                      <span>{userInfo.name}</span>
                    )}
                  </td>
                  <td>
                    {isEditing.name ? (
                      <>
                        <button onClick={() => handleSave('name')}>저장</button>
                        <button onClick={() => handleCancel('name')}>취소</button>
                      </>
                    ) : (
                      <button onClick={() => handleEdit('name')}>수정</button>
                    )}
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

              <button onClick={handleSave}>저장</button>

              {/* {isEditing ? (
                <>
                  <button onClick={handleCancel}>취소</button>
                  <button onClick={handleSave}>저장</button>
                </>
              ) : (
                <button onClick={handleEdit}>수정</button>
              )} */}
            </table>
          </MyInfoEditContents> 
        )
        :
        (
          <div>로딩중</div>
        )
      }
    </>
  )
}

const MyInfoEditContents = styled.div`
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

export default MyInfoEdit;