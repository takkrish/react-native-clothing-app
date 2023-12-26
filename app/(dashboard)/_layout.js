import React from 'react';
import { Tabs } from 'expo-router';
import Icon from 'react-native-vector-icons/Ionicons';
import { SafeAreaView, Text, TouchableOpacity, View } from 'react-native';

const DashboardLayout = () => {
	return (
		<>
			<Tabs
				screenOptions={{
					tabBarHideOnKeyboard: true,
					headerTitleAlign: 'center',
					headerShadowVisible: true,
					tabBarShowLabel: false,
					headerShown: false,
					tabBarItemStyle: {
						height: 70,
					},
					tabBarStyle: {
						height: 70,
						borderRadius: 20,
						position: 'absolute',
						bottom: 30,
						left: 20,
						right: 20,
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
								size={size * 0.9}
								color={color}
							/>
						),
					}}
				/>
				<Tabs.Screen
					name='search/index'
					options={{
						headerTitle: 'Search',
						headerShown: false,
						tabBarIcon: ({ color, focused, size }) => (
							<Icon
								name={focused ? 'search' : 'search-outline'}
								size={size * 0.8}
								color={color}
							/>
						),
					}}
				/>
				<Tabs.Screen
					name='menu/index'
					options={{
						headerTitle: 'Menu',
						headerShown: false,
						tabBarIcon: ({ color, focused, size }) => (
							<>
								<Icon
									name={focused ? 'menu' : 'menu-outline'}
									size={size * 0.8}
									color={color}
								/>
								{/* <Text>Menu</Text> */}
							</>
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
								size={size * 0.8}
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
								size={size * 0.8}
								color={color}
							/>
						),
					}}
				/>
			</Tabs>
		</>
	);
};

export default DashboardLayout;
