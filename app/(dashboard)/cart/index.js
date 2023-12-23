import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Link } from 'expo-router';

const Cart = () => {
	return (
		<View>
			<Text>Cart Screen</Text>
			<Link href={'/'}>Home</Link>
		</View>
	);
};

export default Cart;

const styles = StyleSheet.create({});
