import { configureStore, createSlice } from "@reduxjs/toolkit";

// 초기값 설정
const initialState = {
  inputValues: {
    productName: '',
    productPrice: 0,
    discountRate: 0,
    discountPrice: 0,
    productSize: '',
    productColor: '',
    productQuantity: 0,
    productExplanation: '',
  },
  products: [],
};

// 상품 등록 페이지 state 관리
const inputValueSlice = createSlice({
  name: 'inputValue',
  initialState,
  reducers: {
    setInputValue: (state, action) => {
      let { name, value } = action.payload;
      state.inputValues[name] = value;
      console.log('페이로드', action.payload);
    },
    clearInputValue: (state, action) => {
      let { name } = action.payload;
      state.inputValues[name] = '';
    },
  },
});

// 관리자 페이지 상품 목록 state 관리
const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    addProductList: (state, action) => {
      state.products.push(action.payload);
      console.log('addProductList액션', action);
    },
    setProductList: (state, action) => {
      state.products = action.payload;
      // console.log('setProductList 액션' , action);
      console.log('리스트페이로드', action.payload);
    },
  },
});

// 관리자 페이지 상품 카테고리 설정
const categorySlice = createSlice({
  name: 'categories',
  initialState: {
    majorCategories: [
      {id: 1, name: 'OUTER', value: 1},
      {id: 2, name: 'TOP', value: 2},
      {id: 3, name: 'BOTTOM', value: 3},
      {id: 4, name: 'ACC', value: 4},
    ],
    minorCategories: {
      1: [
        {id: 11, name: 'COAT', value: 1},
        {id: 12, name: 'JACKET', value: 2},
        {id: 13, name: 'BLAZERS', value: 3},
      ],
      2: [
        {id: 21, name: 'T-SHIRTS', value: 1},
        {id: 22, name: 'SHIRTS', value: 2},
        {id: 23, name: 'HOODIES/SWEATSHIRTS', value: 3},
        {id: 24, name: 'KNITWEAR', value: 4},
      ],
      3: [
        {id: 31, name: 'PANTS', value: 1},
        {id: 32, name: 'JEANS', value: 2},
      ],
      4: [ ],
    },
    selectedMajorCategory: null,
    selectedMinorCategory: null,
  }, //initialState
  reducers: {
    selectMajorCategory: (state, action) => {
      state.selectedMajorCategory = action.payload;
      state.selectedMinorCategory = null; // 대분류 바뀌면 소분류 초기화
      console.log('메이저', action.payload);
    },
    selectMinorCategory: (state, action) => {
      state.selectedMinorCategory = action.payload;
      console.log('마이너', action.payload);
    },
  },
});

export const { setInputValue, clearInputValue } = inputValueSlice.actions;
export const { addProductList, setProductList } = productSlice.actions;
export const { selectMajorCategory, selectMinorCategory } = categorySlice.actions;

const store = configureStore({
  reducer: {
    // name: 'const 슬라이스'.reducer 
    inputValue: inputValueSlice.reducer,
    products: productSlice.reducer,
    categories: categorySlice.reducer,
  },
});
export default store;
