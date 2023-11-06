import styled from "styled-components";

function ProductDetail({ products }) {
  const { productNum, title, price, dscntRate, dscntPrice, productExplanation } = products;

  console.log(products);
  // console.log({productNum, title, price, dscntRate, dscntPrice, productExplanation})

  return(
    <ProductDetailWrap>
      <div className="detail_img_wrap">
        <div></div>

        {/* <div><img src={require(`../img/outer${productNum}.jpg`)} alt="outer"></img></div> */}
        {/* <img src={require(`../img/outer${productNum}.jpg`).default} alt="outer"></img> */}
        <div className="thumb_Wrap">
        </div>
      </div>

      <div className="detail_infos_wrap">
        <div><h3>{title}</h3></div>
        <PriceWrap>
          <span className="dscnt_rate">{dscntRate}</span>
          <span className="dscnt_price">{dscntPrice}</span>
          <span className="price">{price}</span>
        </PriceWrap>

        <div className="btn_wrap">
          <button>바로구매</button>
          <button>장바구니 담기</button>
          <button>하트</button>
        </div>

        <div className="explanation">
          <div>{productExplanation}</div>
          

        </div>
      </div>
    </ProductDetailWrap>
  )
}

const ProductDetailWrap = styled.div`
  background-color: orange;
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

export default ProductDetail;