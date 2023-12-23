import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Link } from 'expo-router';

const Auth = () => {
	return (
		<View>
			<Text>Auth</Text>
			<Link href={'/cart'}>Cart</Link>
			<Link href={'/signin'}>SignIn</Link>
			<Link href={'/signup/'}>SignUp</Link>
		</View>
	);
};

export default Auth;

const styles = StyleSheet.create({});
