import styled from "styled-components";
import { Container } from "../styles/Layout";
import { useState, useEffect } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

// 장바구니는 리덕스 사용해서 관리하기 
function Cart() {

  const cart = useSelector((state) => state.cart.cart);

  console.log('cart', cart);



  // 장바구니로 post한 데이터 받아와서 보여주기
  useEffect(() => {
    axios.post('/fileList', {
      userId: sessionStorage.getItem("아이디"),
    })
      .then(response => {
        // ------------------- setCartList(response.data); 이런식으로 작성
      })
      .catch(error => {
        console.log(error);
      })
  }, []);

  
  // 체크박스 토글
  const [checkedProducts, setCheckedProducts] = useState([]);
  console.log('선택된 항목', checkedProducts);
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

  // 선택 삭제
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

  const [productList, setProductList] = useState([]);
  useEffect(() => {
    axios.post('/fileList', {
      userId: sessionStorage.getItem("아이디"),
    })
      .then(response => {
        setProductList(response.data);
        // console.log('admin-response.data', response.data);
      })
      .catch(error => {
        console.log(error);
      })
  }, []);

  return(
    <CartWrap>
      <Container>
        <h2>장바구니</h2>

        <table>

          <thead>
            <tr>
              <th scope="col" id="admin_list_chk">
                <input type="checkbox" 
                        onChange={e => handleAllCheck(e.target.checked)} 
                        checked={checkedProducts.length === productList.length ? true : false}
                />
              </th>

              <th scope="col" id="admin_list_edit">상품 정보</th>
              <th scope="col" id="admin_list_del">상품 가격</th>
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
                    <input type="checkbox" 
                          onChange={e => handleCheckbox(e.target.checked, products.productNumber)}
                          checked={checkedProducts.includes(products.productNumber) ? true : false}
                    />
                  </td>
                  <td>
                    <div id="admin_thumb_box">
                      <img id="admin_thumb_img" src={`/upload/${products.fileUploadPath}/th_${products.fileUuid}_${products.fileName}`} alt="thumbnail" />
                    </div>
                  </td>
                  <td><Link to={`/product/list/detail/${products.productNumber}`}>{products.productName}</Link></td>
                  
                </tr>
              </tbody>
            ))
          )}
          {/* map으로 돌리기 (여기까지-----------)*/}
        </table>


        <div><DeleteChkedBtn type="submit" onClick={onRemove}>선택 삭제</DeleteChkedBtn></div>

      </Container>
    </CartWrap>
  )
}

const CartWrap = styled.div`
  width: 100%;
  min-width: 1200px;
  background-color: pink;

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
`

const DeleteChkedBtn = styled.button`
  width: 80px;
  height: 32px;
  margin-top: 10px;
  font-size: 14px;
`

export default Cart;