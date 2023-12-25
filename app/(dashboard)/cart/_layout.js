import { View, Text } from 'react-native';
import React from 'react';
import { Stack } from 'expo-router';

const CartLayout = () => {
	return (
		<Stack>
			<Stack.Screen
				name='index'
				options={{
					headerTitle: 'Cart',
				}}
			/>
			<Stack.Screen
				name='payment/index'
				options={{
					headerTitle: 'Payment',
				}}
			/>
		</Stack>
	);
};

export default CartLayout;
