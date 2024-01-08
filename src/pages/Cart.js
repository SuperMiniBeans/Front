import styled from "styled-components";
import { Container, FlexBox } from "../styles/Layout";
import { BtnBorder } from "../styles/ButtonStyle";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import CartOptionChangeModal from "../components/CartOptionChangeModal";
import { removeFromCart, fetchCartList } from "../store";
import formatPrice from "../../src/utils/formatPrice";

function Cart() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.items);
  const [checkedProducts, setCheckedProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [editItemSelect, setEditItemSelect] = useState(null);

  // 옵션 수정 모달
  const [isModalOpened, setIsModalOpened] = useState(false);
  const closeModal = () => setIsModalOpened(false);

  // 리덕스 스토어에 저장된 state불러오기
  useEffect(() => {
    dispatch(fetchCartList());
  }, [dispatch]);

  // 수정하기 버튼 클릭
  const handleEditClick = (cartItems) => {
    setEditItemSelect(cartItems);
    setIsModalOpened(true);
  };

  console.log('선택된 항목cc', checkedProducts);
  
  // 체크박스 토글
  const handleCheckbox = (checked, cartNum) => {
    if(checked) {
      setCheckedProducts([...checkedProducts, cartNum]);
    } else {
      setCheckedProducts(checkedProducts.filter(id => id !== cartNum));
    }
  }

  // 전체 선택
  const handleAllCheck = (checked) => {
    if(checked) {
      const cartNumArray = [];
      cartItems.forEach(id => cartNumArray.push(id.cartNumber));
      setCheckedProducts(cartNumArray);
    } else {
      setCheckedProducts([]);
    }
  }

  // '삭제하기'클릭
  const handleRemoveEachCart = (id) => {
    const confirmResult = window.confirm("상품을 삭제하시겠습니까?");

    if (!confirmResult) {
      return;
    }

    const clickRemove = [...checkedProducts, id];
    setCheckedProducts(clickRemove);

    axios.post('/deleteCart', {
      cartNumber: clickRemove,
    })
      .then(res => {
        console.log(res.data);
        dispatch(removeFromCart(id));
        dispatch(fetchCartList());
      })
      .catch(error => {
        console.log(error);
      })
    window.alert("장바구니에서 삭제되었습니다.");
  }

  // '선택삭제' 클릭
  const handelRemoveCart = () => {
    const confirmResult = window.confirm("상품을 삭제하시겠습니까?");

    if (!confirmResult) {
      return;
    }

    axios.post('/deleteCart', {
      cartNumber: checkedProducts,
    })
      .then(response => {
        console.log(response.data);
        checkedProducts.forEach(id => {
          dispatch(removeFromCart(id));
        });
        dispatch(fetchCartList());
      })
      .catch(error => {
        console.log(error);
      });
      
    window.alert("장바구니에서 삭제되었습니다.");
  }

  // 체크한 상품 주문하기
  const handelOrder = async () => {
    if(checkedProducts.length === 0) {
      window.alert("상품을 선택해주세요.");
      return;
    }

    try {
      const pickCartRes = await axios.post('/pickCart', {
        cartNumber: checkedProducts,
      });
      console.log('pickCart', pickCartRes.data);
  
      const allCartPriceRes = await axios.post('/allCartPrice', {
        cartNumber: checkedProducts,
      });
      console.log('allCartPrice', allCartPriceRes.data);
  
      navigate('/order', {
        state: { 
          pickedItems: pickCartRes.data, 
          totalPrice: allCartPriceRes.data.discountTotalPrice,
        }
      });
    } catch (error) {
      console.log(error);
    }
  }

  // 개별 상품 주문하기 
  const handelOrderEach = async (id) => {
    const clickOrderEach = [...checkedProducts, id];
    setCheckedProducts(clickOrderEach);

    try {
      const pickCartRes = await axios.post('/pickCart', {
        cartNumber: clickOrderEach,
      });
  
      const allCartPriceRes = await axios.post('/allCartPrice', {
        cartNumber: clickOrderEach,
      });
      console.log('allCartPrice', allCartPriceRes.data);
  
      navigate('/order', {
        state: { 
          pickedItems: pickCartRes.data, 
          totalPrice: allCartPriceRes.data.discountTotalPrice,
        }
      });
    } catch (error) {
      console.log(error);
    }
    console.log('checkedProducts', checkedProducts)
  }

  // 모달 밖에서 스크롤 금지
  useEffect(() => {
    if(isModalOpened) {
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflowY = "auto";
    }
  });

  // 주문 할 상품의 총 금액
  console.log('cartItems', cartItems);
  useEffect(() => {
    // 선택한 상품의 총 금액을 계산합니다.
    const sumPrice = checkedProducts.reduce((sum, cart_num) => {
      const product = cartItems.find(product => product.cartNumber === cart_num);
      const finalPrice = product.discountRate > 0 ? product.discountPrice : product.productPrice;
      return sum + finalPrice * product.totalCount
    }, 0);
    setTotal(sumPrice);
  }, [cartItems ,checkedProducts]);  // 선택한 상품이 변경될 때마다 총 금액을 다시 계산합니다.
  

  return(
    <CartWrap>
      <Container>
        <h2>장바구니</h2>

        <ProductSection className="product-section">
          <table>

            <thead>
              <tr>
                <th scope="col" id="cart_list_total_count">전체 {cartItems.length}개</th>
                <th scope="col" id="cart_list_chk">
                  <input 
                    type="checkbox" 
                    onChange={e => handleAllCheck(e.target.checked)} 
                    checked={cartItems.length > 0 && checkedProducts.length === cartItems.length ? true : false}
                    disabled={cartItems.length < 1 ? true : false}
                  />
                </th>
                <th scope="col" id="cart_list_info">상품 정보</th>
                <th scope="col" id="cart_list_price">판매가</th>
                <th scope="col" id="cart_list_quantity">수량</th>
                <th scope="col" id="cart_list_pay_price">주문 금액</th>
                <th scope="col" id="cart_list_etc_btn"></th>
              </tr>
            </thead>

            {/* map으로 돌리기 + 데이터 바인딩 (----------여기부터) */}
            {cartItems.length === 0 ? 
              <tbody>
                <tr>
                  <td colSpan={8}>
                    장바구니에 담긴 상품이 없습니다.
                  </td>
                </tr>
              </tbody>
            : 
            (
              cartItems.map((items, index) => (
                <tbody key={index}>
                  <tr className="tbody_content">
                    <td>{index + 1}</td>

                    <td>
                      <input 
                        type="checkbox" 
                        onChange={e => 
                          handleCheckbox(e.target.checked, items.cartNumber)
                        }
                        checked={
                          checkedProducts.includes(items.cartNumber) ? 
                          true : false
                        }
                      />
                    </td>

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
                          <div>
                            <button 
                              id="option_change" 
                              onClick={() => handleEditClick(items)}
                            >
                              옵션 변경
                            </button>
                          </div>
                        </div>
                      </div> {/* cart_item_info */}
                    </td>
    
                    <td>
                    {items.discountRate > 0 ? (
                      <PriceWrap>
                        <span className="price">
                          {formatPrice(items.productPrice)}원
                        </span>
                        <span className="dscnt_price">
                          {formatPrice(items.discountPrice)}원
                        </span>
                      </PriceWrap>
                    ) : (
                      <PriceWrap>
                        <span className="non_dscnt_price">{formatPrice(items.productPrice)}원</span>
                      </PriceWrap>
                    )}
                    </td>

                    <td>{items.cartCount}개</td>

                    <td>
                      {items.discountRate > 0 ? 
                        <>
                          {formatPrice(items.cartCount * items.discountPrice)}원
                        </>
                      :
                        <>
                          {formatPrice(items.cartCount * items.productPrice)}원
                        </>
                      }
                    </td>

                    <td className="cart_table_btn_wrap">
                      <div>
                        <button id="click_order_btn" onClick={() => handelOrderEach(items.cartNumber)}>주문하기</button>
                      </div>
                      <div>
                        <button id="click_whish">찜</button>
                      </div>
                      <div>
                        <button 
                          onClick={() => handleRemoveEachCart(items.cartNumber)}
                        >
                          삭제하기
                        </button>
                      </div>
                    </td>
                    
                  </tr>
                </tbody>
              ))
            )}
            {/* map으로 돌리기 (여기까지-----------)*/}
          </table>

          {isModalOpened && 
            <CartOptionChangeModal 
              isModalOpened={isModalOpened} 
              closeModal={closeModal} 
              items={editItemSelect}
            />
          }

          <div>
            <DeleteChkedBtn 
              type="submit" 
              onClick={handelRemoveCart}
              disabled={checkedProducts.length > 0 ? false : true}
            >
              선택 삭제
            </DeleteChkedBtn>
          </div>
        </ProductSection>

        {cartItems.length > 0 ?
          <>
            <TotalPriceSection className="total_price_section">
              <div className="total_box">
                <div className="total_box_title">총 주문금액</div>
                <div className="total_price">{formatPrice(total)}원</div>
              </div>
            </TotalPriceSection>
            
            <div className="order_btn_box">
              <button id="order_btn" onClick={handelOrder}>주문하기</button>
            </div>
          </>
        :
          <></>
        }
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

  // 주문하기 버튼
  .order_btn_box {
    display: flex;
    justify-content: center;
    // background: pink;

    #order_btn {
      width: 200px;
      height: 60px;
      font-size: 20px;
      color: #fff;
      border: none;
      background-color: #333;
      cursor: pointer;
    }
  }
`

const ProductSection = styled.section`
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
  #cart_list_etc_btn {
    width: 100px;
  }

  #cart_list_chk,
  #cart_list_quantity {
    width: 80px;
  }

  #cart_list_pay_price,
  #cart_list_price {
    width: 160px;
    // background-color: red;
  }

  tbody {
    height: 160px;

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
      margin-bottom: 4px;
    }

    .selected_option {
      margin-bottom: 10px;
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

  .cart_table_btn_wrap {

    div:nth-child(2) > button {
      margin: 4px 0;
    }

    button {
      padding: 4px 8px;
      font-size: 12px;
      color: #666;
      border: 1px solid #ccc;
      border-radius: 2px;
      background: none;
      cursor: pointer;
    }

    #click_order_btn {
      color: #fff;
      background: #333;
      border: 1px solid #333;
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
    margin: 0 8px;
  }

  .price {
    font-size: 16px;
    text-decoration: line-through;
    color: #aaa;
  }
`

const DeleteChkedBtn = styled(BtnBorder)`
  width: 80px;
  height: 32px;
  margin-top: 10px;
  font-size: 14px;
  color: #333;
  border: 1px solid #ccc;
  border-radius: 4px;

  &:disabled {
    color: #ccc;
    cursor: default;
  }
`

const TotalPriceSection = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 120px;
  margin: 100px 0;
  border-top: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
  background-color: #f9f9f9;
  // background-color: #eee;


  .total_box {
    display: flex;
    font-size: 32px;
    text-align: center;
    // background: blue;
  }

  .total_box_title {
    font-size: 20px;
    line-height: 32px;
    // height: 40px;
  }

  .total_price {
    margin-left: 100px;
    font-weight: 600;
  }
`

export default Cart;