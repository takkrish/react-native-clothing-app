import { configureStore } from '@reduxjs/toolkit';

import userReducer from '../reducers/userSlice';
import cartReducer from '../reducers/cartSlice';

const store = configureStore({
	reducer: {
		USER: userReducer,
		CART: cartReducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false,
		}),
});
export default store;
