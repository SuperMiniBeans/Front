import styled from "styled-components";
import { Container, FlexBox, FlexBoxSB } from "../styles/Layout";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addToCart } from "../store";


/* 
1. admin이 isLogin===true이면 [수정]버튼 보이게 하기 ( )
2. [수정] 버튼 클릭하면 상품 수정 페이지로 이동( )
상품 등록 페이지로 이동하되 기존 데이터는 남아있게
3. 할인가 표시하기 - 서버에서 받은 데이터 중에서 할인가 있으면 할인가 표시
*/



function ProductDetail() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    productName: '',
    productPrice: 0,
    discountRate: 0,
    discountPrice: 0,
    productSizes: [],
    productColors: [],
    productQuantity: 0,
    productExplanation: '',
    productExplanation1: '',
    productExplanation2: '',
  })
  const {productName, productPrice, discountRate, discountPrice, productSizes, productColors, productQuantity, productExplanation, productExplanation1, productExplanation2} = product;

  // 이미지 데이터 배열로 저장
  const [imgData, setImgData] = useState([]);

  /* db에 저장된 상품 데이터 불러오기(비동기) */
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post('/productView', {
          productNumber: id
        })
        setImgData(response.data);
        setProduct(response.data[0]);
        sessionStorage.setItem("productNumber", response.data[0].productNumber);
        // setMajorCategory(response.data[0].categoryMajorCode);
        // setMinorCategory(response.data[0].categoryMinorCode);
      }
      catch(error) {
        console.log(error);
        if(product.length === 0) {
          console.log('데이터 없음');
        }
      }
    }
    fetchData();
  }, [id]);
  
  
  /* 이미지 경로 배열에 담기 */
  const [imgPathList, setImgPathList] = useState([]);
  useEffect(() => {
    const newImgPathList = imgData.map(item => 
      `/upload/${item.fileUploadPath}/${item.fileUuid}_${item.fileName}`
    );
    setImgPathList(newImgPathList);
  }, [imgData]); 
  // console.log('imgPathList', imgPathList);


  /* 선택한 옵션을 화면에 나타내기 */
  // 옵션 선택
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  
  const handleSelectedSize = e => {
    setSelectedSize(e.target.value);
    setSelectedColor('');
  }
  
  const handleSelectedColor = e => {
    setSelectedColor(e.target.value);
  }

  // 선택된 옵션 보여주기
  const [selectedOptions, setSelectedOptions] = useState([]);
  // const [sum, setSum] = useState(0);
  // const [count, setCount] = useState(1);



  console.log('selectedOptions', selectedOptions);

  const handleAddOption = () => {
    if (selectedColor && selectedSize) {
      let price = Number(discountRate !== null ? discountPrice : productPrice);
      const newOption = { 
        id: id, 
        img: imgPathList[0],
        name: productName,
        text: selectedSize + ", " + selectedColor,
        size: selectedSize, 
        color: selectedColor,
        quantity: 1, 
        sum: price,
      };
  
      const existingOptionIndex = selectedOptions.findIndex(option => 
        option.text === newOption.text
      );
  
      if (existingOptionIndex >= 0) {
        // 이미 존재하는 옵션의 수량 증가
        const newOptions = [...selectedOptions];
        alert("이미 선택된 옵션 입니다.");
        // setSelectedOptions(newOptions);
        return newOptions; 

      } else {
        // 새로운 옵션 추가
        setSelectedOptions([...selectedOptions, newOption]);
      }
  
      // setSum(prevSum => prevSum + price);
    }
  };

  const minus = (optionIndex) => {
    const updatedOptions = [...selectedOptions];
    if(updatedOptions[optionIndex].quantity > 1) {
      updatedOptions[optionIndex].quantity -= 1;
      setSelectedOptions(updatedOptions);
    }
  };

  const plus = (optionIndex) => {
    const updatedOptions = [...selectedOptions];
    updatedOptions[optionIndex].quantity += 1;
    setSelectedOptions(updatedOptions);
  };

  const removeOption = (optionIndex) => {
    const updatedOptions = [...selectedOptions];
    updatedOptions.splice(optionIndex, 1);
    setSelectedOptions(updatedOptions);
  };
  
  const calculatePrice = (optionIndex) => {
    let option = selectedOptions[optionIndex];
    let totalPrice = option.sum * option.quantity;
    return totalPrice;
};


  /* '장바구니 담기' 클릭하면 실행 */
  // 이것도 비동기로 처리해야?? ( )
  // 장바구니에 담긴 상품 또 담으려고 하면 이미 담긴 상품이라는 alert띄우기 ( )
  /* cartCount - 어떻게 구할지에 따라 수정 */

  // const addCart = () => {
  //   if(selectedOptions.length > 0) {
  //     // 모든 요청을 담을 배열
  //     const requests = selectedOptions.map(option => 
  //       axios.post('/addCart', {
  //         userNumber: sessionStorage.getItem("userNumber"),
  //         productNumber: id,
  //         cartCount: 12,
  //         selectedSize: option.size,
  //         selectedColor: option.color,
  //       })
  //     );

  //     // 모든 요청이 완료될 때까지 기다림
  //     Promise.all(requests)
  //       .then(responses => {
  //         // 모든 요청이 성공적으로 완료된 후에 액션 디스패치
  //         selectedOptions.forEach(option => {
  //           dispatch(addToCart(option));
  //         });

  //         // 로컬 스토리지에 아이템 저장
  //         const cart = JSON.parse(localStorage.getItem('cart')) || {};
  //         selectedOptions.forEach(option => {
  //           const productOptions = cart[option.id] || [];
  //           productOptions.push(option);
  //           cart[option.id] = productOptions;
  //         });
  //         localStorage.setItem('cart', JSON.stringify(cart));

  //         alert("장바구니에 상품이 담겼습니다.");
  //       })
  //       .catch(error => {
  //         console.log(error);
  //       });
  //   } else {
  //     alert("옵션을 선택해 주세요.");
  //   }
  // }

  // api빼고 리덕스랑 세션스토리지만 테스트
  const addCart = () => {
    if(selectedOptions.length > 0) {
      // store에 아이템 저장
      selectedOptions.forEach(option => {
        dispatch(addToCart(option));
      });

      // 로컬 스토리지에 아이템 저장
      const cart = JSON.parse(localStorage.getItem('cart')) || {};
      selectedOptions.forEach(option => {
        const productOptions = cart[option.id] || [];
        productOptions.push(option);
        cart[option.id] = productOptions;
      });
      localStorage.setItem('cart', JSON.stringify(cart));

    } else {
      alert("옵션을 선택해 주세요.");
    }
  }


















  return(
    <ProductDetailWrap>
      <Container>
        <CtgryWrap>
          <FlexBox>
            <div>대분류</div>
            <span></span>
            <div>소분류</div>
          </FlexBox>
          <div><h2>현재 카테고리</h2></div>
        </CtgryWrap>

        <FlexBox>
          <div className="left">
            <ThumbWrap className="detail_img_wrap">
              <div className="main_img">
                <img id="admin_thumb_img" src={`${imgPathList[0]}`} alt="thumbnail" />
              </div>
              <div className="next_img_wrap">
                {imgPathList.map((img, index) => (
                  <img src={`${img}`} key={index} alt="등록한 이미지"/>
                ))}
              </div>
            </ThumbWrap>
          </div>

          <div className="right">
            <InfoWrap className="detail_infos_wrap">
              <div><h3>{productName}</h3></div>
              <PriceWrap>
                {discountRate > 0 ? (
                  <>
                    <span className="dscnt_rate">{discountRate}%</span>
                    <span className="dscnt_price">{discountPrice}</span>
                    <span className="price">{productPrice}</span>
                  </>
                ) : (
                  <>
                    <span className="non_dscnt_price">{productPrice}</span>
                  </>
                )}
              </PriceWrap>

              <SelectBox className="select_box">
                <select
                  value={selectedSize || ""}
                  onChange={handleSelectedSize}
                >
                  <option value="">사이즈 선택</option>
                  {productSizes.map((size) => (
                    <option key={size} value={size}>
                      {size}
                    </option>
                  ))}
                </select>

                <select
                  value={selectedColor || ""}
                  onChange={handleSelectedColor}
                  onClick={handleAddOption}
                  >
                  <option value="">색상 선택</option>
                  {selectedSize && productColors.map((color) => (
                    <option key={color} value={color}>
                      {color}
                    </option>
                  ))}
                </select>

                <SelectedOptionBox>
                    <ul>
                      {selectedOptions.map((option, index) => (
                        <li key={index}>
                          <FlexBox>
                            <span id="option_text">{option.text}</span>
                            <button id="minus_btn" onClick={() => minus(index)}>-</button>
                            <span id="option_quantity">{option.quantity ? option.quantity : 1}</span>
                            <button id="plus_btn" onClick={() => plus(index)}>+</button>
                            <span id="option_cal_price">{calculatePrice(index)}원</span>
                            <button id="remove_btn" onClick={() => removeOption(index)}>x</button>
                          </FlexBox>
                        </li>    
                      ))}
                    </ul>
                </SelectedOptionBox>
                <FlexBoxSB>
                  <div>총 상품 금액</div>
                  <div>계산 값</div>
                </FlexBoxSB>
              </SelectBox> {/* select_box */}

              <div className="btn_wrap">
                <button>바로구매</button>
                <button onClick={addCart}>장바구니 담기</button>
                <button>하트</button>
              </div>


              {/* 아코디언 메뉴 참고 -> 간단하게 이미지 클릭하면 state를 변경시켜 해당 메뉴 스타일 display none 에서 블락으로 변경만 시켜주면 될것 같습니다 */}
              <div className="explanation">
                <p>
                  {productExplanation}
                  {/* 상품 설명입니다. 소재, 디자인 포인트, 활용 방법 등에 관해 설명하면 됩니다. 상품 설명입니다. 소재, 디자인 포인트, 활용 방법 등에 관해 설명하면 됩니다.상품 설명입니다. 소재, 디자인 포인트, 활용 방법 등에 관해 설명하면 됩니다.상품 설명입니다. 소재, 디자인 포인트, 활용 방법 등에 관해 설명하면 됩니다.상품 설명입니다. 소재, 디자인 포인트, 활용 방법 등에 관해 설명하면 됩니다.상품 설명입니다. 소재, 디자인 포인트, 활용 방법 등에 관해 설명하면 됩니다.상품 설명입니다. 소재, 디자인 포인트, 활용 방법 등에 관해 설명하면 됩니다. */}
                </p>
              </div>
              <div className="size_guide">
                <p>
                  {productExplanation1}
                  {/* 사이즈 가이드 설명 쓰세요<br />
                  상세 사이즈 표시하기 <br /> */}
                </p>
              </div>
              <div className="shipping_guide">
                <p>
                  {productExplanation2}
                  {/* 배송 및 환불 안내 <br />
                  배송은 어쩌구 저쩌구 <br />
                  환불은 이래이래 저래저래 */}
                </p>
              </div>
            </InfoWrap> {/* detail_infos_wrap */}
          </div> {/* right */}
        </FlexBox>

      </Container>
    </ProductDetailWrap>
  )
}

