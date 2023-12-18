import styled from "styled-components";
import { FlexBoxCol } from "../styles/Layout";
import { Routes, Route, Link } from "react-router-dom";
// import { Link } from "react-router-dom";
import ProductDetail from "./ProductDetail";
import { useState, useEffect } from "react";
import axios from "axios";



function ProductList() {
  /* 상품명, 이미지에 productDetail로 이동할 수 있는 라우터 설정 */
  /* 상품명, 가격은 데이터를 받아오기 이미지도? */

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

  const [imgData, setImgData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post('/fileList', {
          userId: sessionStorage.getItem("아이디"),
        })
        setImgData(response.data);
        setProduct(response.data);
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
  }, []);



  // 이미지 경로 배열에 담기
  const [imgPathList, setImgPathList] = useState([]);
  useEffect(() => {
    const newImgPathList = imgData.map(item => 
      `/upload/${item.fileUploadPath}/${item.fileUuid}_${item.fileName}`
    );
    setImgPathList(newImgPathList);
  }, [imgData]); 
  console.log('imgPathList', imgPathList);

  
  return(
    <ProductListWrap>
      <FlexBoxCol>
        <ImgWrap>
          <Link to={'/product/list/detail'}><img src={imgPathList[0]} alt="outer" /></Link>
        </ImgWrap>
        <Title><Link to={'/product/list/detail'}><h3>{productName}</h3></Link></Title>
        <PriceWrap>
          <span className="dscnt_rate">{discountRate}</span>
          <span className="dscnt_price">{discountPrice}</span>
          <span className="price">{productPrice}</span>
        </PriceWrap>
      </FlexBoxCol>

      <Routes>
        <Route path="/product/list/detail" element={<ProductDetail />} />
      </Routes>
    </ProductListWrap>
  )
}

const ProductListWrap = styled.div`
  // background-color: yellow;
`

const ImgWrap = styled.div`
  width: 280px;
  height: 340px;

  img {
    width: 280px;
    height: 340px;
    object-fit: cover;
  }
`

const Title = styled.div`
  margin: 10px 0 16px 0;
`

const PriceWrap = styled.div`
  position: relative;
  display: flex;

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

export default ProductList;