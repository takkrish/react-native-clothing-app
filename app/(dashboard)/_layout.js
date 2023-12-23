import React from 'react';
import { Tabs } from 'expo-router';

const DashboardLayout = () => {
	return (
		<Tabs>
			<Tabs.Screen
				name='index'
				options={{
					headerTitle: 'Home',
				}}
			/>
			<Tabs.Screen
				name='cart/index'
				options={{
					headerTitle: 'Cart',
				}}
			/>
		</Tabs>
	);
};

export default DashboardLayout;
