import {
	View,
	Text,
	TouchableOpacity,
	FlatList,
	ScrollView,
} from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import Icon from 'react-native-vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux';
import { clearOrders } from '../../../redux/reducers/orderSlice';

const Order = () => {
	const { orders } = useSelector((state) => state.ORDERS);
	const dispatch = useDispatch();
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
						className='text-lg my-5'
						style={{
							fontFamily: 'Inter_500Medium',
						}}>
						Order History
					</Text>
					<FlatList
						scrollEnabled={false}
						data={orders}
						renderItem={({ item, index }) => {
							return (
								<TouchableOpacity
									activeOpacity={0.5}
									key={index}
									className='mb-5 bg-zinc-100 rounded-xl p-4'>
									<Text
										className=''
										style={{
											fontFamily: 'Inter_600SemiBold',
										}}>
										OrderId : #123456
									</Text>
									<Text>{JSON.stringify(item)}</Text>
								</TouchableOpacity>
							);
						}}
					/>
					<TouchableOpacity
						className='bg-zinc-100 rounded-xl p-4'
						onPress={() => dispatch(clearOrders())}>
						<Text
							className=''
							style={{
								fontFamily: 'Inter_600SemiBold',
							}}>
							Clear Orders
						</Text>
					</TouchableOpacity>
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
