import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action) => {
      const product = action.payload;

      const existingItem = state.cartItems.find(
        (item) => item.name === product.name
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.cartItems.push({
          ...product,
          quantity: 1,
        });
      }
    },

    removeItem: (state, action) => {
      const itemName = action.payload;

      state.cartItems = state.cartItems.filter(
        (item) => item.name !== itemName
      );
    },

    updateQuantity: (state, action) => {
      const { name, quantity } = action.payload;

      const item = state.cartItems.find(
        (cartItem) => cartItem.name === name
      );

      if (item) {
        if (quantity <= 0) {
          state.cartItems = state.cartItems.filter(
            (cartItem) => cartItem.name !== name
          );
        } else {
          item.quantity = quantity;
        }
      }
    },
  },
});

export const {
  addItem,
  removeItem,
  updateQuantity,
} = cartSlice.actions;

export default cartSlice.reducer;
