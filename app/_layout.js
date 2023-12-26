import React from 'react';
import { Provider } from 'react-redux';
import store from '../redux/store';
import { Slot } from 'expo-router';

const RootLayout = () => {
	return (
		<Provider store={store}>
			<Slot />
		</Provider>
	);
};

export default RootLayout;
