import {
	View,
	Text,
	TouchableOpacity,
	FlatList,
	ScrollView,
	TextInput,
	Image,
	Dimensions,
	Animated,
	Modal,
} from 'react-native';
import React, { createRef, useRef, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { router, useLocalSearchParams } from 'expo-router';
import ReadMore from 'react-native-read-more-text';
import { useDispatch, useSelector } from 'react-redux';
import {
	addFavourite,
	removeFavourite,
} from '../../../redux/reducers/favouriteSlice';
import { addItem } from '../../../redux/reducers/cartSlice';
import { productsData } from '../../../constants/productsData';
import {
	PinchGestureHandler,
	PanGestureHandler,
	Gesture,
	GestureDetector,
	State,
	GestureHandlerRootView,
} from 'react-native-gesture-handler';
// import Animated, {
// 	useSharedValue,
// 	useAnimatedStyle,
// } from 'react-native-reanimated';

const { width } = Dimensions.get('window');

const bankOffers = [
	'10% Instant Discount on HDFC Bank Credit Cards and Credit/Debit EMI Transactions.',
	'10% Instant Discount on SBI Bank Credit Cards and Credit/Debit EMI Transactions.',
	'Get 10% Cashback of up to Rs.100 on your first ever Paytm UPI transaction on purchase of ₹3000 and above.',
	'10% Instant Discount on Axis Bank Credit Cards and Credit/Debit EMI Transactions.',
	'Get 10% Cashback of up to Rs.100 on your first ever Paytm UPI transaction on purchase of ₹5000 and above.',
	'10% Instant Discount on ICICI Bank Credit Cards and Credit/Debit EMI Transactions.',
];

const ProductID = () => {
	const { productID } = useLocalSearchParams();
	const product = productsData.find(
		(item) => item.id === parseInt(productID)
	);
	const dispatch = useDispatch();
	const { favourites } = useSelector((state) => state.FAVOURITE);
	const { items } = useSelector((state) => state.CART);
	const [favourite, setFavourite] = useState(favourites.includes(product));
	const [size, setSize] = useState('M');
	const [color, setColor] = useState('Blue');
	const [visible, setVisible] = useState(false);

	const scale = useRef(new Animated.Value(1)).current;
	const translateX = useRef(new Animated.Value(0)).current;
	const translateY = useRef(new Animated.Value(0)).current;

	const pinchRef = createRef();
	const panRef = createRef();

	const onPinchGestureEvent = Animated.event(
		[{ nativeEvent: { scale: scale } }],
		{ useNativeDriver: true }
	);

	const onPanGestureEvent = Animated.event(
		[
			{
				nativeEvent: {
					translationX: translateX,
					translationY: translateY,
				},
			},
		],
		{ useNativeDriver: true }
	);

	const handlePinchStateChange = ({ nativeEvent }) => {
		if (nativeEvent.oldState === State.ACTIVE) {
			Animated.spring(scale, {
				toValue: 1,
				bounciness: 10,
				useNativeDriver: true,
			}).start();
		}
	};

	const handlePanStateChange = ({ nativeEvent }) => {
		if (nativeEvent.oldState === State.ACTIVE) {
			Animated.spring(translateX, {
				toValue: 0,
				bounciness: 5,
				useNativeDriver: true,
			}).start();
			Animated.spring(translateY, {
				toValue: 0,
				bounciness: 5,
				useNativeDriver: true,
			}).start();
		}
	};

	const handleFavourite = () => {
		setFavourite((prev) => {
			!prev
				? dispatch(addFavourite(product))
				: dispatch(
						removeFavourite({
							id: parseInt(productID),
						})
				  );
			return !prev;
		});
	};

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
					onPress={handleFavourite}
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
				<ProductImageSlider
					imgSource={product.imgSource}
					setVisible={setVisible}
				/>
				<Modal
					visible={visible}
					transparent={true}
					onRequestClose={() => setVisible(false)}
					animationType='fade'>
					<View className='p-4 w-full h-full pointer-events-auto bg-black/80'>
						<TouchableOpacity
							activeOpacity={0.8}
							className='bg-zinc-50 rounded-full h-10 w-10 items-center justify-center flex self-end'
							onPress={() => setVisible(false)}>
							<Icon name='close' size={24} />
						</TouchableOpacity>
						<GestureHandlerRootView>
							<PanGestureHandler
								onGestureEvent={onPanGestureEvent}
								onHandlerStateChange={handlePanStateChange}
								ref={panRef}
								simultaneousHandlers={[pinchRef]}>
								<Animated.View>
									<PinchGestureHandler
										ref={pinchRef}
										onGestureEvent={onPinchGestureEvent}
										simultaneousHandlers={[panRef]}
										onHandlerStateChange={
											handlePinchStateChange
										}>
										<Animated.Image
											source={product.imgSource}
											style={{
												width: '100%',
												height: '100%',
												transform: [
													{ scale },
													{ translateX },
													{ translateY },
												],
											}}
											resizeMode='contain'
										/>
									</PinchGestureHandler>
								</Animated.View>
							</PanGestureHandler>
						</GestureHandlerRootView>
					</View>
				</Modal>
				<View className='flex flex-row justify-between items-center'>
					<View className='flex flex-col'>
						<Text
							className='text-xl'
							style={{
								fontFamily: 'Inter_600SemiBold',
							}}>
							{product.name}
						</Text>
						<Text
							className='text-sm'
							style={{
								fontFamily: 'Inter_400Regular',
							}}>
							{product.type}
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
							{product.description}
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
						{'₹' + parseFloat(product.price).toFixed(2)}
					</Text>
				</View>
				{items.find((item) => item.id === parseInt(productID)) ? (
					<TouchableOpacity
						onPress={() => router.push('/cart')}
						className='flex items-center justify-center bg-emerald-500 rounded-xl px-10 py-5'>
						<Text
							className='text-white'
							style={{
								fontFamily: 'Inter_600SemiBold',
							}}>
							Go to Cart
						</Text>
					</TouchableOpacity>
				) : (
					<TouchableOpacity
						onPress={() => {
							dispatch(addItem(product));
						}}
						className='flex items-center justify-center bg-emerald-500 rounded-xl px-10 py-5'>
						<Text
							className='text-white'
							style={{
								fontFamily: 'Inter_600SemiBold',
							}}>
							Add to Cart
						</Text>
					</TouchableOpacity>
				)}
			</View>
		</SafeAreaView>
	);
};

