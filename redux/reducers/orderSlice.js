import { createSlice } from '@reduxjs/toolkit';

const OrderSlice = createSlice({
	name: 'order',
	initialState: {
		orders: [],
	},
	reducers: {
		newOrder: (state, action) => {
			state.orders = [action.payload, ...state.orders];
		},
	},
});

export const { newOrder } = OrderSlice.actions;

export default OrderSlice.reducer;
