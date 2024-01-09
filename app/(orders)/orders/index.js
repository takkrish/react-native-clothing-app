import {
	View,
	Text,
	TouchableOpacity,
	FlatList,
	ScrollView,
	Image,
} from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import Icon from 'react-native-vector-icons/Ionicons';
import { useSelector } from 'react-redux';

const Order = () => {
	const { orders } = useSelector((state) => state.ORDERS);
	return (
		<SafeAreaView
			className='h-full'
			style={{
				paddingHorizontal: 20,
				backgroundColor: '#fff',
			}}>
			<View className='flex flex-row justify-between items-center bg-white py-2'>
				<TouchableOpacity
					className='bg-zinc-100 rounded-full w-12 h-12 flex justify-center items-center'
					onPress={() =>
						router.canGoBack()
							? router.back()
							: router.replace('(dashboard)/account')
					}>
					<Icon name='arrow-back' size={24} />
				</TouchableOpacity>
				<Text
					className='text-lg'
					style={{
						fontFamily: 'Inter_500Medium',
					}}>
					Orders
				</Text>
				<TouchableOpacity className='bg-zinc-100 rounded-full w-12 h-12 flex justify-center items-center'>
					<Icon name='information-circle' size={30} />
				</TouchableOpacity>
			</View>
			{orders.length === 0 ? (
				<EmptyOrder />
			) : (
				<ScrollView showsVerticalScrollIndicator={false}>
					<Text
						className='my-5'
						style={{
							fontFamily: 'Inter_600SemiBold',
						}}>
						Recent Orders
					</Text>
					<TouchableOpacity
						onPress={() =>
							router.push(`(orders)/orders/${orders[0].id}`)
						}
						activeOpacity={0.5}
						className='mb-5 bg-white rounded-xl border border-zinc-200 overflow-hidden'>
						<Text
							className='p-4 border-b border-gray-300 bg-zinc-200 text-xs text-zinc-600'
							style={{
								fontFamily: 'Inter_600SemiBold',
							}}>
							#{orders[0].id}
						</Text>
						<Text
							className='p-4 border-b border-gray-300 text-xs text-zinc-800'
							style={{
								fontFamily: 'Inter_600SemiBold',
							}}>
							{orders[0].date}
						</Text>
						<View className='p-4 border-b border-zinc-300'>
							<FlatList
								scrollEnabled={false}
								data={orders[0].items}
								contentContainerStyle={{
									gap: 10,
								}}
								renderItem={({ item, index }) => {
									return (
										<View
											key={index}
											className='flex flex-row justify-between items-center'>
											<Image
												resizeMode='contain'
												source={item.imgSource}
												style={{
													width: 80,
													height: 80,
												}}
												className='rounded-xl'
											/>
											<Text
												className='text-xs'
												style={{
													fontFamily:
														'Inter_600SemiBold',
												}}>
												{item.name}
											</Text>
											<Text
												className='text-xs'
												style={{
													fontFamily:
														'Inter_600SemiBold',
												}}>
												x{item.quantity}
											</Text>
										</View>
									);
								}}
							/>
						</View>
						<Text
							className='p-4 border-b border-gray-300 text-xs'
							style={{
								fontFamily: 'Inter_600SemiBold',
							}}>
							Total Items :{' '}
							{orders[0].items.reduce(
								(prev, curr) => prev + curr.quantity,
								0
							)}
						</Text>
						<Text
							className='p-4 bg-emerald-300 text-xs'
							style={{
								fontFamily: 'Inter_600SemiBold',
							}}>
							Amount Paid : ₹{orders[0].totalAmount}
						</Text>
					</TouchableOpacity>
					<Text
						className='my-5'
						style={{
							fontFamily: 'Inter_600SemiBold',
						}}>
						Order History
					</Text>
					<FlatList
						scrollEnabled={false}
						data={orders}
						renderItem={({ item, index }) => {
							const ordersList = item;
							if (index === 0) return null;
							return (
								<TouchableOpacity
									key={index}
									onPress={() =>
										router.push(
											`(orders)/orders/${ordersList.id}`
										)
									}
									activeOpacity={0.5}
									className='mb-5 bg-white rounded-xl border border-zinc-200 overflow-hidden'>
									<Text
										className='p-4 border-b border-gray-300 bg-zinc-200 text-xs text-zinc-600'
										style={{
											fontFamily: 'Inter_600SemiBold',
										}}>
										#{ordersList.id}
									</Text>
									<Text
										className='p-4 border-b border-gray-300 text-xs'
										style={{
											fontFamily: 'Inter_600SemiBold',
										}}>
										{ordersList.date}
									</Text>

									<View className='p-4 border-b border-zinc-300'>
										<FlatList
											scrollEnabled={false}
											data={item.items}
											renderItem={({ item, index }) => {
												const orderedItem = item;
												return (
													<View
														key={index}
														className='flex flex-row justify-between items-center'>
														<Text
															className='text-xs'
															style={{
																fontFamily:
																	'Inter_600SemiBold',
															}}>
															{orderedItem.name}
														</Text>
														<Text
															className='text-xs'
															style={{
																fontFamily:
																	'Inter_600SemiBold',
															}}>
															x
															{
																orderedItem.quantity
															}
														</Text>
													</View>
												);
											}}
										/>
									</View>
									<Text
										className='p-4 border-b border-gray-300 text-xs'
										style={{
											fontFamily: 'Inter_600SemiBold',
										}}>
										Total Items :{' '}
										{item.items.reduce(
											(prev, curr) =>
												prev + curr.quantity,
											0
										)}
									</Text>
									<Text
										className='p-4 bg-emerald-300 text-xs'
										style={{
											fontFamily: 'Inter_600SemiBold',
										}}>
										Amount Paid : ₹{ordersList.totalAmount}
									</Text>
								</TouchableOpacity>
							);
						}}
					/>
				</ScrollView>
			)}
		</SafeAreaView>
	);
};

const EmptyOrder = () => {
	return (
		<View className='flex flex-col items-center justify-center flex-1'>
			<Text
				className='text-lg text-center'
				style={{
					fontFamily: 'Inter_500Medium',
				}}>
				You have no orders
			</Text>
			<Text
				className='text-lg text-center'
				style={{
					fontFamily: 'Inter_500Medium',
				}}>
				You can start shopping now
			</Text>
		</View>
	);
};

export default Order;
