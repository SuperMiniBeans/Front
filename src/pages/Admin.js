import styled from "styled-components";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useEffect, useState } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

import { Container } from "../styles/Layout";
import { setProductList } from "../store";
import AddProduct from "../components/AddProduct"



// 날짜 처리 어떻게 할지!! 
// 썸네일 -> 어려우면 패스 (파일 업로드 잘 되면 생각해보기)



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

  // DB에 저장된 게시글 불러와서 보여주기
  useEffect(() => { 
    axios.post('/fileList', {
      userId: sessionStorage.getItem("아이디"),
    })
      .then(response => {
        console.log('데이터', response.data);
        dispatch(setProductList(response.data));
        // if(products.length === 0) {
        //   dispatch(setProductList([]));
        //   console.log('데이터 없음');
        // }
      })
      .catch(error => {
        console.log(error);
        if(products.length === 0) {
          console.log('데이터 없음');
        }
      })
  }, [dispatch]);

  // 체크한 상품 삭제하기
  

  return(
    <AdminWrap>
      <Container>
        <h2>상품 관리</h2>

        <div className="add_btn_box"><GoAddProductBtn onClick={goAddProduct}>상품 등록</GoAddProductBtn></div>

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
              <th scope="col" id="admin_list_num">상품 번호</th>
              {/* <th scope="col" id="admin_list_thumbnail">썸네일</th> */}
              <th scope="col" id="admin_list_title">상품명</th>
              <th scope="col" id="admin_list_writer">작성자</th>
              <th scope="col" id="admin_list_date">날짜</th>
              <th scope="col" id="admin_list_del">삭제</th>
            </tr>
          </thead>

          {/* map으로 돌리기 + 데이터 바인딩 (----------여기부터) */}
          {products === undefined ? (
            <tbody>
              <td colSpan={7}>
                등록된 상품이 없습니다.
              </td>
            </tbody>
          ) : (
            products.map((products, index) => (
              <tbody key={index}>
                <tr className="tbody_content">
                  <td><input type="checkbox"></input></td>
                  <td>{products.productNumber}</td>
                  {/* <td>썸네일</td> */}
                  <td><Link to='/product/list/detail'>{products.productName}</Link></td>
                  <td>{products.userId}</td>
                  <td>{products.productRegisterDate}</td>
                  {/* <td>2023-11-24</td> */}
                  <td className="product_del_icon"><RiDeleteBin6Line /></td>
                </tr>
              </tbody>
            ))
          )}
          {/* map으로 돌리기 (여기까지-----------)*/}
        </table>

        <div><DeleteChkedBtn type="submit">선택 삭제</DeleteChkedBtn></div>
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
    text-align: center;
  }

  // 상품 등록 버튼 영역
  .add_btn_box {
    position: relative;
    height: 40px;
    margin-bottom: 10px;
    // background-color: red;
  }

  // 테이블 스타일 설정
  table,
  th,
  td {
    text-align: center;
    // border: none;
    // border: 1px solid #000;
  }

  th,
  td {
    padding: 10px 0;
    border-bottom: 1px solid #333;
  }

  table {
    width: 100%;
    border-top: 1px solid #333;

    caption {
      font-size: 0;
    }
  }

  thead {
    border-bottom: 1px solid #ccc;
    font-weight: 600;
  }

  tbody {
    height: 80px;
    // background-color: yellow;

    td {
      vertical-align: middle;
      // background-color: yellowgreen;
    }

    .product_del_icon {
      svg {
        cursor: pointer;
      }
    }
  }

  #admin_list_chk {
    width: 56px;
  }

  #admin_list_num {
    width: 80px;
  }

  #admin_list_thumbnail {
    width: 80px;
  }

  #admin_list_writer {
    width: 100px;
  }
  
  #admin_list_date {
    width: 160px;
    background-color: yellowgreen;
  }

  #admin_list_del {
    width: 100px;
  }
`

const GoAddProductBtn = styled.button`
  position: absolute;
  width: 80px;
  height: 32px;
  right: 0;
  font-size: 14px;
`

const DeleteProductBtn = styled.button`
  width: 40px;
  height: 32px;
  margin-top: 10px;
  font-size: 14px;
  color: #fff;
  border: none;
  border-radius: 4px;
  background: #F82A2A;
  cursor: pointer;

`

const DeleteChkedBtn = styled.button`
  width: 80px;
  height: 32px;
  margin-top: 10px;
  font-size: 14px;
`


export default Admin;