import styled from "styled-components";
import { Container } from "../styles/Layout";

function Admin() {

  return(
    <AdminWrap>
      <Container>
        <h2>관리자 페이지 입니다.</h2>
        <table>
          <caption>등록한 상품 목록</caption>
          <colgroup>
            <col />
            <col />
            <col />
            <col />
            <col />
            <col />
            <col />
          </colgroup>

          <thead>
            <tr>
              <th scope="col"><input type="checkbox"></input></th>
              <th scope="col">번호</th>
              <th scope="col">제목</th>
              <th scope="col">내용</th>
              <th scope="col">작성자</th>
              <th scope="col">날짜</th>
              <th scope="col">삭제 버튼</th>
            </tr>
          </thead>

          {/* map으로 돌리기 (----------여기부터)*/}
          <tbody>
            <tr>
              <td><input type="checkbox"></input></td>
              <td>1</td>
              <td>제목 어쩌구</td>
              <td>내용 어쩌구</td>
              <td>admin</td>
              <td>2023.11.09</td>
              <td><button>삭제</button></td>
            </tr>
          </tbody>
          {/* map으로 돌리기 (여기까지-----------)*/}
        </table>


      </Container>
    </AdminWrap>
  )
}

const AdminWrap = styled.main`
  background-color: pink;

  table,
  th,
  td {
    border: 1px solid #000;
  }

  th,
  td {
    padding: 10px;
  }
`

export default Admin;