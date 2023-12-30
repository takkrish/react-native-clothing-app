import React, { useEffect, useState } from 'react';
import { Tabs } from 'expo-router';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSelector } from 'react-redux';
import { Platform } from 'react-native';

const DashboardLayout = () => {
	const { items } = useSelector((state) => state.CART);
	const [cartItems, setCartItems] = useState(0);
	useEffect(() => {
		setCartItems(
			items.reduce((prev, curr) => {
				return prev + curr.quantity;
			}, 0)
		);
	}, [items]);
	return (
		<Tabs
			screenOptions={{
				tabBarHideOnKeyboard: true,
				headerTitleAlign: 'center',
				headerShadowVisible: true,
				tabBarShowLabel: false,
				headerShown: false,
				tabBarIconStyle: {
					height: 50,
					flex: 0,
				},
				tabBarItemStyle: {
					justifyContent: 'center',
					flexGrow: 1,
				},
				tabBarStyle: {
					height: Platform.OS === 'ios' ? 90 : 60,
				},
			}}>
			<Tabs.Screen
				name='home/index'
				options={{
					headerTitle: 'Home',
					tabBarIcon: ({ color, focused, size }) => (
						<MaterialCommunityIcon
							name={focused ? 'storefront' : 'storefront-outline'}
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
					tabBarBadge: cartItems === 0 ? null : cartItems,
					tabBarBadgeStyle: {
						color: '#fff',
						fontSize: 12,
					},
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
						</>
					),
				}}
			/>
		</Tabs>
	);
};

export default DashboardLayout;
