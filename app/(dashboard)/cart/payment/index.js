import { Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
	useConfirmPayment,
	CardField,
	useStripe,
} from '@stripe/stripe-react-native';
import { useLocalSearchParams } from 'expo-router';

const API_URL = 'http://192.168.80.192:3000';

const Payment = () => {
	const { confirmPayment, loading } = useConfirmPayment();
	const [email, setEmail] = useState('');
	const [cardDetails, setCardDetails] = useState(null);
	const params = useLocalSearchParams();
	const [totalAmount, setTotalAmount] = useState(
		parseFloat(parseFloat(params.totalAmount).toFixed(2))
	);

	const handlePayPress = async () => {
		try {
			// 1. Gather customer billing information (ex. email)
			if (!cardDetails?.complete || !email) {
				Alert.alert('Please enter Complete card details and Email');
				return;
			}

			// 2. Call `/payment_intents` to create a PaymentIntent
			const { clientSecret, error } = await fetch(
				`${API_URL}/payments/create-payment-intent`,
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						paymentMethodType: 'card',
						currency: 'INR',
						amount: totalAmount * 100,
						email,
					}),
				}
			).then((res) => res.json());

			if (error) {
				Alert.alert(
					'Error when creating PaymentIntent',
					`Error: ${error.message}`
				);
				return;
			}

			// 3. Confirm the PaymentIntent using the card details
			const { paymentIntent, error: confirmationError } =
				await confirmPayment(clientSecret, {
					paymentMethodType: 'Card',
					paymentMethodData: {
						billingDetails: {
							email,
						},
					},
				});

			if (confirmationError) {
				// Payment confirmation failed - offer to select other payment methods
				Alert.alert(
					'Error when confirming payment',
					`Error message: ${confirmationError.message}`
				);
			}

			if (paymentIntent) {
				// Payment confirmation success
				Alert.alert(
					'Payment Successful',
					`Payment Success for Amount: ${totalAmount}, PaymentID: ${paymentIntent.id}`
				);
			}
		} catch (error) {
			Alert.alert('Error when processing payment', error.message);
		}
	};

	const { initPaymentSheet, presentPaymentSheet } = useStripe();

	const fetchPaymentSheetParams = async () => {
		try {
			const response = await fetch(`${API_URL}/payments/payment-sheet`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					currency: 'INR',
					amount: totalAmount * 100,
				}),
			});
			const { clientSecret, ephemeralKey, customer, error } =
				await response.json();

			if (error) {
				Alert.alert(
					'Error fetchPaymentSheetParams',
					`Error: ${error.message}`
				);
				return;
			}

			return {
				clientSecret,
				ephemeralKey,
				customer,
			};
		} catch (error) {
			Alert.alert('Error fetchPaymentSheetParams', error.message);
		}
	};

	const initializePaymentSheet = async () => {
		try {
			const { clientSecret, ephemeralKey, customer } =
				await fetchPaymentSheetParams();

			const { error } = await initPaymentSheet({
				merchantDisplayName: 'Krish Tak',
				customerId: customer,
				customerEphemeralKeySecret: ephemeralKey,
				paymentIntentClientSecret: clientSecret,
				// Set `allowsDelayedPaymentMethods` to true if your business can handle payment
				//methods that complete payment after a delay, like SEPA Debit and Sofort.
				allowsDelayedPaymentMethods: true,
				defaultBillingDetails: {
					email,
				},
			});
			if (error) {
				Alert.alert(`Error code: ${error.code}`, error.message);
				return;
			}
		} catch (error) {
			Alert.alert('Error initializePaymentSheet', error.message);
		}
	};

	useEffect(() => {
		initializePaymentSheet();
	}, [totalAmount]);

	const openPaymentSheet = async () => {
		try {
			const { error } = await presentPaymentSheet();

			if (error) {
				Alert.alert(`Error code: ${error.code}`, error.message);
				return;
			}

			Alert.alert(
				'Success',
				`Payment for ₹${totalAmount} is successful!`
			);
		} catch (error) {
			Alert.alert('Error openPaymentSheet', error.message);
		}
	};

	return (
		<SafeAreaView
			style={{
				flex: 1,
				padding: 20,
				backgroundColor: '#fff',
			}}>
			<View
				style={{
					flex: 1,
					justifyContent: 'center',
				}}>
				<Text
					style={{
						fontSize: 20,
						fontWeight: '600',
						marginBottom: 20,
					}}>
					Email
				</Text>
				<TextInput
					autoCompleteType='email'
					keyboardType='email-address'
					onChangeText={(text) => setEmail(text)}
					placeholder='Email'
					returnKeyType='next'
					textContentType='emailAddress'
					value={email}
				/>
				<Text
					style={{
						fontSize: 20,
						fontWeight: '600',
						marginTop: 20,
					}}>
					Card
				</Text>
				<CardField
					postalCodeEnabled={true}
					placeholder={{
						number: '4242 4242 4242 4242',
					}}
					cardStyle={{
						backgroundColor: '#FFFFFF',
						borderColor: '#000000',
						borderRadius: 10,
						borderWidth: 1,
					}}
					style={{
						height: 50,
						marginTop: 20,
					}}
					onCardChange={(cardDetails) => {
						setCardDetails(cardDetails);
					}}
				/>
				<Button
					disabled={!email || !cardDetails?.complete || loading}
					onPress={handlePayPress}
					title='Pay'
				/>
				<Button
					// variant='primary'
					// disabled={!loading}
					title='Checkout'
					onPress={openPaymentSheet}
				/>
			</View>
		</SafeAreaView>
	);
};

export default Payment;

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});
