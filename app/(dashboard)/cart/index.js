import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Link } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

const Cart = () => {
	return (
		<SafeAreaView>
			<View>
				<Text>Cart Screen</Text>
				<Link href={'../home/'}>Home</Link>
				<Link href={'cart/payment'}>Payment</Link>
			</View>
		</SafeAreaView>
	);
};

export default Cart;

const styles = StyleSheet.create({});
