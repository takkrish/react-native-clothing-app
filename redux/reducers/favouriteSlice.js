import { createSlice } from '@reduxjs/toolkit';

const FavouriteSlice = createSlice({
	name: 'favourite',
	initialState: {
		favourites: [],
	},
	reducers: {
		addFavourite: (state, action) => {
			state.favourites = [action.payload, ...state.favourites];
		},
		removeFavourite: (state, action) => {
			state.favourites = state.favourites.filter(
				(item) => item.id !== action.payload.id
			);
		},
	},
});

export const { addFavourite, removeFavourite } = FavouriteSlice.actions;

export default FavouriteSlice.reducer;
