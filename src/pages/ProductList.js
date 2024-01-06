import styled from "styled-components";
import { FlexBoxCol } from "../styles/Layout";
import { Link } from "react-router-dom";
import formatPrice from "../utils/formatPrice";

function ProductList({ products }) {

  return(
    <>
    {products ? 
      <div>
        <FlexBoxCol>

          <ImgWrap>
            <Link to={`/product/list/detail/${products.productNumber}`}>
              <img 
                src={`/upload/${products.fileUploadPath}/${products.fileUuid}_${products.fileName}`} 
                alt={products.productName} 
              />
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
                    <span className="dscnt_rate">{formatPrice(products.discountRate)}%</span>
                    <span className="dscnt_price">{formatPrice(products.discountPrice)}원</span>
                    <span className="price">{formatPrice(products.productPrice)}원</span>
                  </>
                ) : (
                  <>
                    <span className="non_dscnt_price">{formatPrice(products.productPrice)}원</span>
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
  margin-bottom: 40px;

  .non_dscnt_price {
    line-height: 20px;
    font-size: 20px;
  }

  /* 할인가 스타일 적용 */
  .dscnt_rate {
    font-size: 20px;
    font-weight: 600;
    color: #F82A2A;
  }

  .dscnt_price {
    margin: 0 8px;
    font-size: 20px;
    font-weight: 600;
  }

  .price {
    font-size: 14px;
    line-height: 20px;
    color: #ccc;
  }
`

export default ProductList;