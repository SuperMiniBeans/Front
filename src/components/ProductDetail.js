import styled from "styled-components";
import { Container, FlexBox } from "../styles/Layout";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function ProductDetail() {

  /* 
  1. admin이 isLogin===true이면 [수정]버튼 보이게 하기 ( )
  2. [수정] 버튼 클릭하면 상품 수정 페이지로 이동( )
  상품 등록 페이지로 이동하되 기존 데이터는 남아있게
  */

  const { id } = useParams();

  const [product, setProduct] = useState({
    productName: '',
    productPrice: 0,
    discountRate: 0,
    discountPrice: 0,
    productSize: '',
    productColor: '',
    productQuantity: 0,
    productExplanation: '',
    productExplanation1: '',
    productExplanation2: '',
  })
  const {productName, productPrice, discountRate, discountPrice, productSize, productColor, productQuantity, productExplanation, productExplanation1, productExplanation2} = product;

  // 이미지 데이터 배열로 저장
  const [imgData, setImgData] = useState([]);


  // DB에 저장된 게시글 불러와서 보여주기
  /* https://onethejay.tistory.com/194 */
  // useEffect(() => { 
  //   axios.post('/productView', {
  //     productNumber: id,
  //   })
  //     .then(response => {
  //       console.log('데이터', response.data);
  //       setProduct(response.data[0]);
  //       // setMajorCategory(response.data[0].categoryMajorCode);
  //       // setMinorCategory(response.data[0].categoryMinorCode);
  //     })
  //     .catch(error => {
  //       console.log(error);
  //       if(product.length === 0) {
  //         console.log('데이터 없음');
  //       }
  //     })
  // }, [id]);

  // 데이터 불러오기(비동기)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post('/productView', {
        productNumber: id
        })
        setImgData(response.data);
        setProduct(response.data[0]);
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

  // 이미지 경로 배열에 담기
  const [imgPathList, setImgPathList] = useState([]);
  useEffect(() => {
    const newImgPathList = imgData.map(item => 
      `/upload/${item.fileUploadPath}/${item.fileUuid}_${item.fileName}`
    );
    setImgPathList(newImgPathList);
  }, [imgData]); 
  console.log('imgPathList', imgPathList);



  // 상품 옵션 선택
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");

  /* 선택 옵션 -> 서버에서 받은 데이터 바인딩하기( )
    sizes -> map돌리기, colors는... 하나만??? ( ) 
    사용자가 옵션 추가할 수 있는 체크박스 만들 수 있는지!! 알아보기( )
   */
  const mockData = {
    sizes: ["XS", "S", "M", "L"],
    colors: ["red", "black", "gray", "white"],
  };


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
                {imgPathList.map(img => (
                  <img src={`${img}`} alt="등록한 이미지"/>
                ))}
              </div>
            </ThumbWrap>
          </div>

          <div className="right">
            <InfoWrap className="detail_infos_wrap">
              <div><h3>{productName}</h3></div>
              <PriceWrap>
                <span className="dscnt_rate">{discountRate}%</span>
                <span className="dscnt_price">{productName}</span>
                <span className="price">{productPrice}</span>
              </PriceWrap>

              <SelctBox className="select_box">
                <select
                  value={selectedSize}
                  onChange={(e) => setSelectedSize(e.target.value)}
                >
                  <option value="">-- Select Size --</option>
                  {mockData.sizes.map((size) => (
                    <option key={size} value={size}>
                      {size}
                    </option>
                  ))}
                </select>

                <select
                  value={selectedColor}
                  onChange={(e) => setSelectedColor(e.target.value)}
                >
                  <option value="">-- Select Color --</option>
                  {mockData.colors.map((color) => (
                    <option key={color} value={color}>
                      {color}
                    </option>
                  ))}
                </select>

                <div>
                  {selectedSize && selectedColor && (
                    <div>
                      <h3>선택된 옵션:</h3>
                      <p>Size: {selectedSize}</p>
                      <p>Color: {selectedColor}</p>
                    </div>
                  )}
                </div>
              </SelctBox> {/* select_box */}

              <div className="btn_wrap">
                <button>바로구매</button>
                <button>장바구니 담기</button>
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
  background-color: orange;
  width: 100%;
  min-width: 1200px;

  .left {
    width: 580px;
    height: 100%;
    background-color: yellowgreen;
  }
  
  .right {
    width: 50%;
    background-color: yellow;
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
  background-color: red;

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
    background-color: pink;

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

  .dscnt_rate,
  .dscnt_price {
    display: none;
  }

  .price {
    line-height: 20px;
    font-size: 20px;
  }

  /* 할인가 스타일 적용 */
  // .dscnt_rate {
  //   font-size: 20px;
  //   color: red;
  // }

  // .dscnt_price {
  //   font-size: 20px;
  //   margin: 0 8px;
  // }

  // .price {
  //   font-size: 14px;
  //   line-height: 20px;
  //   text-decoration: line-through;
  //   color: #aaa;
  // }
`

const SelctBox = styled.div`
  margin-bottom: 40px;

`

export default ProductDetail;