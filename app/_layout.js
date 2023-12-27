import React from 'react';
import { Provider } from 'react-redux';
import store from '../redux/store';
import { Stack } from 'expo-router';

const RootLayout = () => {
	return (
		<Provider store={store}>
			<Stack
				screenOptions={{
					headerShown: false,
				}}>
				<Stack.Screen name='index' />
				<Stack.Screen name='(auth)' />
				<Stack.Screen name='(dashboard)' />
				<Stack.Screen name='(product)/product/[productID]' />
			</Stack>
		</Provider>
	);
};

export default RootLayout;
