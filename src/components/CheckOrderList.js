import { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { Link } from "react-router-dom";

function CheckOrderList() {

  const [orderList, setOrderList] = useState([]);
  useEffect(() => {

    axios.post('/afterPayList', {
      userNumber: sessionStorage.getItem("userNumber"),
    })
    .then(res => {
      setOrderList(res.data);
      console.log('주문내역조회',res.data);
    })
    .catch(error => {
      console.log(error);
    })
  }, []);


  return(
    <>
      <OrderListTable>
        <thead>
          <tr>
            <th scope="col" id="cart_list_info">상품 정보</th>
            <th scope="col" id="cart_list_quantity">수량</th>
            <th scope="col" id="cart_list_pay_price">주문 금액</th>
          </tr>
        </thead>

        {orderList ? 
          (
            orderList.map((items, index) => (
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
      </OrderListTable>
      
    </>
  )
}

const MyInfoContents = styled.div`
  table {
    width: 100%;
  }

  tbody {
    
    th {
      width: 120px;
      height: auto;
      padding: 16px 0;
      text-align: left;
    }
  }
`

const OrderListTable = styled.table`
width: 780px;
// background: pink;

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


export default CheckOrderList;