import React from 'react';
import { Tabs } from 'expo-router';

const DashboardLayout = () => {
	return (
		<Tabs>
			<Tabs.Screen
				name='home/index'
				options={{
					headerTitle: 'Home',
				}}
			/>
			<Tabs.Screen
				name='cart'
				options={{
					headerTitle: 'Cart',
					headerShown: false,
				}}
			/>
		</Tabs>
	);
};

export default DashboardLayout;
