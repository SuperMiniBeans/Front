import styled from "styled-components";
import { Container, FlexBox } from "../styles/Layout";
import { useState, useEffect } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import CartOptionChangeModal from "../components/CartOptionChangeModal";
import { loadCart } from "../store";



// 삭제하기 구현( )



function Cart() {
  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state.cart.items);
  console.log('reduxcart cartItems', cartItems);

  // 로컬 스토리지에 있는 데이터 store.js-state에 저장하기
  const [refresh, setRefresh] = useState(1);
  useEffect(() => {
    const savedItems = JSON.parse(localStorage.getItem('cart')) || [];
    dispatch(loadCart(savedItems));
    setRefresh(refresh => refresh * -1);
  }, [dispatch, refresh]);

  // 옵션 수정 모달
  const [isModalOpened, setIsModalOpened] = useState(false);
  const closeModal = () => setIsModalOpened(false);

  // 수정하기 버튼 클릭
  const [editItemSelect, setEditItemSelect] = useState(null);
  const handleEditClick = (cartItems) => {
    setEditItemSelect(cartItems);
    setIsModalOpened(true);
  };
  
  // 체크박스 토글
  const [checkedProducts, setCheckedProducts] = useState([]);
  console.log('선택된 항목', checkedProducts);
  const handleCheckbox = (checked, itemsId) => {
    if(checked) {
      setCheckedProducts([...checkedProducts, itemsId]);
    } else {
      setCheckedProducts(checkedProducts.filter(id => id !== itemsId));
    }
  }

  // 전체 선택
  const handleAllCheck = (checked) => {
    if(checked) {
      const pNumArray = [];
      cartItems.forEach((id) => pNumArray.push(id.id));
      setCheckedProducts(pNumArray);
    } else {
      setCheckedProducts([]);
    }
  }

  // 선택 삭제 - api 수정하기
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
              <th scope="col" id="cart_list_total_count">전체 {cartItems.length}개</th>
              <th scope="col" id="cart_list_chk">
                <input type="checkbox" 
                        onChange={e => handleAllCheck(e.target.checked)} 
                        checked={checkedProducts.length === cartItems.length ? true : false}
                />
              </th>
              <th scope="col" id="cart_list_info">상품 정보</th>
              <th scope="col" id="cart_list_price">판매가</th>
              <th scope="col" id="cart_list_pay_price">주문 금액</th>
              <th scope="col" id="cart_list_etc_btn"></th>
            </tr>
          </thead>

          {/* map으로 돌리기 + 데이터 바인딩 (----------여기부터) */}
          {cartItems.length === 0 ? (
            <tbody>
              <tr>
                <td colSpan={8}>
                  장바구니에 상품이 없습니다.
                </td>
              </tr>
            </tbody>
          ) : (
            cartItems.map((items, index) => (
              <tbody key={index}>
                <tr className="tbody_content">
                  <td>{index + 1}</td>

                  <td>
                    <input type="checkbox" 
                          onChange={e => handleCheckbox(e.target.checked, items.id)}
                          checked={checkedProducts.includes(items.id) ? true : false}
                    />
                  </td>

                  <td>
                    <FlexBox className="cart_item_info">
                      <div id="admin_thumb_box">
                        <Link to={`/product/list/detail/${items.productNumber}`}>
                          {/* <img id="admin_thumb_img" src={`/upload/${items.fileUploadPath}/th_${items.fileUuid}_${items.fileName}`} alt="thumbnail" /> */}
                          <img id="admin_thumb_img" src={items.img} alt={items.name} />

                        </Link>
                      </div>
                      <div>
                        <Link to={`/product/list/detail/${items.productNumber}`}>
                          <div className="cart_product_name">{items.name}</div>
                        </Link>
                        <div className="selected_option">옵션: {items.size} / {items.color} / {items.quantity}</div>
                        <div><button id="option_change" onClick={() => handleEditClick(items)}>사이즈/수량 변경</button></div>
                      </div>
                    </FlexBox>
                  </td>
  
                  <td>
                    <PriceWrap>
                      {cartItems.discountRate > 0 ? (
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

                  <td>가격 * 수량</td>

                  <td>
                    <div><button>주문하기</button></div>
                    <div><button>찜</button></div>
                    <div><button>삭제하기</button></div>
                  </td>
                  
                </tr>
              </tbody>
            ))
          )}
          {/* map으로 돌리기 (여기까지-----------)*/}
        </table>
        
        {isModalOpened && 
          <CartOptionChangeModal isModalOpened={isModalOpened} closeModal={closeModal} items={editItemSelect}/>
        }

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
    border-right: 1px solid #000;
  }

  #cart_list_info {
  }
  
  #cart_list_pay_price,
  #cart_list_price,
  #cart_list_etc_btn {
    width: 160px;
    background-color: red;
  }

  tbody {
    height: 80px;
    background-color: pink;

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
    width: 100%;
    padding-left: 20px;
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