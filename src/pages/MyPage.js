import { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { Container, FlexBox } from "../styles/Layout";
import MyInfo from "../components/MyInfo";
import CheckOrderList from "../components/CheckOrderList";


function MyPage() {
   // 유저 정보 중 수정 가능한 정보는 input태그에 넣고 disalbled 설정, 수정 버튼 누르면 활성화하기

  const [data, setData] = useState(null);
  useEffect(() => {
    axios.post('/myPage', {
      userNumber: sessionStorage.getItem("userNumber"),
    })
    .then(response => {
      setData(response.data);
    })
    .catch(error => {
      console.log(error);
    })
  }, []);

  // const [orderList, setOrderList] = useState([]);
  // useEffect(() => {

  //   axios.post('/afterPayList', {
  //     userNumber: sessionStorage.getItem("userNumber"),
  //   })
  //   .then(res => {
  //     setOrderList(res.data);
  //     console.log('주문내역조회',res.data);
  //   })
  //   .catch(error => {
  //     console.log(error);
  //   })
  // }, []);

  // 사이드 탭메뉴
  const tabContent = data ? [
    {
      id: 0,
      title: "내 정보",
      content: (
        <div id="mp_info_content" className="content">
          <h2>내 정보</h2>
          <MyInfo />
        </div>
      )
    },
    {
      id: 1,
      title: "찜 목록",
      content: (
        <div id="mp_info_content" className="content">
          <h2>찜 목록</h2>
        </div>
      )
    },
    {
      id: 2,
      title: "주문 내역 조회",
      content: (
        <div id="mp_info_content" className="content">
          <h2>주문 내역 조회</h2>
          <CheckOrderList />

          
        </div>
      )     
    }
  ] : [];
  const [index, setIndex] = useState(0);

  return(
    <Container>
        {data ? (
          <>
            <Hello>
              <div className="hello">{data.userName}님, 안녕하세요!</div>
            </Hello>

            <ConentBox className="tab_container">
              <FlexBox>
                <SideMenu className="side_menu">
                  <ul>
                    {tabContent.map(item => (
                      <li key={item.id} className={index === item.id ? 'active' : null} onClick={() => setIndex(item.id)}>{item.title}</li>
                    ))}
                  </ul>
                </SideMenu>

                <MyPageContents>
                  {tabContent.filter(item => index === item.id).map(item => (
                    <div key={index}>{item.content}</div>
                  ))}
                </MyPageContents> 
              </FlexBox>
            </ConentBox>
          </>
        )
          :
          (<div>---로딩중---</div>
        )}
    </Container>
  )
}

const Hello = styled.div`
  height: 200px;
  // background-color: pink;


  .hello {
    padding-top: 100px;
    font-size: 40px;
    // background-color: yellow;
  }
`

const ConentBox = styled.section`
  border-top: 1px solid #000;
  border-bottom: 1px solid #000;
`

const SideMenu = styled.div`
  padding: 64px 0;
  width: 180px;
  border-right: 1px solid #000;

  ul {
    // background-color: yellow;

    li {
      width: 100%;
      height: 40px;
      padding-left: 40px;
      font-size: 20px;
      line-height: 40px;
      cursor: pointer;

      &.active {
        font-weight: 600;
        background-color: pink;
      }

      &:hover {
        font-weight: 600;
        background-color: pink;
      }
    }
  }
`

const MyPageContents = styled.div`
  padding: 64px 0 64px 40px;

  h2 {
    margin-bottom: 40px;
  }
`



export default MyPage;