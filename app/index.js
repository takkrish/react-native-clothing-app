import {
	View,
	Text,
	ImageBackground,
	TouchableOpacity,
	ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import React, { useState, useEffect } from 'react';
import { Redirect, router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { AUTH } from '../firebase/config.js';
import { onAuthStateChanged } from 'firebase/auth';

const GetStarted = () => {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		// setLoading(true);
		const subscriber = onAuthStateChanged(AUTH, (user) => {
			console.log(user);
			setUser(user);
		});

		// setLoading(false);
		return () => subscriber();
	}, []);

	if (user) {
		return <Redirect href={'/home'} />;
	}

	return loading ? (
		<ActivityIndicator size={'large'} />
	) : (
		<ImageBackground
			source={require('../assets/Cover.jpg')}
			className='h-full w-full relative'>
			<LinearGradient
				locations={[0.6, 1]}
				colors={['transparent', 'black']}
				className='h-full w-full absolute top-0 left-0 right-0 bottom-0'
			/>
			<View className='flex flex-col h-full w-full justify-end items-center pb-20'>
				<View className='flex flex-row justify-center items-center gap-5'>
					<Text className='text-2xl font-black text-white'>
						Get Started
					</Text>
					<TouchableOpacity
						className='rounded-full bg-red-500 aspect-square p-5'
						onPress={() => router.replace('/(auth)')}>
						<Text className='text-2xl font-black text-white'>
							<Icon
								name='arrowright'
								size={30}
								className='text-white'
							/>
						</Text>
					</TouchableOpacity>
				</View>
			</View>
		</ImageBackground>
	);
};

export default GetStarted;
