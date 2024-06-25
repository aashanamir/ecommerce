import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    totalQuantity: 0
  },
  reducers: {
    add: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.items.find(item => item._id === newItem._id);

      if (existingItem) {
        existingItem.quantity += newItem.quantity;
      } else {
        state.items.push({ ...newItem, quantity: newItem.quantity });
      }

      state.totalQuantity += newItem.quantity;
    },

    remove: (state, action) => {
      const id = action.payload;
      const existingItem = state.items.find(item => item._id === id);

      if (existingItem) {
        state.totalQuantity -= existingItem.quantity;
        state.items = state.items.filter(item => item._id !== id);
      }
    },

    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const existingItem = state.items.find(item => item._id === id);

      if (existingItem) {
        state.totalQuantity += (quantity - existingItem.quantity);
        existingItem.quantity = quantity;
      }
    },

    clearCart : (state , action) => {
      state.items = [];
      state.totalQuantity = 0;
    }
  }
});

export const { add, remove, updateQuantity , clearCart} = cartSlice.actions;

export default cartSlice.reducer;
