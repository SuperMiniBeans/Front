import styled from "styled-components";
import { Container, FlexBox } from "../styles/Layout";
import ProductList from "./ProductList";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

/* 스크롤 했을 때 12개 목록 끝나면 데이터 불러오기 - 스크롤 이벤트 */

function Product() {
  const categories = useSelector(state => state.categories);

  // const { majorValue, minorValue } = useParams();
  const [cateProduct, setCateProduct] = useState();

  const { majorName, minorName } = useParams();

  const findCategoryValue = (categories, name) => {
    for (let category of categories) {
      if (category.name === name) {
        return category.value;
      }
    }
  };

  const majorValue = findCategoryValue(categories.majorCategories, majorName);
  const minorValue = minorName ? findCategoryValue(categories.minorCategories[majorValue], minorName) : null;

  useEffect(() => {
    const categoryValue = {
      categoryMajorCode: majorValue,
    }
    if(minorValue) {
      categoryValue.categoryMinorCode = minorValue;
    }

    axios.post('/divideCode', categoryValue)
      .then(res => {
        setCateProduct(res.data);
      })
      .catch(error => {
        console.log(error);
      })
    
    
  }, [majorValue, minorValue])


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

      <ProductListGrid>
        {cateProduct ? (
          cateProduct.map((products, i) => {
            return <ProductList 
                      products={products}
                      key={i}
                    />
          })
        ) : (
          <div>데이터 없음</div>
        )}
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