import React from 'react';
import { Tabs } from 'expo-router';
import Icon from 'react-native-vector-icons/Ionicons';

const DashboardLayout = () => {
	return (
		<Tabs
			screenOptions={{
				tabBarHideOnKeyboard: true,
				headerTitleAlign: 'center',
				headerShadowVisible: true,
				tabBarShowLabel: false,
				headerShown: false,
				tabBarItemStyle: {
					// height: 80,
				},
				tabBarStyle: {
					height: 80,
					// borderRadius: 50,
					// position: 'absolute',
					// bottom: 20,
					// left: 20,
					// right: 20,
					elevation: 0,
					shadowColor: '#000',
					shadowOpacity: 0.1,
					shadowRadius: 0,
					shadowOffset: {
						width: 0,
						height: 0,
					},
				},
			}}>
			<Tabs.Screen
				name='home/index'
				options={{
					headerTitle: 'Home',
					tabBarIcon: ({ color, focused, size }) => (
						<Icon
							name={focused ? 'home' : 'home-outline'}
							size={size}
							color={color}
						/>
					),
				}}
			/>
			<Tabs.Screen
				name='cart'
				options={{
					headerTitle: 'Cart',
					headerShown: false,
					// tabBarBadge: 4,
					tabBarIcon: ({ color, focused, size }) => (
						<Icon
							name={focused ? 'cart' : 'cart-outline'}
							size={size}
							color={color}
						/>
					),
				}}
			/>

			<Tabs.Screen
				name='favourite/index'
				options={{
					headerTitle: 'Favourites',
					headerShown: false,
					tabBarIcon: ({ color, focused, size }) => (
						<Icon
							name={focused ? 'heart' : 'heart-outline'}
							size={size}
							color={color}
						/>
					),
				}}
			/>
			<Tabs.Screen
				name='account/index'
				options={{
					headerTitle: 'Account',
					headerShown: false,
					tabBarIcon: ({ color, focused, size }) => (
						<>
							<Icon
								name={focused ? 'person' : 'person-outline'}
								size={size}
								color={color}
							/>
							{/* <Text>Menu</Text> */}
						</>
					),
				}}
			/>
		</Tabs>
	);
};

export default DashboardLayout;
