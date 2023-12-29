import React from 'react';
import { Provider } from 'react-redux';
import store from '../redux/store';
import { Stack } from 'expo-router';
import { RootSiblingParent } from 'react-native-root-siblings';

const RootLayout = () => {
	return (
		<Provider store={store}>
			<RootSiblingParent>
				<Stack
					screenOptions={{
						headerShown: false,
					}}>
					<Stack.Screen name='index' />
					<Stack.Screen name='(auth)' />
					<Stack.Screen name='(dashboard)' />
					<Stack.Screen name='(product)/product/[productID]' />
				</Stack>
			</RootSiblingParent>
		</Provider>
	);
};

export default RootLayout;
