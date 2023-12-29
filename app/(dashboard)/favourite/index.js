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
import { removeFavourite } from '../../../redux/reducers/favouriteSlice';
import { router } from 'expo-router';

const Favourite = () => {
	const dispatch = useDispatch();
	const { favourites } = useSelector((state) => state.FAVOURITE);
	return (
		<SafeAreaView
			className='h-full'
			style={{
				backgroundColor: '#fff',
				paddingHorizontal: 20,
			}}>
			{favourites.length === 0 ? (
				<EmptyFavourites />
			) : (
				<View>
					<View className=' items-start py-3 bg-white'>
						<Text
							className='text-xl text-center pb-3'
							style={{
								fontFamily: 'Inter_600SemiBold',
							}}>
							Your Favourites
						</Text>
						<View className='bg-zinc-100 rounded-full p-2 flex flex-row items-center'>
							<View className='bg-zinc-200 rounded-full border border-zinc-400 h-8 w-8  flex items-center justify-center'>
								<Text
									style={{
										fontFamily: 'Inter_600SemiBold',
									}}>
									{favourites.length}
								</Text>
							</View>
							<Text
								style={{
									fontFamily: 'Inter_600SemiBold',
									paddingHorizontal: 10,
								}}>
								{favourites.length === 1
									? 'Product'
									: 'Products'}
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
								data={favourites}
								extraData={favourites}
								keyExtractor={(item, index) => item + index}
								contentContainerStyle={{
									gap: 10,
								}}
								renderItem={({ item, index }) => {
									return (
										<View
											key={index}
											className='flex p-2 flex-row bg-zinc-50 border border-zinc-200 rounded-xl overflow-hidden'>
											<TouchableOpacity
												onPress={() => {
													router.push(
														'/product/' + item.id
													);
												}}
												className='flex'>
												<Image
													className='rounded-xl'
													style={{
														width: 100,
														height: 120,
													}}
													source={item.imgSource}
												/>
											</TouchableOpacity>
											<View className='ml-3'>
												<Text
													className='text-base text-zinc-800'
													style={{
														fontFamily:
															'Inter_600SemiBold',
													}}>
													{item.name}
												</Text>
												<Text
													className='text-sm text-zinc-600'
													style={{
														fontFamily:
															'Inter_400Regular',
													}}>
													{item.type}
												</Text>
												<Text
													className='text-sm text-zinc-600'
													style={{
														fontFamily:
															'Inter_400Regular',
													}}>
													₹ {item.price}
												</Text>
												<TouchableOpacity
													className='flex items-center justify-center bg-zinc-100 rounded-full w-10 h-10 mt-2'
													onPress={() => {
														dispatch(
															removeFavourite({
																id: item.id,
															})
														);
													}}>
													<Icon
														name='trash-outline'
														size={20}
													/>
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

const EmptyFavourites = () => {
	return (
		<View className='h-full w-full flex items-center justify-center bg-white'>
			<View className='w-3/4 flex flex-col items-center justify-center gap-y-2'>
				<Icon name='heart' size={120} color={'rgb(228 ,228 ,231)'} />
				<Text
					className='text-2xl text-center text-zinc-800'
					style={{
						fontFamily: 'Inter_600SemiBold',
					}}>
					Nothing in your favourites
				</Text>
				<Text
					className='text-base text-center text-zinc-600'
					style={{
						fontFamily: 'Inter_400Regular',
					}}>
					Looks like you haven't added anything to your favourites yet
				</Text>
			</View>
		</View>
	);
};

export default Favourite;
