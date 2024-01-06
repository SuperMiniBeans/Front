import styled from "styled-components";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import moment from "moment/moment";

import { Container, FlexBoxSB } from "../styles/Layout";


function Admin() {
  const navigate = useNavigate();
  const [productList, setProductList] = useState([]);
  const [checkedProducts, setCheckedProducts] = useState([]);

  // 체크박스 토글
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
      productList.forEach((id) => pNumArray.push(id.productNumber));
      setCheckedProducts(pNumArray);
    } else {
      setCheckedProducts([]);
    }
  }

  // 휴지통 아이콘 클릭하면 삭제
  const onRemoveClick = (pNum) => {
    window.alert("삭제하시겠습니까?");
    const clickProduct = [...checkedProducts, pNum];
    setCheckedProducts(clickProduct);

    axios.post('/productDelete', {
      productNumber: clickProduct,
    })
      .then(response => {
        console.log(response.data);
        window.location.reload();
      })
      .catch(error => {
        console.log(error);
      })
  };

  // 선택 삭제 버튼 클릭
  const onRemove = () => {
    window.alert("삭제하시겠습니까?");
    axios.post('/productDelete', {
      productNumber: checkedProducts,
    })
      .then(response => {
        console.log(response.data);
        window.location.reload();
      })
      .catch(error => {
        console.log(error);
        window.alert("실패");
        console.log('체크된 항목', checkedProducts);
      })
  }

  // 상품 등록 페이지로 이동(버튼에 연결)
  const goAddProduct = () => {
    navigate('/admin/add');
  }  
  
  // DB에 저장된 게시글 불러와서 보여주기
  useEffect(() => {
    axios.post('/fileList', {
      userId: sessionStorage.getItem("아이디"),
    })
      .then(response => {
        setProductList(response.data);
      })
      .catch(error => {
        console.log(error);
      })
  }, []);

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
              <th scope="col" id="admin_list_chk">
                <input 
                  type="checkbox" 
                  onChange={e => handleAllCheck(e.target.checked)} 
                  checked={checkedProducts.length === productList.length ? true : false}
                />
              </th>
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
          {productList.length === 0 ? (
            <tbody>
              <tr>
                <td colSpan={8}>
                  등록된 상품이 없습니다.
                </td>
              </tr>
            </tbody>
          ) : (
            productList.map((products, index) => (
              <tbody key={index}>
                <tr className="tbody_content">

                  <td>
                    <input 
                      type="checkbox" 
                      onChange={e => handleCheckbox(e.target.checked, products.productNumber)}
                      checked={checkedProducts.includes(products.productNumber) ? true : false}
                    />
                  </td>
                  <td>{products.productNumber}</td>
                  <td>
                    <div id="admin_thumb_box">
                      <Link to={`/product/list/detail/${products.productNumber}`}>
                        <img 
                          id="admin_thumb_img" 
                          src={`/upload/${products.fileUploadPath}/th_${products.fileUuid}_${products.fileName}`} 
                          alt="thumbnail" 
                        />
                      </Link>
                    </div>
                  </td>
                  <td>
                    <Link to={`/product/list/detail/${products.productNumber}`}>
                      {products.productName}
                    </Link>
                  </td>
                  <td>{products.userId}</td>
                  <td>{moment(products.productRegisterDate).format('YYYY-MM-DD')}</td>
                  <td className="product_edit_icon">
                    <Link to={`/admin/products/${products.productNumber}/edit`}>
                      <FaRegEdit />
                    </Link>
                  </td>
                  <td className="product_del_icon">
                    <RiDeleteBin6Line 
                      onClick={() => onRemoveClick(products.productNumber)}
                    />
                  </td>

                </tr>
              </tbody>
            ))
          )}
          {/* map으로 돌리기 (여기까지-----------)*/}
        </table>

        <FlexBoxSB>
          <div>
            <DeleteChkedBtn type="submit" onClick={onRemove}>
              선택 삭제
            </DeleteChkedBtn>
          </div>
          <div className="add_btn_box">
            <GoAddProductBtn onClick={goAddProduct}>
              상품 등록
            </GoAddProductBtn>
          </div>
        </FlexBoxSB>
      </Container>
    </AdminWrap>
  )
}

const AdminWrap = styled.main`
  width: 100%;
  min-width: 1200px;

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

    td {
      vertical-align: middle;
    }

    .product_del_icon {
      svg {
        cursor: pointer;
        color: #F82A2A;
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