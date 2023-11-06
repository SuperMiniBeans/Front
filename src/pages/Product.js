// import { Routes, Route } from "react-router-dom";
import styled from "styled-components";
import { Container, FlexBox } from "../styles/Layout";
import ProductList from "../components/ProductList";
// import ProductDetail from "../components/ProductDetail";


function Product({ products }) {
  console.log(products);
  /* 스크롤 했을 때 12개 목록 끝나면 데이터 불러오기 - 스크롤 이벤트 */

  return(
    <Container>
      <CtgryWrap>
        <FlexBox>
          <div>대분류</div>
          <span></span>
          <div>소분류</div>
        </FlexBox>
        <div><h2>현재 카테고리</h2></div>
      </CtgryWrap>

      {/* map사용해서 ProductList 컴포넌트 반복하기 */}
      <ProductListGrid>
        {products.map((products, i) => {
          return <ProductList products={products} key={i}/>
        })}
      </ProductListGrid>

    </Container>
  )
}

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


const ProductListGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  column-gap: 20px;
  row-gap: 20px;
`

export default Product;