const ProductDetailWrap = styled.div`
width: 100%;
min-width: 1200px;
// background-color: orange;

  .left {
    width: 580px;
    height: 100%;
    margin-right: 20px;
    // background-color: yellowgreen;
  }
  
  .right {
    // width: 50%;
    width: 400px;
    // background-color: yellow;
  }
`

const CtgryWrap = styled.div`

  /* CtgryWrap의 first-child는 FlexBox컴포넌트 */
  div:first-child { 
    line-height: 20px;
  }

  span {
    position: relative;
    width: 20px; 
    height: 20px;
  }

  span::after {
    position: absolute;
    left: 24%; top: 32%;
    content: '';
    width: 6px;
    height: 6px;
    border-top: 2px solid #aaa; 
    border-right: 2px solid #aaa; 
    transform: rotate(45deg); 
    // background-color: red;
  }

  h2 {
    margin: 8px 0 20px;
  }
`

const ThumbWrap = styled.div`
  // width: 50%;
  // background-color: red;

  .main_img {
    width: 580px;
    height: 704px;
    margin-bottom: 10px;

    img {
      width: 580px;
      height: 704px;
      object-fit: cover;
    }
  }

  .next_img_wrap {
    width: 100%;
    display: flex;
    // background-color: pink;

    img {
      width: 80px;
      height: 94px;
      margin-right: 10px;
      object-fit: cover;
      cursor: pointer;
    }
  }
`

