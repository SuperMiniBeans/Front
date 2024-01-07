import styled from "styled-components";
import { FlexBox, FlexBoxSB } from "../styles/Layout";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateOption, fetchCartList } from "../store";
import store from "../store";

import axios from "axios";

/* 
모달 컴포넌트에서는 장바구니의 모든 아이템을 props로 받아올 필요는 없고,
수정할 특정 상품의 정보만 props로 전달 받으면 된다. 
*/


function CartOptionChangeModal({ isModalOpened, closeModal, items }) {
  const dispatch = useDispatch();

  console.log('editItemSelect-modal', items);

  
  /* 선택한 옵션을 화면에 나타내기 */
  // 옵션 선택
  const [selectedSize, setSelectedSize] = useState(items.selectedSize);
  const [selectedColor, setSelectedColor] = useState(items.selectedColor);
  const [newQuantity, setNewQuantity] = useState(items.cartCount);
  
  const handleSelectedSize = e => {
    setSelectedSize(e.target.value);
    setSelectedColor('');
  }
  
  const handleSelectedColor = e => {
    setSelectedColor(e.target.value);
  }

  const minus = () => {
    setNewQuantity(newQuantity > 1 ? newQuantity - 1 : 1);
  };

  const plus = () => {
    setNewQuantity(newQuantity + 1);
  };


  console.log('items.selectedSize', items.selectedSize);

  const updateCartOption = () => {
    const changeSizeColor = axios.post('/cartChangeOption', {
      cartNumber: items.cartNumber,
      selectedSize: selectedSize,
      selectedColor: selectedColor,
    })

    const changeQuantity = axios.post('/changeCount', {
      cartNumber: items.cartNumber,
      cartCount: newQuantity !== null ? newQuantity : items.cartCount,
    })

    Promise.all([changeSizeColor, changeQuantity])
    .then(([resOne, resTwo]) => {
      console.log(resOne.data, resTwo.data);
      window.alert("옵션이 변경되었습니다.");
      closeModal();
      dispatch(fetchCartList());
    })
    .catch((error) => {
      console.error(error);
    });
  }

  return(
    <ModalWrapper className={`${isModalOpened ? "open" : "close"}`}>
      <ModalBackGround>
        <div className="modal_content">
          <h2>옵션 변경</h2>
          <div className="close_modal_box"><button id="colse_modal_btn" onClick={closeModal}></button></div>
        

          <SelectBox className="select_box">
            {/* 사이즈, 색상 변경 */}
            <select
              value={selectedSize || ""}
              onChange={handleSelectedSize}
            >
              <option value="">사이즈 선택</option>
              {items.productSizes.map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>

            <select
              value={selectedColor || ""}
              onChange={handleSelectedColor}
              >
              <option value="">색상 선택</option>
              {selectedSize && items.productColors.map((color) => (
                <option key={color} value={color}>
                  {color}
                </option>
              ))}
            </select>
          </SelectBox> {/* select_box */}

        
          {/* 수량 변경 */}
          <QuantityBox className="handle_quantity_box">
            <button id="minus_btn" onClick={minus}></button>
            <span id="option_quantity">{newQuantity}</span>
            <button id="plus_btn" onClick={plus}></button>
          </QuantityBox>

          <ModalBtnBox>
            <button onClick={closeModal}>취소</button>
            <button onClick={updateCartOption}>적용</button>
          </ModalBtnBox>
        </div>
        
      </ModalBackGround>
    </ModalWrapper>
  )
}

const ModalWrapper = styled.div`

  &.open {
    display: block;
  }

  &.close {
    display: none;
  }
`

const ModalBackGround = styled.div`
  position: fixed;
  top:0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(51, 51, 51, 0.4);

  .modal_content {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: absolute; 
    top: 50%;
    left: 50%;
    padding: 20px;
    transform: translate(-50%, -50%);
    width: 480px;
    height: 320px;
    margin: 0 auto;
    background-color: #fff;

    h2 {
      margin-bottom: 20px;
      text-align: left;
      font-weight: 400;
      // background-color: #eee;
    }
  }

  .close_modal_box {
    position: absolute;
    top: 20px;
    right: 20px;
    width: 32px;
    height: 32px;
    // background: pink;
  }

  #colse_modal_btn {
    positon: absolute;
    width: 100%;
    height: 100%;
    background: none;
    border: none;
    cursor: pointer;

    &:before,
    &:after {
      position: absolute;
      top: 0;
      left: 50%;
      width: 1px;
      height: 32px;
      content: '';
      background: #333;
    }

    &:before {
      transform: rotate(45deg);
    }

    &:after {
      transform: rotate(-45deg);
    }
  }
`

const SelectBox = styled.div`
  margin-bottom: 20px;
  // background: skyblue;

  select {
    width: 100%;
    height: 40px;
    padding: 0 10px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: none;

    &:first-child {
      margin-bottom: 4px;
    }
  }
`

const QuantityBox = styled.div`
  display: flex;
  align-items:center;
  margin-bottom: 20px;
  padding-bottom: 20px;
  // background-color: #eee;


  button {
    position: relative;
    width: 32px;
    height: 32px;
    line-height: 20px;
    border: 1px solid #ccc;
    border-radius: 2px;
    background: none;
    cursor: pointer;

    &:hover {
      background-color: #eee;
      transition: all 0.3s;
    }
  }

  #minus_btn {
    &:before {
      position: absolute;
      top:50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 10px;
      height: 1px;
      content: '';
      background: #333;
    }
  }

  #option_quantity {
    width: 40px;
    text-align: center;
    // background: pink;
  }

  #plus_btn {
    &:before,
    &:after {
      display: block;
      position: absolute;
      top: 50%;
      left: 50%;
      width: 10px;
      height: 1px;
      content: '';
      background: #333;
    }

    &:before {
      transform: translate(-50%, -50%);
    }

    &:after {
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%) rotate(90deg);
    }
  }
`

const ModalBtnBox = styled.div`
  display: flex;
  justify-content: space-between;

  button {
    flex: 1;
    height: 40px;
    font-size: 16px;
    cursor: pointer;

    &:first-child {
      margin-right: 10px;
      border: 1px solid #aaa;
      background-color: #fff;
    }

    &:last-child {
      color: #fff;
      background-color: #333;
    }
  }
`

export default CartOptionChangeModal;