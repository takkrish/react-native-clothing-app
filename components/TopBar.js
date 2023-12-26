import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { router } from 'expo-router';
import { AUTH } from '../firebase/config';
import { signOut } from 'firebase/auth';

const TopBar = () => {
	return (
		<View className='flex flex-row justify-between items-center w-full bg-red-500'>
			<Text className='text-xl font-bold py-3'>Avacado</Text>
			<View className='flex flex-row gap-x-5'>
				<TouchableOpacity>
					<Icon
						name='notifications-outline'
						size={24}
						color='black'
					/>
				</TouchableOpacity>
				<TouchableOpacity
					onPress={async () => {
						await signOut(AUTH);
						router.replace('(auth)');
					}}>
					<Icon name='person-outline' size={24} color='black' />
				</TouchableOpacity>
			</View>
		</View>
	);
};

export default TopBar;
