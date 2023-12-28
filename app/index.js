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
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../redux/reducers/userSlice.js';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useFonts } from 'expo-font';
import {
	Inter_100Thin,
	Inter_200ExtraLight,
	Inter_300Light,
	Inter_400Regular,
	Inter_500Medium,
	Inter_600SemiBold,
	Inter_700Bold,
	Inter_800ExtraBold,
	Inter_900Black,
} from '@expo-google-fonts/inter';

import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();

const GetStarted = () => {
	const [loading, setLoading] = useState(true);
	const dispatch = useDispatch();
	const { user } = useSelector((state) => state.USER);
	const [fontsLoaded, fontError] = useFonts({
		Inter_100Thin,
		Inter_200ExtraLight,
		Inter_300Light,
		Inter_400Regular,
		Inter_500Medium,
		Inter_600SemiBold,
		Inter_700Bold,
		Inter_800ExtraBold,
		Inter_900Black,
	});

	useEffect(() => {
		const loaded = async () => {
			if (fontsLoaded || fontError) {
				await SplashScreen.hideAsync();
			}
		};
		loaded();
	}, [fontsLoaded]);

	useEffect(() => {
		return onAuthStateChanged(AUTH, (user) => {
			if (user) dispatch(setUser(user));
			setLoading(false);
		});
	}, []);

	if (!fontsLoaded && !fontError) {
		return null;
	}

	if (user) {
		return <Redirect href={'/home'} />;
	}

	return loading ? (
		<SafeAreaView>
			<View className='flex justify-center items-center h-full'>
				<ActivityIndicator size={'large'} />
			</View>
		</SafeAreaView>
	) : (
		<SafeAreaView>
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
		</SafeAreaView>
	);
};

export default GetStarted;
