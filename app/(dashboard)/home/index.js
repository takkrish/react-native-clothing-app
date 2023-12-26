import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { Link, router } from 'expo-router';
import { signOut } from 'firebase/auth';
import { AUTH } from '../../../firebase/config';
import { useSelector } from 'react-redux';
import { SafeAreaView } from 'react-native-safe-area-context';

const App = () => {
	const { user } = useSelector((state) => state.USER);
	return (
		<SafeAreaView>
			<View>
				<Text>Home Screen</Text>
				<Link href='/cart'>Cart</Link>
				<Link href='/signin'>Auth</Link>
				<TouchableOpacity
					onPress={async () => {
						await signOut(AUTH);
						router.replace('/(auth)');
					}}>
					<Text>Sign Out</Text>
				</TouchableOpacity>
			</View>
		</SafeAreaView>
	);
};

export default App;

const styles = StyleSheet.create({});
