import styled from "styled-components";
import { Container } from "../styles/Layout";
import { useEffect, useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import AddProduct from "../components/AddProduct"
import { useSelector, useDispatch } from "react-redux";
import { setProductList } from "../store";
import axios from "axios";

function Admin() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // 상품 등록 페이지로 이동(버튼에 연결)
  const goAddProduct = () => {
    navigate('/admin/add');
  }

  // 생성한 state 불러오기 
  const products = useSelector(state => state.products.products);
  console.log(`등록된 상품:`, products);

  // 글 작성 날짜 나타내기
  let date = new Date();
  let year = date.getFullYear();
  let month = date.getMonth();
  let day = date.getDate();
  let today = year + "-" + month + "-" + day;
  console.log(today);

  // DB에 저장된 게시글 불러와서 보여주기
  useEffect(() => {
    axios.get(`/registerProduct`)
      .then(response => {
        // console.log('데이터', response.data);
        console.log('응답 데이터');
        dispatch(setProductList(response.data));
        if(products === undefined) {
          dispatch(setProductList([]));
        }
      })
      .catch(error => {
        console.log(error);
      })
  }, [dispatch]);

  // useEffect(() => {
  //   axios.post(`/`, {

  //   })
  //     .then(response => {
  //       // console.log('데이터', response.data);
  //       console.log('응답 데이터');
  //       dispatch(setProductList(response.data));
  //       if(products === undefined) {
  //         dispatch(setProductList([]));
  //       }
  //     })
  //     .catch(error => {
  //       console.log(error);
  //     })
  // }, [dispatch]);

  return(
    <AdminWrap>
      <Container>
        <h2>상품 관리</h2>

        <div><button onClick={goAddProduct}>상품 등록</button></div>

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
              <th scope="col" id="admin_list_chk"><input type="checkbox"></input></th>
              <th scope="col" id="admin_list_num">번호</th>
              <th scope="col" id="admin_list_thumbnail">썸네일</th>
              <th scope="col" id="admin_list_title">제목</th>
              <th scope="col" id="admin_list_writer">작성자</th>
              <th scope="col" id="admin_list_date">날짜</th>
              <th scope="col" id="admin_list_del">삭제 버튼</th>
            </tr>
          </thead>

          {/* map으로 돌리기 + 데이터 바인딩 (----------여기부터) */}
          {products === undefined ? (
            // <tbody>
            //   <td colSpan={7}>
            //     등록된 상품이 없습니다.
            //   </td>
            // </tbody>
            <>
              {window.alert("등록된 상품이 없습니다.")}
            </>
          ) : (
            products.map((products, index) => (
              <tbody key={index}>
                <tr className="tbody_content">
                  <td><input type="checkbox"></input></td>
                  <td>{index+1}</td>
                  <td>썸네일</td>
                  <td><Link to='/product/list/detail'>{products.productName}</Link></td>
                  <td>admin</td>
                  <td>{today}</td>
                  <td><button>삭제</button></td>
                </tr>
              </tbody>
            ))
          )}
          {/* map으로 돌리기 (여기까지-----------)*/}
        </table>

        <div><button type="submit">삭제</button></div>
      </Container>

      <Routes>
        <Route path="/admin/add" element={<AddProduct />} />
      </Routes>
    </AdminWrap>
  )
}

const AdminWrap = styled.main`
  width: 100%;
  min-width: 1200px;
  // background-color: pink;

  h2 {
    margin-bottom: 30px;
  }

  table,
  th,
  td {
    text-align: center;
    border: 1px solid #000;
  }

  th,
  td {
    padding: 10px 0;
  }

  table {
    width: 100%;

    caption {
      font-size: 0;
    }
  }

  tbody {
    height: 80px;
    align-items: center;
    // background-color: yellow;

    .tbody_content {
      align-items: center;
      line-height: 80px;
      background-color: #ccc;;

    }
  }

  #admin_list_chk,
  #admin_list_num {
    width: 56px;
    // background-color: red;
  }

  #admin_list_thumbnail {
    width: 80px;
  }

  #admin_list_writer {
    width: 100px;
  }
  
  #admin_list_date {
    width: 160px;
  }

  #admin_list_del {
    width: 100px;
  }
`

export default Admin;