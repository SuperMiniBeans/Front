import styled from "styled-components";
import { FlexBoxCol } from "../styles/Layout";
import { Routes, Route, Link } from "react-router-dom";

function ProductList({ products }) {

  return(
    <>
    {products ? 
      <div>
        <FlexBoxCol>

          <ImgWrap>
            <Link to={`/product/list/detail/${products.productNumber}`}>
              <img src={`/upload/${products.fileUploadPath}/${products.fileUuid}_${products.fileName}`} alt={products.productName} />
            </Link>
          </ImgWrap>

          <Title>
            <Link to={`/product/list/detail/${products.productNumber}`}>
              <h3>{products.productName}</h3>
            </Link>
          </Title>

          <PriceWrap>
                {products.discountRate > 0 ? (
                  <>
                    <span className="dscnt_rate">{products.discountRate}%</span>
                    <span className="dscnt_price">{products.discountPrice}</span>
                    <span className="price">{products.productPrice}</span>
                  </>
                ) : (
                  <>
                    <span className="non_dscnt_price">{products.productPrice}</span>
                  </>
                )}
              </PriceWrap>

        </FlexBoxCol>
      </div>
      : 
      <div>데이터 로딩즁</div>
      }
    </>
  )
}

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

export default ProductList;