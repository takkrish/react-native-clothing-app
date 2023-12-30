import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

import userReducer from '../reducers/userSlice';
import cartReducer from '../reducers/cartSlice';
import FavouriteReducer from '../reducers/favouriteSlice';

const reducers = combineReducers({
	USER: userReducer,
	CART: cartReducer,
	FAVOURITE: FavouriteReducer,
});

const persistConfig = {
	key: 'root',
	storage: AsyncStorage,
};
const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false,
		}),
});

export const persistor = persistStore(store);

export default store;
