import React from 'react';
import { Provider } from 'react-redux';
import store, { persistor } from '../redux/store';
import { Stack } from 'expo-router';
import { RootSiblingParent } from 'react-native-root-siblings';
import { PersistGate } from 'redux-persist/integration/react';
import { StripeProvider } from '@stripe/stripe-react-native';
import { PK_STRIPE } from '@env';

const RootLayout = () => {
	return (
		<Provider store={store}>
			<PersistGate persistor={persistor} loading={null}>
				<StripeProvider publishableKey={PK_STRIPE}>
					<RootSiblingParent>
						<Stack
							screenOptions={{
								headerShown: false,
							}}>
							<Stack.Screen name='index' />
							<Stack.Screen name='(auth)' />
							<Stack.Screen name='(dashboard)' />
							<Stack.Screen
								name='(product)/product/[productID]'
								options={{
									animation: 'slide_from_bottom',
								}}
							/>
						</Stack>
					</RootSiblingParent>
				</StripeProvider>
			</PersistGate>
		</Provider>
	);
};

export default RootLayout;
