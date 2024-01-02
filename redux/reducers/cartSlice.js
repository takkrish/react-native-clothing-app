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
		emptyCart: (state) => {
			state.items = [];
		},
		addQuantity: (state, action) => {
			state.items = state.items.map((item) => {
				if (item.id === action.payload.id) {
					return { ...item, quantity: item.quantity + 1 };
				}
				return item;
			});
		},
		subtractQuantity: (state, action) => {
			state.items = state.items.map((item) => {
				if (item.id === action.payload.id) {
					return { ...item, quantity: item.quantity - 1 };
				}
				return item;
			});
		},
	},
});

export const { addItem, removeItem, emptyCart, addQuantity, subtractQuantity } =
	CartSlice.actions;

export default CartSlice.reducer;