const InfoWrap = styled.div`
  h3 {
    font-size: 24px;
    margin-bottom: 10px;
  }
`

const PriceWrap = styled.div`
  position: relative;
  display: flex;
  margin-bottom: 120px;

  .non_dscnt_price {
    line-height: 20px;
    font-size: 20px;
  }

  /* 할인가 스타일 적용 */
  .dscnt_rate {
    font-size: 20px;
    color: red;
  }

  .dscnt_price {
    font-size: 20px;
    margin: 0 8px;
  }

  .price {
    font-size: 14px;
    line-height: 20px;
    text-decoration: line-through;
    color: #aaa;
  }
`

const SelectBox = styled.div`
  margin-bottom: 40px;

  select {
    width: 400px;
    height: 28px;
    margin-bottom: 10px;
    padding: 0 10px;
    font-size: 12px;
    border: 1px solid #ccc;
    border-radius: none;

    &:first-child {
      margin-bottom: 4px;
    }
  }

`

const SelectedOptionBox = styled.div`
  display: flex;
  justify-content: space-between;
  width: 400px;
  height: auto;
  font-size: 14px;

  ul {
    
    li {
      display: flex;
      align-items: centery;
      width: 400px;
      height: 40px;
      padding-left: 10px;
      // border-bottom: 1px solid #ccc;
      background-color: orange;
      margin-bottom: 4px;

      #minus_btn,
      #plus_btn,
      #remove_btn {
        width: 20px;
        height: 20px;
        border-radius: none;
        cursor: pointer;
      }

      #option_text {
        display: flex;
        align-items: center;
        width: 200px;
        background-color: yellow;

      }

      #minus_btn {
        // margin-left: 120px;
      }

      #option_quantity {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 20px;
      }

      #plus_btn {
        // margin-right: 80px;
      }

      #option_cal_price {
        display: flex;
        align-items: center;
      }

      #remove_btn {
        margin-left: 20px;
        right: 0;
        border: none;
        background: none;
      }
    }
  }
`

export default ProductDetail;