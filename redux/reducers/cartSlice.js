import { createSlice } from '@reduxjs/toolkit';

const CartSlice = createSlice({
	name: 'cart',
	initialState: {
		items: [],
	},
	reducers: {
		addItem: (state, action) => {
			state.items = [action.payload, ...state.items];
		},
		removeItem: (state, action) => {
			state.items = state.items.filter(
				(item) => item.id !== action.payload.id
			);
		},
	},
});

export const { addItem, removeItem } = CartSlice.actions;

export default CartSlice.reducer;
