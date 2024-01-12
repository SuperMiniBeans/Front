import { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { Container, FlexBox } from "../styles/Layout";
import MyInfo from "../components/MyInfo";
import CheckOrderList from "../components/CheckOrderList";


function MyPage() {
  // 유저 정보 중 수정 가능한 정보는 input태그에 넣고 disalbled 설정, 수정 버튼 누르면 활성화하기

  // const [data, setData] = useState(null);
  // useEffect(() => {
  //   axios.post('/myPage', {
  //     userNumber: sessionStorage.getItem("userNumber"),
  //   })
  //   .then(response => {
  //     setData(response.data);
  //   })
  //   .catch(error => {
  //     console.log(error);
  //   })
  // }, []);

  // 사이드 탭메뉴
  const tabContent =  [
    {
      id: 0,
      title: "내 정보",
      content: (
        <div id="mp_info_content" className="content">
          <h3>내 정보</h3>
          <MyInfo />
        </div>
      )
    },
    {
      id: 1,
      title: "찜 목록",
      content: (
        <div id="mp_info_content" className="content">
          <h3>찜 목록</h3>
        </div>
      )
    },
    {
      id: 2,
      title: "주문 내역 조회",
      content: (
        <div id="mp_info_content" className="content">
          <h3>주문 내역 조회</h3>
          <CheckOrderList />

          
        </div>
      )     
    }
  ];
  const [index, setIndex] = useState(0);

  return(
    <Container>
        {/* ( */}
          <MyPageWrap>
            <div>
              <h2>마이페이지</h2>
            </div>

            <ConentBox className="tab_container">
              <FlexBox>
                <SideMenu className="side_menu">
                  <ul>
                    {tabContent.map(item => (
                      <li 
                        key={item.id} 
                        className={index === item.id ? 'active' : null} 
                        onClick={() => setIndex(item.id)}
                      >
                        {item.title}
                      </li>
                    ))}
                  </ul>
                </SideMenu>

                <MyPageContents>
                  {/* {tabContent.filter(item => index === item.id).map(item => (
                    <div key={index}>{item.content}</div>
                  ))} */}
                  {tabContent[index].content}
                </MyPageContents> 
              </FlexBox>
            </ConentBox>
          </MyPageWrap>
        {/* )
          :
          (<div>로딩중</div>
        ) */}
    </Container>
  )
}

const MyPageWrap = styled.div`
  h2 {
    margin-bottom: 30px;
    text-align: center;
  }


`

const ConentBox = styled.section`
  border-top: 1px solid #eee;
  border-bottom: 1px solid #eee;
`

const SideMenu = styled.div`
  width: 180px;
  height: 600px;
  padding-top: 20px;
  padding-left: 20px;
  color: #333;
  background-color: #F9F9F9;

  ul {
    // background-color: yellow;

    li {
      width: 100%;
      height: 40px;
      line-height: 40px;
      cursor: pointer;

      &.active {
        font-weight: 600;
      }

      &:hover {
        font-weight: 600;
      }
    }
  }
`

const MyPageContents = styled.div`
  padding: 40px;

  h2 {
    margin-bottom: 40px;
  }

  h3 {
    margin-bottom: 40px;
    font-size: 24px;
    font-weight: 600;
  }
`



export default MyPage;