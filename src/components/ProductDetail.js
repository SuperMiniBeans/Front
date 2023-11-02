import styled from "styled-components";

function ProductDetail({ products }) {
  const { productNum, title, price, dscntRate, dscntPrice, productExplanation } = products;


  return(
    <ProductDetailWrap>

    </ProductDetailWrap>
  )
}

const ProductDetailWrap = styled.div`
  background-color: orange;
`

export default ProductDetail;