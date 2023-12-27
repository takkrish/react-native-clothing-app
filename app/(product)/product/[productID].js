import {
	View,
	Text,
	TouchableOpacity,
	FlatList,
	Image,
	Dimensions,
	ScrollView,
} from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { router } from 'expo-router';
import ReadMore from 'react-native-read-more-text';

const data = Array(6).fill(
	require('../../../assets/roland-hechanova-nutRT2AD580-unsplash.jpg')
);
const { width } = Dimensions.get('window');

const ProductID = () => {
	const [index, setIndex] = useState(0);
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
						fontFamily: 'Poppins_500Medium',
					}}>
					Product
				</Text>
				<TouchableOpacity className='bg-zinc-100 rounded-full w-12 h-12 flex justify-center items-center'>
					<Icon name='heart-outline' size={24} />
				</TouchableOpacity>
			</View>
			<ScrollView
				className='flex flex-col gap-y-3 mt-0'
				showsVerticalScrollIndicator={false}>
				<View className='rounded-xl overflow-hidden w-full relative flex items-center'>
					<FlatList
						data={data}
						horizontal
						pagingEnabled
						keyExtractor={(item, index) => index}
						showsHorizontalScrollIndicator={false}
						onScroll={(e) => {
							setIndex(
								(
									e.nativeEvent.contentOffset.x /
									(width - 40)
								).toFixed(0)
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
					<View className='h-1 w-4/5 absolute bottom-3 rounded-full bg-zinc-400 flex flex-row items-center justify-center'>
						{data.map((item, idx) => {
							return (
								<View
									key={idx}
									className={`h-1 rounded-full  ${
										index == idx
											? 'bg-zinc-50'
											: 'bg-zinc-400'
									}`}
									style={{
										width: `${100 / data.length}%`,
									}}
								/>
							);
						})}
					</View>
				</View>
				<View className='flex flex-row justify-between items-center'>
					<View className='flex flex-col'>
						<Text
							className='text-xl'
							style={{
								fontFamily: 'Poppins_600SemiBold',
							}}>
							Avocado
						</Text>
						<Text
							className='text-sm'
							style={{
								fontFamily: 'Poppins_400Regular',
							}}>
							Jacket
						</Text>
					</View>
					<View className='flex flex-col items-center justify-center'>
						<Text className='text-xs'>Ratings</Text>
						<View className='flex flex-row items-center justify-center gap-x-2'>
							<AntDesign name='star' size={20} color='#FBBF24' />
							<Text
								className='text-sm'
								style={{ fontFamily: 'Poppins_600SemiBold' }}>
								4.2 (451)
							</Text>
						</View>
					</View>
				</View>
				<View style={{ flex: 1 }}>
					<Text
						className='text-base mb-2'
						style={{
							fontFamily: 'Poppins_600SemiBold',
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
											? 'border-zinc-300 bg-zinc-200'
											: 'border-zinc-100'
									}`}>
									<Text
										style={{
											fontFamily: 'Poppins_400Regular',
										}}>
										{item}
									</Text>
								</TouchableOpacity>
							)}
						/>
					</View>
				</View>
				<View style={{ flex: 1 }}>
					<Text
						className='text-base mb-2'
						style={{
							fontFamily: 'Poppins_600SemiBold',
						}}>
						Colors
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
									className={`flex items-center justify-center rounded-lg h-12 w-20 border  ${
										color === item
											? 'border-zinc-300 bg-zinc-200'
											: 'border-zinc-100'
									}`}>
									<Text
										style={{
											fontFamily: 'Poppins_400Regular',
										}}>
										{item}
									</Text>
								</TouchableOpacity>
							)}
						/>
					</View>
				</View>
				<View className='flex flex-col rounded-xl'>
					<Text
						className='text-base mb-2'
						style={{
							fontFamily: 'Poppins_600SemiBold',
						}}>
						Description
					</Text>
					<ReadMore
						numberOfLines={5}
						renderTruncatedFooter={(handlePress) => {
							return (
								<TouchableOpacity
									onPress={handlePress}
									activeOpacity={0.5}>
									<Text
										className='text-sm text-red-500'
										style={{
											fontFamily: 'Poppins_400Regular',
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
											fontFamily: 'Poppins_400Regular',
										}}>
										Read less
									</Text>
								</TouchableOpacity>
							);
						}}>
						<Text
							className='text-sm'
							style={{
								fontFamily: 'Poppins_400Regular',
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
			</ScrollView>
			<View
				className='w-screen py-3
			 flex flex-row bottom-0 bg-zinc-100 self-center justify-around items-center'>
				<View className='flex flex-col justify-center items-center'>
					<Text style={{ fontFamily: 'Poppins_400Regular' }}>
						Price
					</Text>
					<Text
						className='text-lg'
						style={{ fontFamily: 'Poppins_600SemiBold' }}>
						₹ 1099.00
					</Text>
				</View>
				<TouchableOpacity className='flex items-center justify-center bg-emerald-500 rounded-xl px-12 py-5'>
					<Text
						className='text-white'
						style={{
							fontFamily: 'Poppins_600SemiBold',
						}}>
						Buy Now
					</Text>
				</TouchableOpacity>
			</View>
		</SafeAreaView>
	);
};

export default ProductID;
