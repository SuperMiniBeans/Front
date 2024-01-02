import { Container } from "../styles/Layout";
import styled from "styled-components";
import { useState, useEffect } from "react";
import axios from "axios";
import MyInfo from "../components/MyInfo";
import { useDispatch } from "react-redux";
import { Link, useLocation } from "react-router-dom";

// 디자인 레퍼런스 다시 찾아서 해보기( )

/* 프론트에서 아임포트로 직접요청하지말고 서버(스프링)에서 해야합니다.

받는 서버는 아래처럼 구현해야 합니다.

1. 데이터를 받는다.
2. 검증요청을 한다
3. 검증요청 후 결과가 정상이면 결재요청을한다
4. 결재후 결과값을 프론트에게 되돌려준다.

프론트는 axios 모듈을 활용하여 서버에게 결재를 요청(예: http:x.x.x.x/결재요청) 하고,

서버는 프론트한테 요청 받으면 위 4단계 다 하고나서 결과값을 프론트에게 되돌려주면됩니다.

카카오톡, 네이버 및 구글 같은 소셜로그인, 디지털원패스와 비슷한 개념입니다!
*/

// 결제 완료 후 이동할 페이지 만들기( )


function Order() {
  const dispatch = useDispatch();
  const location = useLocation();
  const { pickedItems } = location.state;
  console.log('order pickedItems', pickedItems);


  /* 없어도 되는 부분인가? 나중에 실행해서 확인해보기 (여기부터) */
  useEffect(() => {
    const jquery = document.createElement("script");
    jquery.src = "http://code.jquery.com/jquery-1.12.4.min.js";
    const iamport = document.createElement("script");
    iamport.src = "http://cdn.iamport.kr/js/iamport.payment-1.1.7.js";
    document.head.appendChild(jquery);
    document.head.appendChild(iamport);
    return () => {
      document.head.removeChild(jquery);
      document.head.removeChild(iamport);
    };
  }, []);
  /* 없어도 되는 부분인가? 나중에 실행해서 확인해보기 (여기까지) */


  const requestPay = () => {
    const { IMP } = window;
    IMP.init('imp28217053');

    // 결제창 호출, { }안에는 결제 데이터 정의 - 이후에 vale 자리에 데이터 바인딩하기 
    IMP.request_pay({
      pg: 'kakaopay', //{PG사코드}.{PG상점ID}
      pay_method: 'card',
      merchant_uid: new Date().getTime(),
      name: '결제 테스트',
      amount: 1004, // 결제 금액
      buyer_email: 'applej07@naver.com',
      buyer_name: '송하정',
      buyer_tel: '010-5113-5826',
      buyer_addr: '서울특별시',
      buyer_postcode: '123-456',
    }, async (res) => {
      try {
        const { data } = await axios.post('/' + res.imp_uid); // data: 서버에서 보내준 결과를 data라는 변수에 담는 것/ 서버 주소 뒤의 res.imp_uid는 결제 검증을 위해 요청 url에 보내는 값/ imp_uid는 아임포트 결제 후에 반환되는 response객체 내부에 있는 속성으로 아임포트에서 결제 완료 시 자동으로 생성되는 고유한 결제 ID
        if (res.paid_amount === data.response.amount) { // 요청 결제 금액이 서버에서 반환하는 금액과 같으면 결제성공!/ data.response.amount에서 amount는 서버 코드에 작성된 변수에 맞추기
          alert('결제 성공');
        } else {
          alert('결제 실패');
        }
      } catch (error) {
        console.error('결제 오류!!!:', error);
        alert('결제 실패');
      }
    });
  }


  return(
    <OrderWrap>
      <Container>
        <h2>주문 / 결제</h2>

        <section className="shipping-info-section">
          <h3>배송 정보</h3>
          <MyInfo />
        </section>

        <section className="order-item-section">
          <h3>상품 정보</h3>
          <OrderItemsTable>
            <thead>
              <tr>
                <th scope="col" id="cart_list_info">상품 정보</th>
                <th scope="col" id="cart_list_quantity">수량</th>
                <th scope="col" id="cart_list_pay_price">주문 금액</th>
              </tr>
            </thead>

            {pickedItems ? 
              (
                pickedItems.map((items, index) => (
                  <tbody key={index}>
                    <tr className="tbody_content">
  
                      <td>
                        <div className="cart_item_info">

                          <div id="admin_thumb_box">
                            <Link to={`/product/list/detail/${items.productNumber}`}>
                              <img 
                                id="cart_thumb_img" 
                                src={`/upload/${items.fileUploadPath}/th_${items.fileUuid}_${items.fileName}`} 
                                alt={items.productName} 
                              />
                            </Link>
                          </div>

                          <div>
                            <Link to={`/product/list/detail/${items.productNumber}`}>
                              <div className="cart_product_name">{items.productName}</div>
                            </Link>
                            <div className="selected_option">
                              옵션: {items.selectedSize} / {items.selectedColor}
                            </div>
                          </div>

                        </div> {/* cart_item_info */}
                      </td>
  
                      <td>{items.cartCount}개</td>
  
                      <td>
                      {items.discountRate > 0 ? (
                        <PriceWrap>
                          <span className="price">
                            {items.cartCount * items.productPrice}원
                          </span>
                          <span className="dscnt_price">
                            {items.cartCount * items.discountPrice}원
                          </span>
                        </PriceWrap>
                      ) : (
                        <PriceWrap>
                          <span className="non_dscnt_price">
                            {items.productPrice}원
                          </span>
                        </PriceWrap>
                      )}
                      </td>
                    </tr>
                  </tbody>
                ))
              )
            :
              <tbody>
                <tr>
                  <td colSpan={3}>
                    주문한 상품이 없습니다.
                  </td>
                </tr>
              </tbody>
            }
            </OrderItemsTable>
        </section>

        <section className="payment-section">
          <h3>결제 정보</h3>
          <div>
            <button onClick={requestPay}>결제하기</button>
          </div>
        </section>

      </Container>
    </OrderWrap>
  )
}

const OrderWrap = styled.div`
  width: 100%;
  min-width: 1200px;

  h2 {
    margin-bottom: 30px;
    text-align: center;

  }

  section {
    padding-bottom: 20px;
    border-bottom: 1px solid #eee;
  }

  h3 {
    margin-top: 40px;
    margin-bottom: 20px;
    padding-bottom: 10px;
    font-size: 20px;
    font-weight: 600;
    border-bottom: 2px solid #333;
  }
`

const OrderItemsTable = styled.table`
  width: 780px;

  caption {
    font-size: 0;
  }

  // 테이블 스타일 설정
  th,
  td {
    padding: 10px 0;
    text-align: center;
    border: 1px solid #ccc;
  }

  thead {
    font-weight: 600;
  }

  #cart_list_quantity {
    width: 80px;
  }

  #cart_list_pay_price {
    width: 160px;
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
  #cart_thumb_img {
    width: 60px;
    height: 80px;
    object-fit: cover;
  }

  .cart_item_info {
    display: flex;
    align-items: center;
    width: 100%;
    padding-left: 20px;
    text-align: left;

    .cart_product_name {
      margin-bottom: 10px;
    }

    .selected_option {
      font-size: 14px;
      color: #333;
    }
  }
`


const PriceWrap = styled.div`
  // position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .non_dscnt_price {
    font-size: 16px;
  }

  /* 할인가 스타일 적용 */
  .dscnt_price {
    font-size: 16px;
  }

  .price {
    margin-bottom: 4px;
    font-size: 16px;
    text-decoration: line-through;
    color: #aaa;
  }
`

export default Order;