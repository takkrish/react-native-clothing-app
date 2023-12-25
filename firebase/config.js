// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: 'AIzaSyBFG13Heq_BNPIfdzpJStDU9jfB8WyDGOs',
	authDomain: 'react-native-clothing-app.firebaseapp.com',
	projectId: 'react-native-clothing-app',
	storageBucket: 'react-native-clothing-app.appspot.com',
	messagingSenderId: '929595983793',
	appId: '1:929595983793:web:4c171dc0bf7fe1cdb39f90',
};

// Initialize Firebase with async storage persistence and without analytics

const app = initializeApp(firebaseConfig);

export const AUTH = initializeAuth(app, {
	persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
// export const AUTH = getAuth(app);

// IOS : 220788833329-kj1cr2hn1r9j76pcagbbk8ogi785g8er.apps.googleusercontent.com
// Android : 220788833329-edjpbej2sf420o0l1t2oojioruj1i2pd.apps.googleusercontent.com
