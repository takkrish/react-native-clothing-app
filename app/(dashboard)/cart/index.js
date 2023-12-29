import {
	FlatList,
	Image,
	ScrollView,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import { useSelector, useDispatch } from 'react-redux';
import {
	addQuantity,
	removeItem,
	subtractQuantity,
} from '../../../redux/reducers/cartSlice';
import { router } from 'expo-router';

const Cart = () => {
	const dispatch = useDispatch();
	const { items } = useSelector((state) => state.CART);
	const [totalCartItems, setTotalCartItems] = useState(0);
	const [subTotal, setSubTotal] = useState(0);
	const shippingCharges = 50;

	useEffect(() => {
		setTotalCartItems(
			items.reduce((prev, curr) => {
				return prev + curr.quantity;
			}, 0)
		);
	}, [items]);

	useEffect(() => {
		setSubTotal(
			items.reduce((prev, curr) => {
				return prev + curr.price * curr.quantity;
			}, 0)
		);
	}, [items]);
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
									gap: 10,
								}}
								renderItem={({ item, index }) => {
									return (
										<View
											key={index}
											className='flex flex-col p-2 bg-zinc-50 border border-zinc-200 rounded-xl overflow-hidden'>
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
															height: 120,
														}}
														source={item.imgSource}
													/>
												</TouchableOpacity>
												<View className='ml-2 justify-between'>
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
															className='text-sm text-zinc-800'
															style={{
																fontFamily:
																	'Inter_600SemiBold',
															}}>
															₹ {item.price}
														</Text>
													</View>
													<View className='flex flex-row w-full items-center gap-x-3 justify-center'>
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
															className='h-10 w-10 flex items-center justify-center bg-zinc-200 rounded-full'>
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
															className='h-10 w-10 flex items-center justify-center bg-zinc-200 rounded-full'>
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
															className='h-10 w-10 flex items-center justify-center bg-zinc-200 rounded-full'>
															<Icon
																name='trash-outline'
																size={20}
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
						<View className='bg-zinc-100 p-5 rounded-xl mt-5'>
							<View className='flex flex-row justify-between items-center'>
								<Text
									className='text-zinc-500'
									style={{
										fontFamily: 'Inter_600SemiBold',
									}}>
									Subtotal
								</Text>
								<Text
									className='text-zinc-500'
									style={{
										fontFamily: 'Inter_600SemiBold',
									}}>
									₹ {parseInt(subTotal).toFixed(2)}
								</Text>
							</View>
							<View className='flex flex-row justify-between items-center'>
								<Text
									className='text-zinc-500'
									style={{
										fontFamily: 'Inter_600SemiBold',
									}}>
									Shipping Charges
								</Text>
								<Text
									className='text-zinc-500'
									style={{
										fontFamily: 'Inter_600SemiBold',
									}}>
									₹ {parseInt(shippingCharges).toFixed(2)}
								</Text>
							</View>
							<View className='flex flex-row justify-between items-center mt-3'>
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
									₹{' '}
									{parseInt(
										subTotal + shippingCharges
									).toFixed(2)}
								</Text>
							</View>
							<TouchableOpacity className='flex items-center justify-center bg-emerald-500 rounded-xl mt-10 py-5'>
								<Text
									className='text-white text-base'
									style={{
										fontFamily: 'Inter_600SemiBold',
									}}>
									Proceed to Pay
								</Text>
							</TouchableOpacity>
						</View>
						<View className='h-40'></View>
					</ScrollView>
				</View>
			)}
		</SafeAreaView>
	);
};

const EmptyCart = () => {
	const dispatch = useDispatch();
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
