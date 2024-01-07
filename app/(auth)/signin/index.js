import {
	View,
	ImageBackground,
	TouchableOpacity,
	Text,
	TextInput,
	ActivityIndicator,
} from 'react-native';
import React, { useState, useEffect, useCallback } from 'react';
import { router } from 'expo-router';
import Icon from 'react-native-vector-icons/AntDesign';
import { LinearGradient } from 'expo-linear-gradient';
import Toast from 'react-native-root-toast';

import { AUTH } from '../../../firebase/config';
import {
	GOOGLE_IOS_CLIENT_ID,
	GOOGLE_ANDROID_CLIENT_ID,
	GOOGLE_WEB_CLIENT_ID,
} from '@env';
import {
	signInWithEmailAndPassword,
	GoogleAuthProvider,
	signInWithCredential,
} from 'firebase/auth';
// import * as Google from 'expo-auth-session/providers/google';
// import * as WebBrowser from 'expo-web-browser';
// import { GoogleAuthProvider, signInWithCredential } from 'firebase/auth';
// import { makeRedirectUri } from 'expo-auth-session';
import { useDispatch } from 'react-redux';
import { setUser } from '../../../redux/reducers/userSlice';
import { SafeAreaView } from 'react-native-safe-area-context';

import {
	GoogleSignin,
	statusCodes,
} from '@react-native-google-signin/google-signin';

GoogleSignin.configure();

// GoogleSignin.configure({
// 	scopes: ['https://www.googleapis.com/auth/drive.readonly'], // what API you want to access on behalf of the user, default is email and profile
// 	webClientId: '<FROM DEVELOPER CONSOLE>', // client ID of type WEB for your server. Required to get the idToken on the user object, and for offline access.
// 	offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
// 	hostedDomain: '', // specifies a hosted domain restriction
// 	forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
// 	accountName: '', // [Android] specifies an account name on the device that should be used
// 	iosClientId: '<FROM DEVELOPER CONSOLE>', // [iOS] if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
// 	googleServicePlistPath: '', // [iOS] if you renamed your GoogleService-Info file, new name here, e.g. GoogleService-Info-Staging
// 	openIdRealm: '', // [iOS] The OpenID2 realm of the home web server. This allows Google to include the user's OpenID Identifier in the OpenID Connect ID token.
// 	profileImageSize: 120, // [iOS] The desired height (and width) of the profile image. Defaults to 120px
// });

// WebBrowser.maybeCompleteAuthSession();

