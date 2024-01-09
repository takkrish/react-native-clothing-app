import {
	FlatList,
	Image,
	ScrollView,
	Text,
	TouchableOpacity,
	View,
	Button,
	Alert,
	TextInput,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import { useSelector, useDispatch } from 'react-redux';
import {
	addQuantity,
	emptyCart,
	removeItem,
	subtractQuantity,
} from '../../../redux/reducers/cartSlice';
import { newOrder } from '../../../redux/reducers/orderSlice';
import { router } from 'expo-router';
import {
	useConfirmPayment,
	CardField,
	useStripe,
} from '@stripe/stripe-react-native';

import { API_URL } from '@env';
import { randomUUID } from 'expo-crypto';

const Cart = () => {
	const dispatch = useDispatch();
	const { items } = useSelector((state) => state.CART);
	const [totalCartItems, setTotalCartItems] = useState(0);
	const [subTotal, setSubTotal] = useState(0);
	const [shippingCharges, setShippingCharges] = useState(0);
	const platformFee = 25;
	const [totalAmount, setTotalAmount] = useState(0);

	useEffect(() => {
		setTotalCartItems(
			items.reduce((prev, curr) => {
				return prev + curr.quantity;
			}, 0)
		);
		setSubTotal(
			items.reduce((prev, curr) => {
				return prev + curr.price * curr.quantity;
			}, 0)
		);
	}, [items]);

	useEffect(() => {
		setShippingCharges(subTotal * 0.025);
	}, [subTotal]);

	useEffect(() => {
		setTotalAmount(subTotal + shippingCharges + platformFee);
	}, [shippingCharges]);

	// const { confirmPayment, loading } = useConfirmPayment();
	const [email, setEmail] = useState('takrishtak2002@gmail.com');
	// const [cardDetails, setCardDetails] = useState(null);
	const [paymentInProgress, setPaymentInProgress] = useState(false);

	// const handlePayPress = async () => {
	// 	try {
	// 		// 1. Gather customer billing information (ex. email)
	// 		if (!cardDetails?.complete || !email) {
	// 			Alert.alert('Please enter Complete card details and Email');
	// 			return;
	// 		}

	// 		// 2. Call `/payment_intents` to create a PaymentIntent
	// 		const { clientSecret, error } = await fetch(
	// 			`${API_URL}/payments/create-payment-intent`,
	// 			{
	// 				method: 'POST',
	// 				headers: {
	// 					'Content-Type': 'application/json',
	// 				},
	// 				body: JSON.stringify({
	// 					paymentMethodType: 'card',
	// 					currency: 'INR',
	// 					amount:
	// 						Math.round(totalAmount * 100) *
	// 						100,
	// 					email,
	// 				}),
	// 			}
	// 		).then((res) => res.json());

	// 		if (error) {
	// 			Alert.alert(
	// 				'Error when creating PaymentIntent',
	// 				`Error: ${error.message}`
	// 			);
	// 			return;
	// 		}

	// 		// 3. Confirm the PaymentIntent using the card details
	// 		const { paymentIntent, error: confirmationError } =
	// 			await confirmPayment(clientSecret, {
	// 				paymentMethodType: 'Card',
	// 				paymentMethodData: {
	// 					billingDetails: {
	// 						email,
	// 					},
	// 				},
	// 			});

	// 		if (confirmationError) {
	// 			// Payment confirmation failed - offer to select other payment methods
	// 			Alert.alert(
	// 				'Error when confirming payment',
	// 				`Error message: ${confirmationError.message}`
	// 			);
	// 		}

	// 		if (paymentIntent) {
	// 			// Payment confirmation success
	// 			Alert.alert(
	// 				'Payment Successful',
	// 				`Payment Success for Amount: ${totalAmount}, PaymentID: ${paymentIntent.id}`
	// 			);
	// 		}
	// 	} catch (error) {
	// 		Alert.alert('Error when processing payment', error.message);
	// 	}
	// };

	const { initPaymentSheet, presentPaymentSheet } = useStripe();

	const fetchPaymentSheetParams = async () => {
		try {
			const response = await fetch(
				`${'http://192.168.152.192:3000'}/payments/payment-sheet`,
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						currency: 'INR',
						amount: Math.round(totalAmount * 100),
					}),
				}
			);
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

	const openPaymentSheet = async () => {
		try {
			setPaymentInProgress(true);
			await initializePaymentSheet();
			const { error } = await presentPaymentSheet();
			if (error) {
				// Alert.alert(`Error code: ${error.code}`, error.message);
				// console.log(error);
				return;
			}
			const currentDate = new Date();
			dispatch(
				newOrder({
					id: randomUUID(),
					date:
						currentDate.toDateString() +
						' ' +
						currentDate.toLocaleTimeString(),
					totalAmount: parseFloat(totalAmount).toFixed(2),
					items,
				})
			);
			dispatch(emptyCart());
			Alert.alert(
				'Success',
				`Payment for ₹${parseFloat(totalAmount).toFixed(
					2
				)} is successful!`
			);
		} catch (error) {
			Alert.alert('Error openPaymentSheet', error.message);
		} finally {
			setPaymentInProgress(false);
		}
	};

	return (
		<SafeAreaView
			className='h-full'
			style={{
				backgroundColor: '#fff',
				paddingHorizontal: 20,
			}}>
			{totalCartItems === 0 ? (
				<EmptyCart />
			) : (
				<View>
					<View className=' items-start py-3 bg-white'>
						<Text
							className='text-xl text-center pb-3'
							style={{
								fontFamily: 'Inter_600SemiBold',
							}}>
							Shopping Cart
						</Text>
						<View className='bg-zinc-100 rounded-full p-2 flex flex-row items-center'>
							<View className='bg-zinc-200 rounded-full border border-zinc-400 h-8 w-8  flex items-center justify-center'>
								<Text
									style={{
										fontFamily: 'Inter_600SemiBold',
									}}>
									{totalCartItems}
								</Text>
							</View>
							<Text
								style={{
									fontFamily: 'Inter_600SemiBold',
									paddingHorizontal: 10,
								}}>
								{totalCartItems === 1 ? 'Product' : 'Products'}
							</Text>
						</View>
					</View>
					<ScrollView
						className='pt-5'
						scrollEnabled={true}
						showsVerticalScrollIndicator={false}>
						<View>
							<FlatList
								scrollEnabled={false}
								data={items}
								extraData={items}
								keyExtractor={(item, index) => item + index}
								contentContainerStyle={{
									gap: 20,
								}}
								renderItem={({ item, index }) => {
									return (
										<View
											key={index}
											className='flex flex-col p-2 bg-white border border-zinc-200 rounded-xl overflow-hidden'>
											<View className='flex flex-row'>
												<TouchableOpacity
													onPress={() => {
														router.push(
															'/product/' +
																item.id
														);
													}}
													className='flex'>
													<Image
														resizeMode='cover'
														className='rounded-xl'
														style={{
															width: 100,
															height: 150,
														}}
														source={item.imgSource}
													/>
												</TouchableOpacity>
												<View className='ml-2 justify-between flex-1'>
													<View>
														<Text
															className='text-sm text-zinc-800'
															style={{
																fontFamily:
																	'Inter_600SemiBold',
															}}>
															{item.name}
														</Text>
														<Text
															className='text-xs text-zinc-600'
															style={{
																fontFamily:
																	'Inter_400Regular',
															}}>
															{item.type}
														</Text>
														<Text
															className='text-sm text-emerald-500'
															style={{
																fontFamily:
																	'Inter_600SemiBold',
															}}>
															{'₹' +
																parseFloat(
																	item.price
																).toFixed(2)}
														</Text>
													</View>
													<View className='flex flex-row items-center justify-center gap-x-3'>
														<TouchableOpacity
															disabled={
																item.quantity ===
																1
															}
															onPress={() => {
																dispatch(
																	subtractQuantity(
																		{
																			id: item.id,
																		}
																	)
																);
															}}
															className='h-10 w-10 flex items-center justify-center bg-zinc-100 rounded-full'>
															<Icon
																name='remove-circle-outline'
																size={24}
															/>
														</TouchableOpacity>
														<Text
															style={{
																fontFamily:
																	'Inter_600SemiBold',
															}}>
															{item.quantity}
														</Text>
														<TouchableOpacity
															disabled={
																item.quantity ===
																10
															}
															onPress={() => {
																dispatch(
																	addQuantity(
																		{
																			id: item.id,
																		}
																	)
																);
															}}
															className='h-10 w-10 flex items-center justify-center bg-zinc-100 rounded-full'>
															<Icon
																name='add-circle-outline'
																size={24}
															/>
														</TouchableOpacity>
														<TouchableOpacity
															onPress={() => {
																dispatch(
																	removeItem({
																		id: item.id,
																	})
																);
															}}
															className='h-10 w-10 flex items-center justify-center bg-zinc-800 rounded-full'>
															<Icon
																name='trash-outline'
																size={18}
																color={'#fff'}
															/>
														</TouchableOpacity>
													</View>
												</View>
											</View>
										</View>
									);
								}}
							/>
						</View>
						<View className='py-5 mt-5 rounded-xl px-4 flex-row flex justify-between bg-zinc-100'>
							<View className='flex flex-row justify-center items-center'>
								<Icon name='bookmark-outline' size={20} />
								<Text
									className='text-sm ml-2'
									style={{
										fontFamily: 'Inter_600SemiBold',
									}}>
									Apply Coupon
								</Text>
							</View>
							<TouchableOpacity className='flex justify-center items-center'>
								<Text
									className='text-sm ml-2'
									style={{
										fontFamily: 'Inter_600SemiBold',
									}}>
									Select
								</Text>
							</TouchableOpacity>
						</View>
						<View className='mt-5 items-center'>
							<Text
								className='text-xs'
								style={{
									fontFamily: 'Inter_400Regular',
								}}>
								Assured Quality | 100% Handpicked | Easy
								Exchange
							</Text>
						</View>
						<View className='bg-zinc-100 p-5 rounded-xl mt-5'>
							<View className='flex flex-row justify-between items-center mb-1'>
								<Text
									className='text-zinc-500 text-sm'
									style={{
										fontFamily: 'Inter_400Regular',
									}}>
									Subtotal
								</Text>
								<Text
									className='text-zinc-500 text-sm'
									style={{
										fontFamily: 'Inter_400Regular',
									}}>
									{'₹' + parseFloat(subTotal).toFixed(2)}
								</Text>
							</View>
							<View className='flex flex-row justify-between items-center mb-1'>
								<Text
									className='text-zinc-500 text-sm'
									style={{
										fontFamily: 'Inter_400Regular',
									}}>
									Shipping Charges
								</Text>
								<Text
									className='text-zinc-500 text-sm'
									style={{
										fontFamily: 'Inter_400Regular',
									}}>
									{'₹' +
										parseFloat(shippingCharges).toFixed(2)}
								</Text>
							</View>
							<View className='flex flex-row justify-between items-center mb-5'>
								<Text
									className='text-zinc-500 text-sm'
									style={{
										fontFamily: 'Inter_400Regular',
									}}>
									Platform Fee
								</Text>
								<Text
									className='text-zinc-500 text-sm'
									style={{
										fontFamily: 'Inter_400Regular',
									}}>
									{'₹' + parseFloat(platformFee).toFixed(2)}
								</Text>
							</View>
							<View className='flex flex-row justify-between items-center'>
								<Text
									className='text-zinc-800 text-base'
									style={{
										fontFamily: 'Inter_600SemiBold',
									}}>
									Grand Total
								</Text>
								<Text
									className='text-zinc-800 text-base'
									style={{
										fontFamily: 'Inter_600SemiBold',
									}}>
									{'₹' +
										parseFloat(
											subTotal +
												shippingCharges +
												platformFee
										).toFixed(2)}
								</Text>
							</View>
							<TouchableOpacity
								disabled={paymentInProgress}
								onPress={openPaymentSheet}
								className={`flex items-center justify-center ${
									paymentInProgress
										? 'bg-zinc-300'
										: 'bg-emerald-500'
								} rounded-xl mt-5 py-5`}>
								<Text
									className='text-white text-base'
									style={{
										fontFamily: 'Inter_600SemiBold',
									}}>
									Proceed to Pay
								</Text>
							</TouchableOpacity>
						</View>
						{/* <View
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
								disabled={
									!email || !cardDetails?.complete || loading
								}
								onPress={handlePayPress}
								title='Pay'
							/>
						</View> */}
						<View className='h-40'></View>
					</ScrollView>
				</View>
			)}
		</SafeAreaView>
	);
};

const EmptyCart = () => {
	return (
		<View className='h-full w-full flex items-center justify-center bg-white'>
			<View className='w-3/4 flex flex-col items-center justify-center gap-y-2'>
				<Icon name='cart' size={120} color={'rgb(228 ,228 ,231)'} />
				<Text
					className='text-2xl text-center text-zinc-800'
					style={{
						fontFamily: 'Inter_600SemiBold',
					}}>
					Your cart is empty
				</Text>
				<Text
					className='text-base text-center text-zinc-600'
					style={{
						fontFamily: 'Inter_400Regular',
					}}>
					Looks like you haven't added anything to your cart yet
				</Text>
			</View>
		</View>
	);
};

export default Cart;
