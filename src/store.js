import { configureStore, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

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
        {id: 23, name: 'HOODIES & SWEATSHIRTS', value: 6},
        {id: 24, name: 'KNITWEAR', value: 7},
      ],
      3: [
        {id: 31, name: 'PANTS', value: 8},
        {id: 32, name: 'JEANS', value: 9},
      ],
      4: [
        {id: 41, name: 'ACC', value: 10}
      ],
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

export const sendCartItems = createAsyncThunk(
  'cart/sendCartItems',
  async ({ selectedOptions, optionId, productSizes, productColors }, thunkAPI) => {
    console.log('리덕스selectedOptions', selectedOptions);

    const requests = selectedOptions.map(option => 
      axios.post('/addCart', option)
    );
    await Promise.all(requests);
    // return { ...extraValues };
    const response = await axios.post('/userCart', {
      userNumber: sessionStorage.getItem("userNumber"),
    });
    
    const addOptionData = response.data.map(item => ({
      ...item,
      optionId,
      productSizes,
      productColors
    }));
    return addOptionData; // productSizes, productColors는 장바구니에서 옵션 수정하기 위해 필요. 그래서 서버에서 받은 배열 데이터에 값을 추가하고 리턴.
  }
);

export const fetchCartList = createAsyncThunk(
  'cart/fetchCartList',
  async (_, thunkAPI) => {
    console.log();
    const response = await axios.post('/userCart', {
      userNumber: sessionStorage.getItem("userNumber"),
    })
    return response.data;
  }
)

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
  },
  reducers: {
    loadCart: (state, action) => {
      state.items = action.payload;
    },
    // addToCart: (state, action) => {
    //   state.items.push(action.payload);
    // },
    removeFromCart: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    updateOption: (state, action) => {
      const { cartNumber, newSize, newColor, newQuantity } = action.payload;
      const cartIndex = state.findIndex(item => item.cartNumber === cartNumber);
      if(cartIndex >= 0) {
        state[cartIndex].selectedColor = newColor;
        state[cartIndex].selectedSize = newSize;
        state[cartIndex].cartCount = newQuantity;
      }
      console.log('update action.payload', action.payload);
      console.log('update action.payload', cartIndex);

    },
    addCount(state, action) {
      let nums = state.findIndex(a => a.id === action.payload);
      state[nums].count++;
    },
    minusCount(state, action) {
      let nums = state.findIndex(a => a.id === action.payload);
      if (state[nums].count > 1)  state[nums].count--;
    },
  },
  extraReducers: builder => {
    builder
      // 비동기 액션 pending 상태
      .addCase(sendCartItems.pending, (state) => {
        state.status = 'loading';
      })
      // 비동기 액션 fulfilled 상태
      .addCase(sendCartItems.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items.push(action.payload);
        console.log('addcart action.payload', action.payload);

        window.alert('장바구니에 상품이 담겼습니다.');
      })
      // 비동기 액션 rejected 상태
      .addCase(sendCartItems.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
        window.alert('장바구니 등록 실패');
      })
      .addCase(fetchCartList.fulfilled, (state, action) => {
        state.items = action.payload;
        state.cartCount = action.payload.length;
      });
  },
});


export const { setInputValue, clearInputValue, updateInputValue } = inputValueSlice.actions;
export const { addProductList, setProductList, toggleProductList, removeProductList, setProduct, updateProduct } = productSlice.actions;
export const { selectMajorCategory, selectMinorCategory, setMajorCategory, setMinorCategory } = categorySlice.actions;
export const { loadCart, addToCart, removeFromCart, updateOption } = cartSlice.actions;

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
