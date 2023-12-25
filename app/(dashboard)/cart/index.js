import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Link } from 'expo-router';

const Cart = () => {
	return (
		<View>
			<Text>Cart Screen</Text>
			<Link href={'../home/'}>Home</Link>
			<Link href={'cart/payment'}>Payment</Link>
		</View>
	);
};

export default Cart;

const styles = StyleSheet.create({});
