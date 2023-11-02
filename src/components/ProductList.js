import styled from "styled-components";
import { FlexBoxCol } from "../styles/Layout";
import { Link } from "react-router-dom";

function ProductList({ products }) {
  /* 상품명, 이미지에 productDetail로 이동할 수 있는 라우터 설정 */
  /* 상품명, 가격은 데이터를 받아오기 이미지도? */
  const { productNum, title, price, dscntRate, dscntPrice } = products;

  return(
    <ProductListWrap>
      <FlexBoxCol>
        <ImgWrap>
          <Link to={'/'}><img src={require(`../img/outer${productNum}.jpg`)} alt="outer"></img></Link>
        </ImgWrap>
        <Title><Link to={'/'}><h3>{title}</h3></Link></Title>
        <PriceWrap>
          <span className="dscnt_rate">{dscntRate}</span>
          <span className="dscnt_price">{dscntPrice}</span>
          <span className="price">{price}</span>
        </PriceWrap>
      </FlexBoxCol>
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