const ProductImageSlider = ({ imgSource, setVisible }) => {
	const [left, setLeft] = useState(0);
	const data = Array(5).fill(imgSource);
	return (
		<View className='rounded-xl overflow-hidden flex items-center justify-center relative'>
			<FlatList
				data={data}
				horizontal
				pagingEnabled
				keyExtractor={(item, index) => index}
				showsHorizontalScrollIndicator={false}
				onScroll={(e) => {
					const paddingX = 40;
					const widthOfScrollElement = 40;

					const _width = (width - paddingX) * 0.8;
					const _left =
						(e.nativeEvent.contentOffset.x -
							widthOfScrollElement *
								(e.nativeEvent.contentOffset.x / _width)) /
						data.length;
					setLeft(_left);
				}}
				renderItem={({ item, index }) => {
					return (
						<TouchableOpacity onPress={() => setVisible(true)}>
							<Image
								key={index}
								source={item}
								resizeMethod='resize'
								resizeMode='contain'
								style={{
									height: 350,
									width: width - 40,
								}}
							/>
						</TouchableOpacity>
					);
				}}
			/>
			<View className='w-4/5 absolute bottom-2 rounded-full invert bg-white/30 flex flex-row items-center'>
				<View
					className='bg-zinc-100 backdrop-invert relative rounded-full h-1 w-10'
					style={{
						left: left,
					}}
				/>
			</View>
		</View>
	);
};

export default ProductID;
