import styled from "styled-components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

import { Container, FlexBox } from "../styles/Layout";
import { BtnBg } from "../styles/ButtonStyle";
import { setInputValue, addProductList, selectMajorCategory, selectMinorCategory } from "../store";


// *********파일 첨부 만들기 ( )*********** -> 찾아보기 ( )
// 파일 받을 ui, 여러개 파일을 받아야 함, 
// 사이즈는 free로 통일
// 수정하는 기능 추가하기 -> 기존 값을 input에 표시하고 수정된 값 업ㅂ데ㅣ트
// 삭제 구현하기 


function AddProduct() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [images, setImages] = useState([]);

  // 카테고리 관련 state 불러와서 사용하기
  const cateState = useSelector((state) => state.categories);
  const {majorCategories, minorCategories, selectedMajorCategory, selectedMinorCategory} = cateState;


  // major카테고리 선택 상태 업데이트
  const handleMajorValue = e => dispatch(selectMajorCategory(e.target.value));
  // console.log('셀렉티드대분류', selectedMajorCategory);

  // minor카테고리 선택 상태 업데이트
  const handleMinorValue = e => dispatch(selectMinorCategory(e.target.value));
  // console.log('셀렉티드소분류', selectedMinorCategory);

  // 이미지 업로드
  const handleImageUpload = e => {
    const files = e.target.files;
    setImages([...images, ...files]);
  }
  console.log('이미지',images);

  // input관련 state불러와서 사용하기
  let inputState = useSelector((state) => state.inputValue.inputValues);
  const {productName, productPrice, discountRate, discountPrice, productSize, productColor, productQuantity, productExplanation} = inputState;
  // console.log('인풋 스테이트', inputState);

  // input 입력 받은 값 state에저장
  const handleInputChange = e => {
    const {name, value} = e.target;
    dispatch(setInputValue({name, value}));
  }

  // 할인 적용 체크 여부
  const [dscntChked, setDscntChked] = useState(false);

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
  let month = date.getMonth() + 1;
  let day = date.getDate();
  let today = year + "-" + month + "-" + day;
  // console.log(today);

  // 등록하기 버튼 누르면 실행
  const onAddSubmit = () => {
    /* 필수 항목을 모두 입력해야 제출 할 수 있도록 유효성 검사 해주기( ) */

    const formData = new FormData();

    for(let i = 0; i<images.length; i++) {
      formData.append('uploadfiles', images[i]);
    }
    formData.append('userId', sessionStorage.getItem("아이디"));
    formData.append('categoryMajorCode', selectedMajorCategory);
    formData.append('categoryMinorCode', selectedMinorCategory);
    formData.append('productNumber', '');
    formData.append('productName', productName);
    formData.append('productPrice', productPrice);
    formData.append('discountRate', discountRate);
    // formData.append('discountPrice', discountPrice);
    formData.append('productSize', productSize);
    formData.append('productColor', productColor);
    formData.append('productQuantity', productQuantity);
    formData.append('productExplanation', productExplanation);
    formData.append('productRegisterDate', today);

    // formdata 값 확인하기
    console.log('폼데이터----여기부터');
    for (const [key, value] of formData.entries()) {
      console.log(key, value);
    }
    console.log('폼데이터----여기까지');


    axios.post('/registerProduct', formData, {
      headers: {
        "Content-Type": "multipart/form-data",
    },
    })
      .then(response => {
        console.log(response.data);
        dispatch(addProductList(response.data)); // redux store에 전송한 데이터 추가
        window.alert("상품 등록이 완료 되었습니다.");
        // navigate('/admin');
      })
      .catch(error => {
        console.log(error);
        console.log('실패!');
      });
  }

  return(
    <AddProductWrap>
      <Container>
        <h2>상품 등록</h2>

        <div className="align_center">
          <div>날짜: {today}</div>

        <form>
          <div id="p_cate_box">
            <AddINputWrap>
              <label>카테고리</label>
              <select 
                name="categoryMajorCode"
                value={selectedMajorCategory || ''}
                onChange={handleMajorValue}
              >
                <option>대분류</option>
                {majorCategories.map((category) => (
                  <option key={category.id} value={category.value}>
                    {category.name}
                  </option>
                ))}
              </select>

              {selectedMajorCategory && (
                <select 
                  name="categoryMinorCode"
                  value={selectedMinorCategory || ''}
                  onChange={handleMinorValue}
                >
                  <option>소분류</option>
                  {minorCategories[selectedMajorCategory].map((cate) => (
                    <option key={cate.id} value={cate.value}>
                      {cate.name}
                    </option>
                  ))}
                </select>
              )}
            </AddINputWrap>
          </div>

          <div id="p_name_box">
            <AddINputWrap>
              <label>상품 이미지</label>
              <div className="input_box">
                <input type="file" multiple name="productFiles" onChange={handleImageUpload}/>
              </div>
            </AddINputWrap>
          </div> {/* p_name_box */}

          <div id="p_name_box">
            <AddINputWrap>
              <label>상품명</label>
              <div className="input_box">
                <AddINput type="text" name="productName" value={productName} onChange={handleInputChange}/>
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
                <AddINput type="text" name="productPrice" value={productPrice} onChange={handleInputChange} />
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
                  <AddINput type="text" name="discountPrice" value={dscntChked ? dscntPrice : 0} disabled={dscntChked ? false : true} onChange={handleInputChange} />
                </div>
              </AddINputWrap> */}
            </FlexBox>
          </div> {/* p_price_box */}
          
          <div id="p_info_box">
            <AddINputWrap>
              <label>사이즈</label>
              <div  className="input_box">
                <AddINput type="text" name="productSize" value={productSize} onChange={handleInputChange}/>
              </div>
            </AddINputWrap>

            <AddINputWrap>
              <label>색상</label>
              <div className="input_box">
                <AddINput type="text" name="productColor" value={productColor} onChange={handleInputChange} />
              </div>
            </AddINputWrap>

            <AddINputWrap>
              <label>재고 수량</label>
              <div className="input_box">
                <AddINput type="text" name="productQuantity" value={productQuantity} onChange={handleInputChange} />
              </div>
            </AddINputWrap>
          </div> {/* p_info_box */}

          <AddINputWrap>
            <label>상품 설명</label>
            <div className="input_box">
              <AddTextArea type="text" name="productExplanation" id="explanation" value={productExplanation} onChange={handleInputChange} />
            </div>
          </AddINputWrap>

          {/* <AddINputWrap>
            <label>사이즈 안내</label>
            <div className="input_box">
              <AddTextArea type="text" name="" id="size_guide" />
            </div>
          </AddINputWrap> */}

          {/* <AddINputWrap>
            <label>배송 및 <br /> 환불 안내</label>
            <div className="input_box">
              <AddTextArea type="text" name="" id="shipping_guide" />
            </div>
          </AddINputWrap> */}
        </form>

          <div>
            <AddProductBtn type="submit" onClick={onAddSubmit}>등록</AddProductBtn>
          </div>
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

  #p_cate_box,
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
  // background-color: pink;


  label {
    width: 140px;
    margin-right: 20px;
    font-size: 20px;
    // background-color: #eee;
  }

  .input_box {
    width: 100%;

    input,
    textarea {
      width: calc(780px-140px);
      // background-color: blue;

    }
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