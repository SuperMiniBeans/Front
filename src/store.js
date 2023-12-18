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
    productExplanation1: '',
    productExplanation2: '',
  },
  products: [],
  productEach: [],
};

// 상품 등록 페이지 state 관리
const inputValueSlice = createSlice({
  name: 'inputValue',
  initialState,
  reducers: {
    setInputValue: (state, action) => {
      let { name, value } = action.payload;
      state.inputValues[name] = value;
      // console.log('setInputValue', action.payload);
    },
    clearInputValue: (state, action) => {
      let { name } = action.payload;
      state.inputValues[name] = '';
      // console.log('clearInputValue', name);
    },
    updateInputValue: (state, action) => {
      state.value = action.payload;
      return action.payload;
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
    },
    setProductList: (state, action) => {
      state.products = action.payload;
      state.products.sort((a, b) => b.productNumber - a.productNumber); // 최근 등록한 항목이 위로 올라오도록 정렬
      // console.log('리스트페이로드', action.payload);
    },
    toggleProductList: (state, action) => {
      state.products.map(state => state.id === action.id ? {...state, checked: !state.checked} : state);
      // console.log('store토글액션', action);
    },
    removeProductList: (state, action) => {
      state.products.filter(product => product.productNumber !== action.productNumber);
      // console.log('store리무브', action.payload);
    },
    setProduct: (state, action) => {
      state.productEach = action.payload;
      // console.log('setProduct', action.payload);
    },
    updateProduct: (state, action) => {
      state.productEach = {...state.productsUpdate, ...action.payload}
      // console.log('updateProduct 리듀서',state.productsUpdate);
    }
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
        {id: 21, name: 'T-SHIRTS', value: 4},
        {id: 22, name: 'SHIRTS', value: 5},
        {id: 23, name: 'HOODIES/SWEATSHIRTS', value: 6},
        {id: 24, name: 'KNITWEAR', value: 7},
      ],
      3: [
        {id: 31, name: 'PANTS', value: 8},
        {id: 32, name: 'JEANS', value: 9},
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
      // console.log('메이저', action.payload);
    },
    selectMinorCategory: (state, action) => {
      state.selectedMinorCategory = action.payload;
      // console.log('마이너', action.payload);
    },
    setMajorCategory: (state, action) => {
      state.majorCategories = action.payload;
    },
    setMinorCategory: (state, action) => {
      state.minorCategories = action.payload;
    },
  },
});

const cartSlice = createSlice({
  name: 'cart',
  initialState: [],
  reducers: {
    addToCart: (state, action) => {
      const itemIndex = state.findIndex(
        item => item.id === action.payload.id && 
                item.size === action.payload.size &&
                item.color === action.payload.color
      );

      if(itemIndex >= 0) {
        state[itemIndex].quantity += 1;
      } else {
        state.push({...action.payload, quantity: 1});
      }
      // state.push(action.payload);
      console.log('cart redux', action.payload);
    },
  }
});


export const { setInputValue, clearInputValue, updateInputValue } = inputValueSlice.actions;
export const { addProductList, setProductList, toggleProductList, removeProductList, setProduct, updateProduct } = productSlice.actions;
export const { selectMajorCategory, selectMinorCategory, setMajorCategory, setMinorCategory } = categorySlice.actions;
export const { addToCart } = cartSlice.actions;

const store = configureStore({
  reducer: {
    // name: 'const 슬라이스'.reducer 
    inputValue: inputValueSlice.reducer,
    products: productSlice.reducer,
    categories: categorySlice.reducer,
    cart: cartSlice.reducer,

  },
});
export default store;