const SignIn = () => {
	const [email, setEmail] = useState('');
	const [loading, setLoading] = useState(false);
	const [password, setPassword] = useState('');
	const dispatch = useDispatch();

	const signIn = async () => {
		try {
			setLoading(true);
			await GoogleSignin.hasPlayServices({
				showPlayServicesUpdateDialog: true,
			});
			const { idToken } = await GoogleSignin.signIn();
			const googleCredential = GoogleAuthProvider.credential(idToken);
			const user = await signInWithCredential(AUTH, googleCredential);
			console.log(user);
			// dispatch(setUser(userInfo.user));
			// router.replace('/home');
		} catch (error) {
			if (error.code === statusCodes.SIGN_IN_CANCELLED) {
				console.log('SIGN_IN_CANCELLED');
				// user cancelled the login flow
			} else if (error.code === statusCodes.IN_PROGRESS) {
				console.log('IN_PROGRESS');
				// operation (e.g. sign in) is in progress already
			} else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
				console.log('PLAY_SERVICES_NOT_AVAILABLE');
				// play services not available or outdated
			} else {
				console.log(error);
				// some other error happened
			}
		} finally {
			setLoading(false);
		}
	};

	// useEffect(() => {}, []);

	// const [request, response, promptAsync] = Google.useAuthRequest({
	// 	iosClientId: GOOGLE_IOS_CLIENT_ID,
	// 	androidClientId: GOOGLE_ANDROID_CLIENT_ID,
	// 	webClientId: GOOGLE_WEB_CLIENT_ID,
	// 	redirectUri: makeRedirectUri({
	// 		scheme: 'com.takkrish.reactnativeclothingapp',
	// 		path: '/signin',
	// 	}),
	// });

	// const handlePrompt = useCallback(() => {
	// 	promptAsync();
	// }, [promptAsync]);

	// useEffect(() => {
	// 	const fetUser = async () => {
	// 		if (response?.type === 'success') {
	// 			const { id_token } = response.params;
	// 			const credential = GoogleAuthProvider.credential(id_token);
	// 			await signInWithCredential(AUTH, credential)
	// 				.then((data) => {
	// 					dispatch(setUser(data.user));
	// 					router.replace('/home');
	// 				})
	// 				.catch((error) => {
	// 					let toast = Toast.show(error.message, {
	// 						duration: Toast.durations.LONG,
	// 						position: Toast.positions.BOTTOM,
	// 						shadow: true,
	// 						animation: true,
	// 						hideOnPress: true,
	// 						delay: 0,
	// 					});
	// 				});
	// 		}
	// 		setLoading(false);
	// 	};
	// 	fetUser();
	// }, [response]);

	const handleSignin = async () => {
		await signInWithEmailAndPassword(AUTH, email, password)
			.then((userCredential) => {
				// Signed in
				const user = userCredential?.user;
				console.log({ user });
				// ...
			})
			.catch((error) => {
				const errorCode = error?.code;
				const errorMessage = error?.message;
				console.log({ error });
			});
	};

	return loading ? (
		<SafeAreaView>
			<View className='flex justify-center items-center h-full'>
				<ActivityIndicator size={'large'} />
			</View>
		</SafeAreaView>
	) : (
		<SafeAreaView>
			<ImageBackground
				source={
					require('../../../assets/katsiaryna-endruszkiewicz-BteCp6aq4GI-unsplash.jpg') ||
					''
				}
				style={{
					height: '100%',
					width: '100%',
				}}>
				<LinearGradient
					colors={['transparent', 'black']}
					className='h-full w-full absolute top-0 left-0 right-0 bottom-0'
				/>
				<View className='flex flex-col h-full justify-center items-center'>
					<View className='flex flex-col justify-center items-center gap-3 w-5/6 h-full'>
						<TextInput
							placeholder='Email'
							value={email}
							className='w-full bg-white rounded-xl px-5 py-4 font-medium'
							onChangeText={(value) => setEmail(value)}
						/>
						<TextInput
							placeholder='Password'
							value={password}
							className='w-full bg-white rounded-xl px-5 py-4 font-medium'
							secureTextEntry={true}
							passwordRules={true}
							onChangeText={(value) => setPassword(value)}
						/>
						<TouchableOpacity>
							<Text className='text-white text-sm underline'>
								Forgot Password?
							</Text>
						</TouchableOpacity>
						<TouchableOpacity
							className='bg-red-500 rounded-xl py-4 w-full'
							style={{ elevation: 10 }}
							onPress={handleSignin}>
							<Text className='text-center text-white font-medium'>
								Sign In
							</Text>
						</TouchableOpacity>
						<Text className='text-white py-4 font-medium'>OR</Text>
						<TouchableOpacity
							className='bg-white rounded-xl py-4 w-full flex flex-row justify-center items-center gap-x-2'
							style={{ elevation: 10 }}
							onPress={async () => {
								// handlePrompt();
								await signIn();
							}}>
							<Text className='text-center text-black font-medium'>
								Signin with Google
							</Text>
							<Icon name='google' size={20} color='black' />
						</TouchableOpacity>
					</View>
				</View>
			</ImageBackground>
		</SafeAreaView>
	);
};

export default SignIn;

// https://accounts.google.com/o/oauth2/v2/auth/oauthchooseaccount?
//code_challenge = Eg8ss7m41S_6H0AEnjm1phzDLZrDXi4FJumc8Tsl3po &
//code_challenge_method = S256 &

//
//redirect_uri = com.takkrish.reactnativeclothingapp % 3A % 2Foauthredirect &
//

//client_id = 220788833329 - edjpbej2sf420o0l1t2oojioruj1i2pd.apps.googleusercontent.com &
//response_type = code &
//state = ELyq54wx5G &
//scope = openid % 20https % 3A % 2F % 2Fwww.googleapis.com % 2Fauth % 2Fuserinfo.profile % 20https % 3A % 2F % 2Fwww.googleapis.com % 2Fauth % 2Fuserinfo.email &
//service = lso &
//o2v = 2 &
//theme = glif &
//flowName = GeneralOAuthFlow
