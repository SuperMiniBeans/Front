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
  const [cateProduct, setCateProduct] = useState();
  const { majorName, minorName } = useParams();

  // categories의 name에 맞는 value를 리턴
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
    let endpoint; //카테고리가 ALL일 때는 서버url이 다르기 때문에 endpoint추가
    const categoryValue = {
      categoryMajorCode: majorValue,
    }
    if(minorValue) {
      categoryValue.categoryMinorCode = minorValue;
    }

    if(majorName === 'ALL') {
      endpoint = '/fileList';
    } else {
      endpoint = '/divideCode';
    }

    axios.post(endpoint, categoryValue)
      .then(res => {
        setCateProduct(res.data);
      })
      .catch(error => {
        console.log(error);
      })
  }, [majorValue, minorValue, majorName])


  return(
    <Container>
      <CtgryWrap>
        {
          minorName ? 
          <>
            <FlexBox>
            <div>{majorName}</div>
            <span></span>
            <div>{minorName}</div>
            </FlexBox>
            <div><h2>{minorName}</h2></div>
          </>
          :
          <>
            <div>{majorName}</div>
            <div><h2>{majorName}</h2></div>
          </>
        }
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
          <div>로딩중</div>
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