import React from 'react';
import { Stack } from 'expo-router';

const Layout = () => {
	return (
		<Stack>
			{/* <Stack.Screen
				name='(auth)'
				options={{
					headerTitle: 'Auth',
				}}
			/> */}
			<Stack.Screen
				name='(dashboard)'
				options={{
					headerTitle: 'Dashboard',
				}}
			/>
		</Stack>
	);
};

export default Layout;
