import styled from "styled-components";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useState, useEffect, useCallback } from "react";
import { Routes, Route, Link, useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import moment from "moment/moment";

import { Container, FlexBox, FlexBoxSB } from "../styles/Layout";
import { setProductList, removeProductList } from "../store";
import AddProduct from "./AddProduct"
import ProductDetail from "../components/ProductDetail";
import UpdateProduct from "./UpdateProduct";

function Admin() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const params = useParams();

  // 생성한 state 불러오기 
  const products = useSelector(state => state.products.products);
  // console.log(`등록된 상품:`, products);

  // DB에 저장된 게시글 불러와서 보여주기
  // const [refresh, setRefresh] = useState(1);
  useEffect(() => {
    axios.post('/fileList', {
      userId: sessionStorage.getItem("아이디"),
    })
      .then(response => {
        dispatch(setProductList(response.data));
      })
      .catch(error => {
        console.log(error);
      })
  }, []);


  // 체크박스 토글
  const [checkedProducts, setCheckedProducts] = useState([]);
  console.log('선택된 항목', checkedProducts);
  /* 혹시 콘솔 값을 setLanguage 바로 밑에서 체크한것이라면 반영은 제대로 되었을 가능성이 큽니다. 
  왜냐하면 useState는 값이 바로 변경되지 않고, useState가 들어있는 컴포넌트가 리렌더링 될때 업데이트 되기 때문입니다. 
  콘솔값을 selectBox 최상단이나, 혹은 이 함수에게 props를 주고있는 부모함수에서 찍어보면 값을 얻을수 있을것 같기는 합니다.  */
  const handleCheckbox = (checked, pNum) => {
    if(checked) {
      setCheckedProducts([...checkedProducts, pNum]);

    } else {
      setCheckedProducts(checkedProducts.filter(id => id !== pNum));
    }
  }

  // 전체 선택
  const handleAllCheck = (checked) => {
    if(checked) {
      const pNumArray = [];
      products.forEach((id) => pNumArray.push(id.productNumber));
      setCheckedProducts(pNumArray);
    } else {
      setCheckedProducts([]);
    }
  }
  
  // 체크한 상품 삭제하기 
  const onRemove = () => { // 뭘 삭제할지 말 해줘야함
    window.alert("삭제하시겠습니까?");
    for(let i=0; i<checkedProducts.length; i++){
      axios.get('/productDelete?productNumber='+checkedProducts[i])
        .then(response => {
          console.log(response.data);
          dispatch(removeProductList(checkedProducts));
          window.location.reload();
        })
        .catch(error => {
          console.log(error);
          console.log('체크된 항목?', checkedProducts)
        })
    }
  }

  // 휴지통 아이콘 클릭 삭제 (작성중)
  const onRemove2 = () => { // 뭘 삭제할지 말 해줘야함 
    window.alert("삭제하시겠습니까?");
    axios.get('/productDelete?productNumber='+checkedProducts[0])
      .then(response => {
        console.log(response.data);
        dispatch(removeProductList(checkedProducts));
        window.location.reload();
      })
      .catch(error => {
        console.log(error);
      })
  }

  // 대표 이미지 미리보기(작성중)
  // useEffect(() => {
  //   axios.post('/fileList')
  //     .then(response => {
  //       console.log('get이미지', response.data);
  //     })
  //     .catch(error => {
  //       console.log(error);
  //     })
  // }, []) 

  // 상품 등록 페이지로 이동(버튼에 연결)
  const goAddProduct = () => {
    navigate('/admin/add');
  }

  // 상품 수정 페이지로 이동
  // const goUpdateProduct = () => {
  //   navigate(`/admin/update/${products.productNumber}`);
  // }
  

  return(
    <AdminWrap>
      <Container>
        <h2>상품 관리</h2>

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
              <th scope="col" id="admin_list_chk"><input type="checkbox" onChange={e => handleAllCheck(e.target.checked)} /></th>
              <th scope="col" id="admin_list_num">상품 번호</th>
              <th scope="col" id="admin_list_thumbnail">이미지</th>
              <th scope="col" id="admin_list_title">상품명</th>
              <th scope="col" id="admin_list_writer">작성자</th>
              <th scope="col" id="admin_list_date">날짜</th>
              <th scope="col" id="admin_list_edit">수정</th>
              <th scope="col" id="admin_list_del">삭제</th>
            </tr>
          </thead>

          {/* map으로 돌리기 + 데이터 바인딩 (----------여기부터) */}
          {products.length === 0 ? (
            <tbody>
              <tr>
                <td colSpan={8}>
                  등록된 상품이 없습니다.
                </td>
              </tr>
            </tbody>
          ) : (
            products.map((products, index) => (
              <tbody key={index}>
                <tr className="tbody_content">
                  <td><input type="checkbox" onChange={e => handleCheckbox(e.target.checked, products.productNumber)}></input></td>
                  <td>{products.productNumber}</td>
                  <td>
                    <div id="admin_thumb_box">
                      <img id="admin_thumb_img" src={`/upload/${products.fileUploadPath}/th_${products.fileUuid}_${products.fileName}`} alt="thumbnail" />
                    </div>
                  </td>{/* 이미지 url넣기 uuid를 가지고 이미지를 조회하는 url을 넣어야함  */}
                  <td><Link to={`/product/list/detail/${products.productNumber}`}>{products.productName}</Link></td>
                  <td>{products.userId}</td>
                  <td>{moment(products.productRegisterDate).format('YYYY-MM-DD')}</td>
                  <td className="product_edit_icon"><Link to={`/admin/products/${products.productNumber}/edit`}><FaRegEdit /></Link></td>
                  <td className="product_del_icon"><RiDeleteBin6Line onClick={() => onRemove2(products)}/></td>
                </tr>
              </tbody>
            ))
          )}
          {/* map으로 돌리기 (여기까지-----------)*/}
        </table>

        <FlexBoxSB>
          <div><DeleteChkedBtn type="submit" onClick={onRemove}>선택 삭제</DeleteChkedBtn></div>
          <div className="add_btn_box"><GoAddProductBtn onClick={goAddProduct}>상품 등록</GoAddProductBtn></div>
        </FlexBoxSB>
      </Container>

      <Routes>
        <Route path="/admin/add" element={<AddProduct />} />
        <Route path={`/product/list/detail/${products.productNumber}`} element={<ProductDetail />} />
        <Route path={'/admin/products/:id/edit'} element={<UpdateProduct />} />
      </Routes>
      {/* 동적 라우팅 참고 - https://velog.io/@zzangzzong/React-%EB%8F%99%EC%A0%81%EB%9D%BC%EC%9A%B0%ED%8C%85Dynamic-Routing */}
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

  #admin_list_num,
  #admin_list_thumbnail,
  #admin_list_writer,
  #admin_list_edit,
  #admin_list_del {
    width: 100px;
  }
  
  #admin_list_date {
    width: 160px;
  }

  // 썸네일 이미지 박스 스타일
  #admin_thumb_box {
    margin: 0 auto;
    width: 60px;
    height: 80px;
  }

  // 썸네일 이미지 스타일
  #admin_thumb_img {
    width: 60px;
    height: 80px;
    object-fit: cover;
  }

  // 상품 등록 버튼 영역
  .add_btn_box {
    position: relative;
    height: 40px;
    margin-top: 10px;
    // background-color: red;
  }
`

const GoAddProductBtn = styled.button`
  position: absolute;
  width: 80px;
  height: 32px;
  right: 0;
  font-size: 14px;
`

const DeleteChkedBtn = styled.button`
  width: 80px;
  height: 32px;
  margin-top: 10px;
  font-size: 14px;
`


export default Admin;