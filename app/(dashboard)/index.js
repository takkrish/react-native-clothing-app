import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Link } from 'expo-router';

const App = () => {
	return (
		<View>
			<Text>Home Screen</Text>
			<Link href='/cart'>Cart</Link>
			<Link href='/signin'>Auth</Link>
		</View>
	);
};

export default App;

const styles = StyleSheet.create({});
