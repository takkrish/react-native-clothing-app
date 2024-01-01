import { Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useConfirmPayment, CardField } from '@stripe/stripe-react-native';

const Payment = () => {
	const { confirmPayment, loading } = useConfirmPayment();
	const [email, setEmail] = React.useState('');
	const [cardDetails, setCardDetails] = React.useState(null);

	const handlePayPress = async () => {
		// 1. Gather customer billing information (ex. email)
		if (!cardDetails?.complete || !email) {
			Alert.alert('Please enter Complete card details and Email');
			return;
		}

		// 2. Call `/payment_intents` to create a PaymentIntent
		const { clientSecret, error } = await fetch(
			'http://localhost:3000/payments/create-payment-intent',
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					paymentMethodType: 'card',
					currency: 'INR',
					amount: 5000,
					email,
				}),
			}
		).then((res) => res.json());

		if (error) {
			console.log('error', error);
			Alert.alert('Error when creating PaymentIntent', `Error: ${error}`);
			return;
		}

		// 3. Confirm the PaymentIntent using the card details
		const { paymentIntent, error: confirmationError } =
			await confirmPayment(clientSecret, {
				type: 'Card',
				billingDetails: {
					email: email,
				},
			});

		if (confirmationError) {
			// Payment confirmation failed - offer to select other payment methods
			console.log('confirmationError', confirmationError);
			Alert.alert(
				'Error when confirming payment',
				`Error message: ${confirmationError.message}`
			);
		}

		if (paymentIntent) {
			// Payment confirmation success
			console.log('Payment Successful', paymentIntent);
			Alert.alert(
				'Payment Successful',
				`Payment Success ${paymentIntent.id}`
			);
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
