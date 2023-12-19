import styled from "styled-components";
import { Container, FlexBox } from "../styles/Layout";
import { useState, useEffect } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

// 장바구니는 리덕스 사용해서 관리하기 
function Cart() {



  const cart = useSelector((state) => state.cart);
  console.log('reduxcart', cart);

  const[cartList, setCartList] = useState([])

  // 장바구니로 post한 데이터 받아와서 보여주기
  useEffect(() => {
    axios.post('/userCart', {
      userNumber: sessionStorage.getItem("userNumber"),
    })
      .then(response => {
        setCartList(response.data);
        console.log('response.data', response.data)
      })
      .catch(error => {
        console.log(error);
      })
  }, []);
  console.log('cartList', cartList);

  
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
      cartList.forEach((id) => pNumArray.push(id.productNumber));
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

  return(
    <CartWrap>
      <Container>
        <h2>장바구니</h2>

        <table>

          <thead>
            <tr>
              <th scope="col" id="cart_list_total_count">전체 {cartList.length}개</th>
              <th scope="col" id="cart_list_chk">
                <input type="checkbox" 
                        onChange={e => handleAllCheck(e.target.checked)} 
                        checked={checkedProducts.length === cartList.length ? true : false}
                />
              </th>
              <th scope="col" id="cart_list_info">상품 정보</th>
              <th scope="col" id="cart_list_price">상품 금액</th>
            </tr>
          </thead>

          {/* map으로 돌리기 + 데이터 바인딩 (----------여기부터) */}
          {cartList.length === 0 ? (
            <tbody>
              <tr>
                <td colSpan={8}>
                  장바구니에 상품이 없습니다.
                </td>
              </tr>
            </tbody>
          ) : (
            cartList.map((items, index) => (
              <tbody key={index}>
                <tr className="tbody_content">
                  <td>{index + 1}</td>

                  <td>
                    <input type="checkbox" 
                          onChange={e => handleCheckbox(e.target.checked, items.productNumber)}
                          checked={checkedProducts.includes(items.productNumber) ? true : false}
                    />
                  </td>

                  <td>
                    <FlexBox className="cart_item_info">
                      <div id="admin_thumb_box">
                        <Link to={`/product/list/detail/${items.productNumber}`}>
                          <img id="admin_thumb_img" src={`/upload/${items.fileUploadPath}/th_${items.fileUuid}_${items.fileName}`} alt="thumbnail" />
                        </Link>
                      </div>
                      <div>
                        <Link to={`/product/list/detail/${items.productNumber}`}>
                          <div className="cart_product_name">{items.productName} </div>
                        </Link>
                        <div className="selected_option">옵션: {items.selectedSize}/ {items.selectedColor}</div>
                        <div><button id="option_change">사이즈/수량 변경</button></div>
                      </div>
                    </FlexBox>
                    
                  </td>
  
                  <td>
                    <PriceWrap>
                      {cart.discountRate > 0 ? (
                        <>
                          <span className="dscnt_price">{items.discountPrice}</span>
                          <span className="price">{items.productPrice}</span>
                        </>
                      ) : (
                        <>
                          <span className="non_dscnt_price">{items.productPrice}</span>
                        </>
                      )}
                    </PriceWrap>
                  </td>
                  
                </tr>
              </tbody>
            ))
          )}
          {/* map으로 돌리기 (여기까지-----------)*/}
        </table>

        <div><DeleteChkedBtn type="submit" onClick={onRemove}>선택 삭제</DeleteChkedBtn></div>
        
        <div>총 금액: {}</div>
        
        <div><button>주문하기</button></div>

      </Container>
    </CartWrap>
  )
}

const CartWrap = styled.div`
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

  #cart_list_total_count,
  #cart_list_chk {
    width: 100px;
  }

  #cart_list_info {
  }

  #cart_list_price {

  }

  tbody {
    height: 80px;

    td {
      vertical-align: middle;
    }
  }

  
  // 썸네일 이미지 박스 스타일
  #admin_thumb_box {
    width: 60px;
    height: 80px;
    margin-right: 10px;
  }

  // 썸네일 이미지 스타일
  #admin_thumb_img {
    width: 60px;
    height: 80px;
    object-fit: cover;
  }


  .cart_item_info {
    display: flex;
    align-items: center;
    width: 300px;
    text-align: left;
    // background: pink;

    .cart_product_name {
      margin-bottom: 10px;
    }

    .selected_option {
      margin-bottom: 4px;
      font-size: 12px;
      color: #aaa;
    }

    #option_change {
      font-size: 12px;
      background: none;
      border: none;
      border-bottom: 1px solid #333;
      cursor: pointer;

    }
  }
`

const PriceWrap = styled.div`
  position: relative;
  display: flex;
  margin-bottom: 120px;

  .non_dscnt_price {
    font-size: 16px;
  }

  /* 할인가 스타일 적용 */
  .dscnt_price {
    font-size: 16px;
    margin: 0 8px;
  }

  .price {
    font-size: 16px;
    line-height: 20px;
    text-decoration: line-through;
    color: #aaa;
  }
`

const DeleteChkedBtn = styled.button`
  width: 80px;
  height: 32px;
  margin-top: 10px;
  font-size: 14px;
`

export default Cart;