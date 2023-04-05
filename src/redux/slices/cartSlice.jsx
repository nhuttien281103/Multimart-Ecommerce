import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
  totalAmount: 0,
  totalQuantity: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action) => {
      // Gán dữ liệu mang theo thành mảng newItem
      const newItem = action.payload;

      // Kiểm tra id đã tồn tại trong cart chưa
      const existingItem = state.cartItems.find(
        (item) => item.id === newItem.id
      );

      state.totalQuantity++;

      // Nếu chưa thì push vô cart Item
      if (!existingItem) {
        state.cartItems.push({
          id: newItem.id,
          productName: newItem.productName,
          imgUrl: newItem.imgUrl,
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price,
        });
      } else {
        // Nếu tồn tại thì số lượng tăng thêm 1, đồng thời giá cũng tăng
        existingItem.quantity++;
        existingItem.totalPrice =
          Number(existingItem.totalPrice) + Number(newItem.price);
      }

      // Tổng thành tiền
      state.totalAmount = state.cartItems.reduce((total, item) => {
        return total + Number(item.price) * Number(item.quantity);
      }, 0);

      console.log("Quantity : " + state.totalQuantity);
      console.log(state.cartItems);
      console.log(newItem);
    },

    deleteItemCart: (state, action) => {
      const id = action.payload;
      const existingItem = state.cartItems.find((item) => item.id === id);
      if (existingItem) {
        state.cartItems = state.cartItems.filter((item) => item.id !== id);
        state.totalQuantity -= existingItem.quantity;
      }

      // Tổng thành tiền
      state.totalAmount = state.cartItems.reduce((total, item) => {
        return total + Number(item.price) * Number(item.quantity);
      }, 0);
    },
  },
});

export const cartActions = cartSlice.actions;

export default cartSlice.reducer;
