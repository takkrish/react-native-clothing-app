import { createSlice } from '@reduxjs/toolkit';

const OrderSlice = createSlice({
	name: 'order',
	initialState: {
		orders: [],
	},
	reducers: {
		newOrder: (state, action) => {
			state.orders.unshift(action.payload);
		},
		clearOrders: (state) => {
			state.orders = [];
		},
	},
});

export const { newOrder, clearOrders } = OrderSlice.actions;

export default OrderSlice.reducer;
