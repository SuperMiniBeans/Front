import { configureStore, createSlice } from "@reduxjs/toolkit";

// 스테이트 상태를 만들기
let productSlice = createSlice({
  name: 'products',
  initialState: [],
  reducers: {
    addProductList: (state, action) => {
      console.log('addProductList액션', action);
      state.products.push(action.payload);
    },
    setProductList: (state, action) => {
      console.log('setProductList 액션' , action);
      state.products = action.payload;
    },
  },
});
export let { addProductList, setProductList } = productSlice.actions;

const store = configureStore({
  reducer: {
    products: productSlice.reducer,
  },
});
export default store;
