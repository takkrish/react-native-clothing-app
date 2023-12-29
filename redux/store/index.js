import { configureStore } from '@reduxjs/toolkit';

import userReducer from '../reducers/userSlice';
import cartReducer from '../reducers/cartSlice';
import FavouriteReducer from '../reducers/favouriteSlice';

const store = configureStore({
	reducer: {
		USER: userReducer,
		CART: cartReducer,
		FAVOURITE: FavouriteReducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false,
		}),
});
export default store;
