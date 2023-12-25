import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { Link, router } from 'expo-router';
import { signOut } from 'firebase/auth';
import { AUTH } from '../../../firebase/config';

const App = () => {
	return (
		<View>
			<Text>Home Screen</Text>
			<Link href='/cart'>Cart</Link>
			<Link href='/signin'>Auth</Link>
			<TouchableOpacity
				onPress={() => {
					signOut(AUTH);
					router.replace('/(auth)');
				}}>
				<Text>Sign Out</Text>
			</TouchableOpacity>
		</View>
	);
};

export default App;

const styles = StyleSheet.create({});
