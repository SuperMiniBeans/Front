import styled from "styled-components";
import { Container, FlexBox } from "../styles/Layout";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addProductList } from "../store";
import axios from "axios";
import { BtnBg } from "../styles/ButtonStyle";

// 카테고리

function AddProduct() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // 입력값 관리
  const initialValue = {
    productName: '',
    productPrice: 0,
    discountRate: 0,
    discountPrice: 0,
    productSize: '',
    productColor: '',
    productQuantity: 0,
    productExplanation: '',
  }

  // 할인 적용 체크 여부
  const [dscntChked, setDscntChked] = useState(false);

  // 사용자 입력값 받기
  const [inputValues, setInputValues] = useState(initialValue);

  const {productName, productPrice, discountRate,
  discountPrice, productSize, productColor, productQuantity, productExplanation} = inputValues;

  const onChangeValue = e => {
    const {value, name: inputName} = e.target;
    setInputValues({...inputValues, [inputName]: value});
    console.log(inputValues);
  }

  // 할인 적용 체크
  const handleDscntCheck = e => {
    setDscntChked(e.target.checked);
  }

  // 할인가 계산하기(작성중)
  // const calcDscntPrice = () => {
  //   setDscntPrice(add.productPrice *(add.discountRate/100));
  //   console.log('할인가', dscntPrice);
  // }

  // 글 작성 날짜 나타내기
  let date = new Date();
  let year = date.getFullYear();
  let month = date.getMonth();
  let day = date.getDate();
  let today = year + "-" + month + "-" + day;
  // console.log(today);

  // 등록하기 버튼 누르면 실행
  const onAddSubmit = () => {
    /* 필수 항목을 모두 입력해야 제출 할 수 있도록 유효성 검사 해주기( ) */

    axios.post('/registerProduct', {
      categoryMinorCode: 0,
      productNumber: '',
      productName: productName,
      productPrice: productPrice,
      discountRate: discountRate,
      discountPrice: discountPrice,
      productSize: productSize,
      productColor: productColor,
      productQuantity: productQuantity,
      // productExplanation: productExplanation,
      productRegisterDate: today,
    })
      .then(response => {
        console.log(response.data);
        dispatch(addProductList(response.data)); // redux store에 전송한 데이터 추가
        // navigate('/admin');
      })
      .catch(error => {
        console.log(error);
      });
  }

  return(
    <AddProductWrap>
      <Container>
        <h2>상품 등록</h2>

        <div className="align_center">
          <form action="" method="POST">

            <div id="p_name_box">
              <AddINputWrap>
                <label>상품명</label>
                <div className="input_box">
                  <AddINput type="text" name="productName" value={productName} onChange={onChangeValue}/>
                </div>
              </AddINputWrap>
            </div> {/* p_name_box */}


            <div id="p_price_box">
              <DscntChkBox className="dscnt_chkbox">
                <input type="checkbox" name="discount" onChange={e => handleDscntCheck(e)} checked={dscntChked}/> 할인 적용
              </DscntChkBox>

              <AddINputWrap>
                <label>가격</label>
                <div className="input_box">
                  <AddINput type="text" name="productPrice" value={productPrice} onChange={onChangeValue} />
                </div>
              </AddINputWrap>

              <FlexBox>
                <AddINputWrap>
                  <label>할인율</label>
                  <div className="input_box">
                    <AddINput type="text" name="discountRate" disabled={dscntChked ? false : true} value={discountRate}/>
                  </div>
                </AddINputWrap>

                {/* <AddINputWrap>
                  <label>할인가</label>
                  <div className="input_box">
                    <AddINput type="text" name="discountPrice" value={dscntChked ? dscntPrice : 0} disabled={dscntChked ? false : true} onChange={calcDscntPrice} />
                  </div>
                </AddINputWrap> */}
              </FlexBox>
            </div> {/* p_price_box */}
            
            {/* 옵션 선택 받는 화면 다시 구성하기!! 옵션 개수는 사이즈, 색상 두가지 이며 각각의 아이템??! 종류??는 사용자가 입력해서 추가할 수 있도록 만들기( ) */}
            <div id="p_info_box">
              <AddINputWrap>
                <label>사이즈</label>
                <div  className="input_box">
                  <AddINput type="text" name="productSize" value={productSize} onChange={onChangeValue}/>
                </div>
              </AddINputWrap>

              <AddINputWrap>
                <label>색상</label>
                <div className="input_box">
                  <AddINput type="text" name="productColor" value={productColor} onChange={onChangeValue} />
                </div>
              </AddINputWrap>

              <AddINputWrap>
                <label>재고 수량</label>
                <div className="input_box">
                  <AddINput type="text" name="productQuantity" value={productQuantity} onChange={onChangeValue} />
                </div>
              </AddINputWrap>
            </div> {/* p_info_box */}

            <AddINputWrap>
              <label>상품 설명</label>
              <div className="input_box">
                <AddTextArea type="text" name="productExplanation" id="explanation" value={productExplanation} onChange={onChangeValue} />
              </div>
            </AddINputWrap>

            <AddINputWrap>
              <label>사이즈 안내</label>
              <div className="input_box">
                <AddTextArea type="text" name="" id="size_guide" />
              </div>
            </AddINputWrap>

            <AddINputWrap>
              <label>배송 및 <br /> 환불 안내</label>
              <div className="input_box">
                <AddTextArea type="text" name="" id="shipping_guide" />
              </div>
            </AddINputWrap>

            <div>
              <AddProductBtn type="submit" onClick={onAddSubmit}>등록</AddProductBtn>
            </div>
          </form>
        </div> {/* align_center */}
        

      </Container>
    </AddProductWrap>
  )
}

const AddProductWrap = styled.div`
  width: 100%;
  min-width: 1200px;
  // background-color: green;

  h2 {
    margin-bottom: 30px;
    text-align: center;
  }

  .align_center {
    width: 780px;
    margin: 0 auto;
    // background-color: #eee;
  }

  #p_name_box,
  #p_price_box,
  #p_info_box {
    margin-bottom: 40px;
  }
`

const AddINputWrap = styled.div`
  display: flex;
  width: 100%;
  margin-bottom: 10px;
  align-items: center;

  label {
    width: 140px;
    font-size: 20px;
  }

  .input_box {
    width: 100%;
  }
`

const AddINput = styled.input`
  width: 100%;
  height: 40px;
  padding: 0 10px;
  font-size: 16px;
  border: 1px solid #aaa;
  // background-color: yellowgreen;
`

const DscntChkBox = styled.div`
  padding-left: 120px;
`

const AddTextArea = styled.textarea`
  width: 100%;
  height: 200px;
  padding: 10px;
  resize: none;
  font-family: 'pretendard';
  border: 1px solid #aaa;
  // background-color: yellowgreen;

  // textarea 스크롤바 커스텀
  &::-webkit-scrollbar {
    width: 8px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #ccc;
    border-radius: 10px;
  }
  &::-webkit-scrollbar-track {
    background-color: #eee;
  }
`

const AddProductBtn = styled(BtnBg)`
  width: 120px;
  font-size: 16px;

  // background-color: pink;
`

export default AddProduct;