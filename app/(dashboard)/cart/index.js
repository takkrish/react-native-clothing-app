import {
	FlatList,
	Image,
	ScrollView,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem } from '../../../redux/reducers/cartSlice';

const Cart = () => {
	const dispatch = useDispatch();
	const { items } = useSelector((state) => state.CART);
	return (
		<SafeAreaView
			style={{
				backgroundColor: '#fff',
				paddingHorizontal: 20,
			}}>
			{items.length === 0 ? (
				<EmptyCart />
			) : (
				<View>
					<View className='bg-white'>
						<Text
							className='text-xl py-3'
							style={{
								fontFamily: 'Inter_600SemiBold',
							}}>
							Shopping Cart
						</Text>
						<Text
							className='text-base py-3'
							style={{
								fontFamily: 'Inter_400Regular',
							}}>
							{items.length}{' '}
							{items.length === 1 ? 'Product' : 'Products'}
						</Text>
					</View>
					<ScrollView
						className='bg-yellow-300'
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
											className='flex flex-row bg-zinc-100 rounded-xl overflow-hidden'>
											<TouchableOpacity className='flex'>
												<Image
													className='rounded-xl'
													style={{
														width: 120,
														height: 150,
													}}
													source={require('../../../assets/roland-hechanova-nutRT2AD580-unsplash.jpg')}
												/>
											</TouchableOpacity>
											<View className='ml-3'>
												<Text
													className='text-base text-zinc-800'
													style={{
														fontFamily:
															'Inter_600SemiBold',
													}}>
													Avocado
												</Text>
												<Text
													className='text-sm text-zinc-600'
													style={{
														fontFamily:
															'Inter_400Regular',
													}}>
													Jacket
												</Text>
												<Text
													className='text-sm text-zinc-600'
													style={{
														fontFamily:
															'Inter_400Regular',
													}}>
													{item.name}
												</Text>
												<TouchableOpacity
													onPress={() => {
														dispatch(
															removeItem({
																id: item.id,
															})
														);
													}}>
													<Text>Remove</Text>
												</TouchableOpacity>
											</View>
										</View>
									);
								}}
							/>
						</View>
						<View></View>
						<View className='h-60'></View>
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
