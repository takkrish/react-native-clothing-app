import {
	View,
	ImageBackground,
	TouchableOpacity,
	Text,
	TextInput,
	ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { LinearGradient } from 'expo-linear-gradient';

import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

const SignUp = () => {
	return (
		<SafeAreaView>
			<ImageBackground
				source={require('../../../assets/roland-hechanova-nutRT2AD580-unsplash.jpg')}
				className='h-full w-full'>
				<LinearGradient
					colors={['transparent', 'black']}
					className='h-full w-full absolute top-0 left-0 right-0 bottom-0'
				/>
				<View className='flex flex-col h-full justify-center items-center'>
					<View className='flex flex-col justify-center items-center gap-3 w-5/6 h-full'>
						<TextInput
							placeholder='Full Name'
							// value=''
							className='w-full bg-white rounded-xl px-5 py-4 font-medium'
						/>
						<TextInput
							placeholder='Username'
							// value=''
							className='w-full bg-white rounded-xl px-5 py-4 font-medium'
						/>
						<TextInput
							placeholder='Email'
							// value=''
							className='w-full bg-white rounded-xl px-5 py-4 font-medium'
						/>
						<TextInput
							placeholder='Password'
							// value=''
							className='w-full bg-white rounded-xl px-5 py-4 font-medium'
							secureTextEntry={true}
							passwordRules={true}
						/>
						<TouchableOpacity>
							<Text className='text-white text-sm underline'>
								Forgot Password?
							</Text>
						</TouchableOpacity>
						<TouchableOpacity
							className='bg-red-500 rounded-xl px-5 py-4 w-full'
							style={{ elevation: 10 }}>
							<Text className='text-center text-white font-medium'>
								Sign Up
							</Text>
						</TouchableOpacity>
						<Text className='text-white py-4 font-medium'>OR</Text>
						<TouchableOpacity
							className='bg-white rounded-xl px-5 py-4 w-full flex flex-row justify-center items-center gap-x-2'
							style={{ elevation: 10 }}>
							<Text className='text-center text-black font-medium'>
								SignUp with Google
							</Text>
							<Icon name='google' size={20} color='black' />
						</TouchableOpacity>
					</View>
				</View>
			</ImageBackground>
		</SafeAreaView>
	);
};

export default SignUp;
