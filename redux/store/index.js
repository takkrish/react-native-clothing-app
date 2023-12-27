import { configureStore } from '@reduxjs/toolkit';

import userReducer from '../reducers/userSlice';

const store = configureStore({
	reducer: {
		USER: userReducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false,
		}),
});
export default store;
