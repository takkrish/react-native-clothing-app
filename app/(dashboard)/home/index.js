import {
	Dimensions,
	FlatList,
	Image,
	ScrollView,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import { router } from 'expo-router';
import { addItem } from '../../../redux/reducers/cartSlice';
import { productsData } from '../../../constants/productsData';
import { categories, categoriesArray } from '../../../constants/categories';

const { width } = Dimensions.get('window');

const App = () => {
	const { user } = useSelector((state) => state.USER);
	const [productItems, setProductItems] = useState(productsData);
	const [selectedCategory, setSelectedCategory] = useState(categories.all);

	useEffect(() => {
		if (selectedCategory === categories.all) {
			setProductItems(productsData);
		} else {
			setProductItems(
				productsData.filter((item) =>
					item.gender.includes(selectedCategory)
				)
			);
		}
	}, [selectedCategory]);

	return (
		<SafeAreaView
			style={{
				backgroundColor: '#fff',
				paddingHorizontal: 20,
			}}>
			<View className='flex flex-row justify-between items-center py-3'>
				<Text
					className='text-xl text-zinc-800 dark:text-zinc-100'
					style={{
						fontFamily: 'Inter_800ExtraBold',
					}}>
					Avocado
				</Text>
				<TouchableOpacity>
					<Icon
						name='notifications-outline'
						size={24}
						color='black'
					/>
				</TouchableOpacity>
			</View>

			<ScrollView
				className='flex flex-col gap-y-5 mt-0'
				showsVerticalScrollIndicator={false}
				stickyHeaderIndices={[2]}>
				<Text
					className='text-xl'
					style={{
						fontFamily: 'Inter_400Regular',
					}}>
					Save up to{' '}
					<Text
						style={{
							fontFamily: 'Inter_600SemiBold',
						}}>
						-50%
					</Text>{' '}
					using promocode{' '}
					<Text
						style={{
							fontFamily: 'Inter_600SemiBold',
						}}>
						BLACKFRIDAY
					</Text>
				</Text>
				<TextInput
					placeholder='Search'
					className='bg-gray-100 rounded-lg py-3 px-5'
					style={{
						fontFamily: 'Inter_400Regular',
					}}
				/>
				<View className='bg-white flex items-center justify-center py-3'>
					<FlatList
						contentContainerStyle={{
							gap: 10,
							display: 'flex',
						}}
						showsHorizontalScrollIndicator={false}
						horizontal
						data={categoriesArray}
						keyExtractor={(item, index) => index}
						renderItem={({ item, index }) => (
							<TouchableOpacity
								key={index}
								activeOpacity={0.5}
								onPress={() => {
									setSelectedCategory(item.name);
								}}
								className={`flex flex-row items-center bg-zinc-100 rounded-full py-2 px-3 ${
									selectedCategory === item.name &&
									'bg-zinc-300 border border-zinc-400'
								}`}>
								<Text
									className='text-xs font-normal mx-3'
									style={{
										fontFamily: 'Inter_400Regular',
									}}>
									{item.name}
								</Text>
							</TouchableOpacity>
						)}
					/>
				</View>
				<ProductsList productItems={productItems} />
				<View className='h-10'></View>
			</ScrollView>
		</SafeAreaView>
	);
};

const ProductsList = ({ productItems }) => {
	const dispatch = useDispatch();
	const { items } = useSelector((state) => state.CART);

	const handleAddItem = (item) => {
		const isAlreadyInCart = items.find((i) => i.id === item.id);
		isAlreadyInCart ? router.push('/cart') : dispatch(addItem(item));
	};

	return (
		<FlatList
			scrollEnabled={false}
			data={productItems}
			keyExtractor={(item) => item.id}
			numColumns={2}
			contentContainerStyle={{
				gap: 10,
			}}
			columnWrapperStyle={{
				gap: 10,
			}}
			renderItem={({ item, index }) => {
				const isAlreadyInCart = items.find((i) => i.id === item.id);
				return (
					<View
						className='flex flex-col justify-center items-center bg-zinc-100 rounded-xl overflow-hidden'
						key={index}>
						<TouchableOpacity
							onPress={() => router.push('product/' + item.id)}>
							<Image
								source={item.imgSource}
								style={{
									width: width / 2 - 25,
									height: 180,
								}}
							/>
							<View className='p-2'>
								<Text
									className='text-xs'
									style={{
										fontFamily: 'Inter_600SemiBold',
									}}>
									{item.name}
								</Text>
								<Text
									className='text-xs'
									style={{
										fontFamily: 'Inter_400Regular',
									}}>
									{item.type}
								</Text>
								<View className='flex flex-row justify-between items-center'>
									<Text
										style={{
											fontFamily: 'Inter_600SemiBold',
										}}>
										₹ {parseInt(item.price).toFixed(2)}
									</Text>
									<TouchableOpacity
										className='h-10 w-10 bg-white border border-zinc-200 rounded-full flex items-center justify-center'
										onPress={() => handleAddItem(item)}>
										<Icon
											name={
												isAlreadyInCart
													? 'cart'
													: 'add-circle'
											}
											size={isAlreadyInCart ? 20 : 24}
										/>
									</TouchableOpacity>
								</View>
							</View>
						</TouchableOpacity>
					</View>
				);
			}}
		/>
	);
};

export default App;
