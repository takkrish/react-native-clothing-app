import React from 'react';
import { Stack } from 'expo-router';

const AuthLayout = () => {
	return (
		<Stack
			screenOptions={{
				headerShown: false,
			}}>
			<Stack.Screen
				name='index'
				options={{
					headerTitle: 'Auth',
				}}
			/>
			<Stack.Screen
				name='signin/index'
				options={{
					headerTitle: 'SignIn',
				}}
			/>
			<Stack.Screen
				name='signup/index'
				options={{
					headerTitle: 'SignUp',
				}}
			/>
		</Stack>
	);
};

export default AuthLayout;
