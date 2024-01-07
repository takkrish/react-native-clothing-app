import { View, Text, TouchableOpacity, Image, Modal } from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

const Account = () => {
	const { user } = useSelector((state) => state.USER);
	const [visible, setVisible] = React.useState(false);

	return (
		<SafeAreaView
			className='h-full'
			style={{
				backgroundColor: '#fff',
				paddingHorizontal: 20,
			}}>
			<View className=' items-start py-3 bg-white'>
				<Text
					className='text-xl text-center'
					style={{
						fontFamily: 'Inter_600SemiBold',
					}}>
					My Account
				</Text>
			</View>
			<Modal
				visible={visible}
				transparent={true}
				onRequestClose={() => setVisible(false)}
				animationType='fade'>
				<View className='w-full h-full items-center justify-center bg-black/80 p-4'>
					<TouchableOpacity
						activeOpacity={0.8}
						className='bg-zinc-50 rounded-full h-10 w-10 items-center justify-center flex self-end absolute top-4 right-4'
						onPress={() => setVisible(false)}>
						<Icon name='close' size={24} />
					</TouchableOpacity>
					<Image
						className='rounded-full'
						source={{
							uri: user.photo,
						}}
						style={{
							height: 300,
							width: 300,
						}}
						resizeMode='contain'
					/>
				</View>
			</Modal>
			<View className='flex flex-row items-center justify-start mt-4'>
				<TouchableOpacity
					onPress={() => {
						setVisible(true);
					}}>
					<Image
						className='rounded-full'
						resizeMode='cover'
						source={{ uri: user.photo }}
						style={{
							height: 100,
							width: 100,
						}}
					/>
				</TouchableOpacity>
				<View className='flex flex-col items-start justify-center ml-3'>
					<Text
						className='text-sm'
						style={{
							fontFamily: 'Inter_600SemiBold',
						}}>
						{user.name}
					</Text>
					<Text
						className='text-xs'
						style={{
							fontFamily: 'Inter_400Regular',
						}}>
						{user.email}
					</Text>
				</View>
			</View>
			<TouchableOpacity>
				<View className='flex flex-row items-center justify-start mt-4'>
					<Icon name='person-outline' size={20} color='#000' />
					<Text
						className='text-sm ml-3'
						style={{
							fontFamily: 'Inter_400Regular',
						}}>
						Orders
					</Text>
				</View>
			</TouchableOpacity>
			<TouchableOpacity>
				<View className='flex flex-row items-center justify-start mt-4'>
					<Icon name='settings-outline' size={20} color='#000' />
					<Text
						className='text-sm ml-3'
						style={{
							fontFamily: 'Inter_400Regular',
						}}>
						Settings
					</Text>
				</View>
			</TouchableOpacity>
			<TouchableOpacity>
				<View className='flex flex-row items-center justify-start mt-4'>
					<Icon name='help-outline' size={20} color='#000' />
					<Text
						className='text-sm ml-3'
						style={{
							fontFamily: 'Inter_400Regular',
						}}>
						Help
					</Text>
				</View>
			</TouchableOpacity>
			<TouchableOpacity
				onPress={async () => {
					await GoogleSignin.signOut();
					await AsyncStorage.removeItem('persist:root');
					router.replace('(auth)');
				}}>
				<View className='flex flex-row items-center justify-start mt-4'>
					<Icon name='log-out-outline' size={20} color='#000' />
					<Text
						className='text-sm ml-3'
						style={{
							fontFamily: 'Inter_400Regular',
						}}>
						Logout
					</Text>
				</View>
			</TouchableOpacity>
		</SafeAreaView>
	);
};

export default Account;
