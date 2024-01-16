import {
	View,
	Text,
	TouchableOpacity,
	ScrollView,
	FlatList,
	Image,
} from 'react-native';
import React from 'react';
import { router, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import { useSelector } from 'react-redux';

const OrderID = () => {
	const { orderID } = useLocalSearchParams();
	const { orders } = useSelector((state) => state.ORDERS);
	const currentOrder = orders.filter((order) => order.id === orderID)[0];
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
				<TouchableOpacity className='bg-zinc-100 rounded-full w-12 h-12 flex justify-center items-center'>
					<Icon name='information-circle' size={30} />
				</TouchableOpacity>
			</View>
			<ScrollView showsVerticalScrollIndicator={false}>
				<View className='mb-5 bg-white rounded-xl border border-gray-300 overflow-hidden'>
					<Text
						className='p-4 border-b border-gray-300 bg-zinc-200 text-xs text-zinc-600'
						style={{
							fontFamily: 'Inter_600SemiBold',
						}}>
						#{currentOrder.id}
					</Text>
					<Text
						className='p-4 border-b border-gray-300 text-xs text-zinc-800'
						style={{
							fontFamily: 'Inter_600SemiBold',
						}}>
						{currentOrder.date}
					</Text>
					<View className='p-4 border-b border-zinc-300'>
						<FlatList
							scrollEnabled={false}
							data={currentOrder.items}
							contentContainerStyle={{
								gap: 10,
							}}
							renderItem={({ item, index }) => {
								return (
									<View
										key={index}
										className='flex flex-row justify-start items-start'>
										<TouchableOpacity
											onPress={() =>
												router.push(
													'/product/' + item.id
												)
											}>
											<Image
												source={item.imgSource}
												resizeMode='contain'
												style={{
													width: 120,
													height: 150,
												}}
												className='rounded-xl'
											/>
										</TouchableOpacity>
										<View className='ml-2'>
											<Text
												className='text-sm'
												style={{
													fontFamily:
														'Inter_600SemiBold',
												}}>
												{item.name}
											</Text>
											<Text
												className='text-xs mt-1'
												style={{
													fontFamily:
														'Inter_600SemiBold',
												}}>
												x{item.quantity}
											</Text>
										</View>
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
						{currentOrder.items.reduce(
							(prev, curr) => prev + curr.quantity,
							0
						)}
					</Text>
					<Text
						className='p-4 bg-emerald-300 text-xs'
						style={{
							fontFamily: 'Inter_600SemiBold',
						}}>
						Amount Paid : ₹{currentOrder.totalAmount}
					</Text>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
};

export default OrderID;
