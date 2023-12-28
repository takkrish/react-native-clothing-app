import {
	View,
	Text,
	TouchableOpacity,
	FlatList,
	ScrollView,
	TextInput,
	Image,
	Dimensions,
} from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { router } from 'expo-router';
import ReadMore from 'react-native-read-more-text';

// import ProductImageSlider from '../../../components/product/ProductImageSlider';

const { width } = Dimensions.get('window');
const data = Array(5).fill(
	require('../../../assets/roland-hechanova-nutRT2AD580-unsplash.jpg')
);

const bankOffers = [
	'10% Instant Discount on HDFC Bank Credit Cards and Credit/Debit EMI Transactions.',
	'10% Instant Discount on SBI Bank Credit Cards and Credit/Debit EMI Transactions.',
	'Get 10% Cashback of up to Rs.100 on your first ever Paytm UPI transaction on purchase of ₹3000 and above.',
	'10% Instant Discount on Axis Bank Credit Cards and Credit/Debit EMI Transactions.',
	'Get 10% Cashback of up to Rs.100 on your first ever Paytm UPI transaction on purchase of ₹5000 and above.',
	'10% Instant Discount on ICICI Bank Credit Cards and Credit/Debit EMI Transactions.',
];

const ProductID = () => {
	const [favourite, setFavourite] = useState(false);
	const [size, setSize] = useState('M');
	const [color, setColor] = useState('Blue');
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
							: router.replace('(dashboard)/home')
					}>
					<Icon name='arrow-back' size={24} />
				</TouchableOpacity>
				<Text
					className='text-lg'
					style={{
						fontFamily: 'Inter_500Medium',
					}}>
					Product
				</Text>
				<TouchableOpacity
					onPress={() => setFavourite((prev) => !prev)}
					className='bg-zinc-100 rounded-full w-12 h-12 flex justify-center items-center'>
					<Icon
						name={favourite ? 'heart' : 'heart-outline'}
						size={24}
						color={favourite ? '#EF4444' : '#000'}
					/>
				</TouchableOpacity>
			</View>
			<ScrollView
				className='flex flex-col gap-y-8 mt-0'
				showsVerticalScrollIndicator={false}>
				<ProductImageSlider />
				<View className='flex flex-row justify-between items-center'>
					<View className='flex flex-col'>
						<Text
							className='text-xl'
							style={{
								fontFamily: 'Inter_600SemiBold',
							}}>
							Avocado
						</Text>
						<Text
							className='text-sm'
							style={{
								fontFamily: 'Inter_400Regular',
							}}>
							Jacket
						</Text>
					</View>
					<View className='flex flex-row items-center justify-center gap-x-2'>
						<AntDesign name='star' size={20} color='#FBBF24' />
						<Text
							className='text-sm'
							style={{ fontFamily: 'Inter_600SemiBold' }}>
							4.2 (451)
						</Text>
					</View>
				</View>
				<View>
					<Text
						className='text-base mb-2'
						style={{
							fontFamily: 'Inter_600SemiBold',
						}}>
						Size
					</Text>
					<View>
						<FlatList
							showsHorizontalScrollIndicator={false}
							horizontal
							data={['S', 'M', 'L', 'XL', 'XXL']}
							keyExtractor={(item, index) => item}
							contentContainerStyle={{
								flex: 1,
								gap: 10,
								alignItems: 'center',
							}}
							renderItem={({ item }) => (
								<TouchableOpacity
									key={item}
									onPress={() => setSize(item)}
									className={`flex items-center justify-center rounded-full h-12 w-12 border  ${
										size === item
											? 'border-zinc-400 bg-zinc-200'
											: 'bg-zinc-50 border-zinc-100'
									}`}>
									<Text
										style={{
											fontFamily: 'Inter_400Regular',
										}}>
										{item}
									</Text>
								</TouchableOpacity>
							)}
						/>
					</View>
				</View>
				<View>
					<Text
						className='text-base mb-2'
						style={{
							fontFamily: 'Inter_600SemiBold',
						}}>
						Color
					</Text>
					<View>
						<FlatList
							keyExtractor={(item) => item}
							horizontal
							showsHorizontalScrollIndicator={false}
							data={[
								'Blue',
								'Yellow',
								'Red',
								'White',
								'Black',
								'Green',
							]}
							contentContainerStyle={{
								gap: 10,
							}}
							renderItem={({ item }) => (
								<TouchableOpacity
									onPress={() => setColor(item)}
									className={`flex items-center justify-center rounded-lg h-10 w-20 border  ${
										color === item
											? 'border-zinc-400 bg-zinc-200'
											: 'bg-zinc-50 border-zinc-100'
									}`}>
									<Text
										style={{
											fontFamily: 'Inter_400Regular',
										}}>
										{item}
									</Text>
								</TouchableOpacity>
							)}
						/>
					</View>
				</View>
				<View>
					<Text
						className='text-base mb-2'
						style={{ fontFamily: 'Inter_600SemiBold' }}>
						Delivery Details
					</Text>
					<Text
						className='text-sm mb-2'
						style={{ fontFamily: 'Inter_400Regular' }}>
						Enter Pincode to check delivery date and availability
						options.
					</Text>
					<View className='flex flex-row items-stretch gap-x-3'>
						<TextInput
							className='bg-gray-100 rounded-lg px-5 py-3 flex-1'
							style={{
								fontFamily: 'Inter_400Regular',
							}}
							placeholder='Please enter a pincode'
						/>
						<TouchableOpacity className='px-5 bg-amber-300 rounded-xl flex items-center justify-center'>
							<Text
								className='text-xs'
								style={{ fontFamily: 'Inter_600SemiBold' }}>
								Check
							</Text>
						</TouchableOpacity>
					</View>
				</View>
				<View>
					<Text
						className='text-base mb-2'
						style={{ fontFamily: 'Inter_600SemiBold' }}>
						Cashback Offers
					</Text>
					<FlatList
						scrollEnabled={false}
						data={bankOffers}
						contentContainerStyle={{
							flex: 1,
							gap: 16,
						}}
						keyExtractor={(item, index) => item}
						renderItem={({ item, index }) => (
							<View
								key={index}
								className='flex flex-row items-center justify-normal gap-x-3'>
								<Icon name='wallet' size={20} />
								<View className='flex gap-y-1 flex-1 items-start'>
									<Text
										style={{
											fontFamily: 'Inter_400Regular',
										}}>
										{item}
									</Text>
									<TouchableOpacity>
										<Text
											className='text-sky-600 text-xs'
											style={{
												fontFamily: 'Inter_500Medium',
											}}>
											T&C Apply
										</Text>
									</TouchableOpacity>
								</View>
							</View>
						)}
					/>
				</View>
				<View>
					<Text
						className='text-base mb-2'
						style={{
							fontFamily: 'Inter_600SemiBold',
						}}>
						Product Details
					</Text>
					<View>
						<FlatList
							data={[
								'Zipper Pocket',
								'Placement logo applique',
								'Long sleeves',
								'Zipper fastening',
								'100% Polyester',
								'Machine washable',
							]}
							contentContainerStyle={{
								gap: 4,
							}}
							scrollEnabled={false}
							renderItem={({ item, index }) => (
								<View
									key={index}
									className='flex gap-x-2 flex-row items-center'>
									<View className='h-1 w-1 rounded-full bg-zinc-800 text-zinc-800'></View>
									<Text
										style={{
											fontFamily: 'Inter_400Regular',
										}}>
										{item}
									</Text>
								</View>
							)}
						/>
					</View>
				</View>
				<View>
					<Text
						className='text-base mb-2'
						style={{
							fontFamily: 'Inter_600SemiBold',
						}}>
						Other Information
					</Text>
					<ReadMore
						numberOfLines={3}
						renderTruncatedFooter={(handlePress) => {
							return (
								<TouchableOpacity
									onPress={handlePress}
									activeOpacity={0.5}>
									<Text
										className='text-sm text-red-500'
										style={{
											fontFamily: 'Inter_400Regular',
										}}>
										Read more
									</Text>
								</TouchableOpacity>
							);
						}}
						renderRevealedFooter={(handlePress) => {
							return (
								<TouchableOpacity
									onPress={handlePress}
									activeOpacity={0.5}>
									<Text
										className='text-sm text-red-500'
										style={{
											fontFamily: 'Inter_400Regular',
										}}>
										Read less
									</Text>
								</TouchableOpacity>
							);
						}}>
						<Text
							className='text-sm'
							style={{
								fontFamily: 'Inter_400Regular',
							}}>
							Lorem ipsum, dolor sit amet consectetur adipisicing
							elit. Quia veritatis qui enim iure laboriosam
							expedita officia fugit est, quisquam ab temporibus
							nulla placeat, veniam incidunt vel voluptatum error
							nihil dolor. Dignissimos aut nemo voluptatem commodi
							harum accusantium velit odio fugit tempore suscipit
							vero asperiores voluptatum consequatur sapiente
							illum esse deleniti magnam beatae, repudiandae quae
							laborum! Deleniti architecto laborum, sapiente aut,
							repellat similique magni distinctio, ullam
							asperiores nostrum repudiandae veniam? Omnis,
							nesciunt minus nihil laborum, nobis veritatis neque
							laboriosam ad impedit rem aspernatur nostrum earum
							dolor ducimus quo tenetur, officia dolore doloribus
							ipsum. Pariatur necessitatibus libero placeat omnis.
							Nihil, quae? Corporis.
						</Text>
					</ReadMore>
				</View>
				<View className='flex flex-row justify-around items-start py-6 bg-zinc-100 rounded-xl'>
					<View className='flex justify-center items-center flex-1'>
						<Icon name='person' size={24} />
						<Text
							className='self-center text-xs mt-3'
							style={{
								fontFamily: 'Inter_500Medium',
								textAlign: 'center',
							}}>
							1M+
						</Text>
						<Text
							className='self-center text-xs'
							style={{
								fontFamily: 'Inter_500Medium',
								textAlign: 'center',
							}}>
							Happy
						</Text>
						<Text
							className='self-center text-xs'
							style={{
								fontFamily: 'Inter_500Medium',
								textAlign: 'center',
							}}>
							Customers
						</Text>
					</View>
					<View className='flex justify-center items-center flex-1'>
						<MaterialIcon name='security' size={24} />
						<Text
							className='self-center text-xs mt-3'
							style={{
								fontFamily: 'Inter_500Medium',
								textAlign: 'center',
							}}>
							Genuine
						</Text>
						<Text
							className='self-center text-xs'
							style={{
								fontFamily: 'Inter_500Medium',
								textAlign: 'center',
							}}>
							Product
						</Text>
					</View>
					<View className='flex justify-center items-center flex-1'>
						<Icon name='shield-checkmark' size={24} />
						<Text
							className='self-center text-xs mt-3'
							style={{
								fontFamily: 'Inter_500Medium',
								textAlign: 'center',
							}}>
							Quality
						</Text>
						<Text
							className='self-center text-xs'
							style={{
								fontFamily: 'Inter_500Medium',
								textAlign: 'center',
							}}>
							Checked
						</Text>
					</View>
				</View>
				<View>
					<Text
						className='text-base mb-2'
						style={{
							fontFamily: 'Inter_600SemiBold',
						}}>
						Customer Reviews
					</Text>
					<View className='flex flex-row items-center justify-between'>
						<View className='flex flex-row items-center'>
							<View className='flex flex-row items-center gap-x-2'>
								<AntDesign
									name='star'
									size={20}
									color='#FBBF24'
								/>
								<Text
									className='text-sm'
									style={{
										fontFamily: 'Inter_600SemiBold',
									}}>
									4.2
								</Text>
							</View>
							<Text
								className='text-sm'
								style={{
									fontFamily: 'Inter_400Regular',
								}}>
								(451)
							</Text>
						</View>
						<TouchableOpacity>
							<Text
								className='text-sm'
								style={{
									fontFamily: 'Inter_400Regular',
								}}>
								See All
							</Text>
						</TouchableOpacity>
					</View>
				</View>
				<View className='h-5'></View>
			</ScrollView>
			{/* <KeyboardAvoidingView enabled={false} behavior='height'> */}
			<View
				className='w-screen py-3
			 flex flex-row bottom-0 bg-zinc-100 self-center justify-around items-center'>
				<View className='flex flex-col justify-center items-center'>
					<Text style={{ fontFamily: 'Inter_400Regular' }}>
						Price
					</Text>
					<Text
						className='text-lg'
						style={{ fontFamily: 'Inter_600SemiBold' }}>
						₹ 1099.00
					</Text>
				</View>
				<TouchableOpacity
					// onPress={() => router.replace('(dashboard)/cart')}
					className='flex items-center justify-center bg-emerald-500 rounded-xl px-10 py-5'>
					<Text
						className='text-white'
						style={{
							fontFamily: 'Inter_600SemiBold',
						}}>
						Add to Cart
					</Text>
				</TouchableOpacity>
			</View>
			{/* </KeyboardAvoidingView> */}
		</SafeAreaView>
	);
};

const ProductImageSlider = () => {
	const [index, setIndex] = useState(0);
	return (
		<View className='rounded-xl overflow-hidden relative flex items-center justify-center'>
			<FlatList
				data={data}
				horizontal
				pagingEnabled
				keyExtractor={(item, index) => index}
				showsHorizontalScrollIndicator={false}
				onScroll={(e) => {
					setIndex(
						(e.nativeEvent.contentOffset.x / (width - 40)).toFixed(
							0
						)
					);
				}}
				renderItem={({ item, index, separators }) => {
					return (
						<Image
							key={index}
							source={item}
							resizeMethod='resize'
							resizeMode='cover'
							style={{
								height: 350,
								width: width - 40,
							}}
						/>
					);
				}}
			/>
			<View className='h-1 w-4/5 absolute bottom-2 rounded-full bg-white/30 flex flex-row items-center justify-center'>
				{data.map((item, idx) => {
					return (
						<View
							key={idx}
							className={`h-1 rounded-full  ${
								index == idx ? 'bg-zinc-50' : 'bg-transparent'
							}`}
							style={{
								flex: 1,
							}}
						/>
					);
				})}
			</View>
		</View>
	);
};

export default ProductID;
