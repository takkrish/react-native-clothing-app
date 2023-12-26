import { View, ImageBackground, TouchableOpacity, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import React from 'react';
import { Link, router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

const Auth = () => {
	return (
		<SafeAreaView>
			<ImageBackground
				source={require('../../assets/roland-hechanova-nutRT2AD580-unsplash.jpg')}
				style={{ width: '100%', height: '100%' }}>
				<LinearGradient
					locations={[0.6, 1]}
					colors={['transparent', 'black']}
					className='h-full w-full absolute top-0 left-0 right-0 bottom-0'
				/>
				<View className='flex flex-col h-full justify-end items-center pb-10'>
					<View className='flex flex-col justify-center items-center gap-5 w-full'>
						<Text className='text-4xl font-black text-white'>
							Avacado
						</Text>
						<TouchableOpacity
							className='rounded-xl bg-white w-3/4 py-4 flex flex-row gap-x-3 items-center justify-center'
							onPress={() => router.push('/signup')}>
							<Text className='font-medium text-zinc-800'>
								Create an account
							</Text>
						</TouchableOpacity>
						<Text className='text-white'>
							Already have an account?{' '}
							<Link href='/signin'>
								<Text className='underline font-medium'>
									SignIn
								</Text>
							</Link>
						</Text>
					</View>
				</View>
			</ImageBackground>
		</SafeAreaView>
	);
};

export default Auth;
