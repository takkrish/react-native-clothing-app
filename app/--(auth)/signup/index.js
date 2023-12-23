import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Link } from 'expo-router';

const SignUp = () => {
	return (
		<View>
			<Text>SignUp</Text>
			<Link href={'/signin'}>SignIn</Link>
		</View>
	);
};

export default SignUp;

const styles = StyleSheet.create({});
