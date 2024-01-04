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
  const { pickedItems, totalPrice } = location.state;
  console.log('order.js pickedItems', pickedItems);
  console.log('totalPrice', totalPrice);
  const [userInfo, setUserInfo] = useState(null);
  const cartNumbers = pickedItems.map(item => item.cartNumber);

  // 결제완료된 상품 cartNumber보내기
  const submitPayList = async () => {
    try {
      const res = await axios.post('/afterPay', {
        // 카트넘버 배열에 담아서 보내기 
        cartNumber: cartNumbers,
      });
      console.log('afterPay res', res.data);
    } catch (error) {
      console.log(error);
    }
  }

  // 결제 완료된 상품은 cart에서 제거
  const orderCompleteDelFromCart = async () => {
    try {
      const res = await axios.post('/deleteCart', {
        cartNumber: cartNumbers,
      });
      console.log('afterPay res', res.data);
    } catch (error) {
      console.log(error);
    }
  }

  // 사용자 정보 표시
  useEffect(() => {
    axios.post('/myPage', {
      userNumber: sessionStorage.getItem("userNumber"),
    })
    .then(response => {
      setUserInfo(response.data);
      console.log('userInfo', response.data);
    })
    .catch(error => {
      console.log(error);
    })
  }, []);

  // import사용 설정
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

  // 결제하기 누르면 실행
  const requestPay = () => {
    const { IMP } = window;
    IMP.init('imp28217053');
    
    // 결제창 호출, { }안에는 결제 데이터 정의 - 이후에 vale 자리에 데이터 바인딩하기 
    IMP.request_pay({
      pg: 'kakaopay', //{PG사코드}.{PG상점ID}
      pay_method: 'card',
      merchant_uid: new Date().getTime(),
      name: `${pickedItems[0].productName} 외 ${pickedItems.length - 1}개`,
      amount: totalPrice, // 결제 금액
      buyer_email: userInfo.userEmail,
      buyer_name: userInfo.userName,
      buyer_tel: userInfo.userPhoneNumber,
      buyer_addr: userInfo.userAddress1 + userInfo.userAddress2 + userInfo.userAddress3,
      buyer_postcode: userInfo.userAddressNumber,
    }, async (res) => {
      try {
        const { data } = await axios.post('/verifyIamport/' + res.imp_uid); 
        // data: 서버에서 보내준 결과를 data라는 변수에 담는 것/ 서버 주소 뒤의 res.imp_uid는 결제 검증을 위해 요청 url에 보내는 값/ imp_uid는 아임포트 결제 후에 반환되는 response객체 내부에 있는 속성으로 아임포트에서 결제 완료 시 자동으로 생성되는 고유한 결제 ID
        console.log('data', data);
        
        if (res.paid_amount === data.response.amount) {
          alert('결제 성공');
          submitPayList();
          orderCompleteDelFromCart();

        } else {
          alert('결제가 취소되었습니다.');
          console.log('data', data);
        }
      } catch (error) {
        console.error('결제 오류!!!:', error);
        alert('결제가 취소되었습니다.');
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

        <section className="payment_section">
          <h3>결제 정보</h3>

          <div>
            <ul className="payment_method">
              <li className="payment_method_tit">결제 수단</li>
              <li>
                <button id="kakaopay" onClick={requestPay}>카카오 페이</button>
              </li>
            </ul>
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

  .payment_section {

    .payment_method {
      display: flex;

      .payment_method_tit {
        width: 120px;
        font-weight: 600;
      }

      #kakaopay {
        width: 120px;
        height: 40px;
        border: 1px solid #ccc;
        border-radius: 4px;
        background-color: #fff;
        cursor: pointer;
      }
    }
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