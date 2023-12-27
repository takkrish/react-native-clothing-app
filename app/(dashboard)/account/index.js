import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { signOut } from 'firebase/auth';
import { AUTH } from '../../../firebase/config';
import Icon from 'react-native-vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';

const Account = () => {
	return (
		<SafeAreaView>
			<View>
				<Text>Account</Text>
				<TouchableOpacity
					onPress={async () => {
						await signOut(AUTH);
						router.replace('(auth)');
					}}>
					<Icon name='person-outline' size={24} color='black' />
				</TouchableOpacity>
			</View>
		</SafeAreaView>
	);
};

export default Account;
