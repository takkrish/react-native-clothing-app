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
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import { router } from 'expo-router';
import { addItem } from '../../../redux/reducers/cartSlice';

const { width } = Dimensions.get('window');

const App = () => {
	const dispatch = useDispatch();
	const { user } = useSelector((state) => state.USER);
	const [selectedCategory, setSelectedCategory] = useState('All');
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
						data={[
							{
								id: 1,
								type: 'All',
							},
							{
								id: 2,
								type: 'Men',
							},
							{
								id: 3,
								type: 'Women',
							},
							{
								id: 4,
								type: 'Kids',
							},
							{
								id: 5,
								type: 'Sale',
							},
						]}
						keyExtractor={(item) => item.id}
						renderItem={({ item }) => (
							<TouchableOpacity
								key={item.id}
								activeOpacity={0.5}
								onPress={() => {
									setSelectedCategory(item.type);
								}}
								className={`flex flex-row items-center bg-zinc-100 rounded-full py-2 px-3 ${
									selectedCategory === item.type &&
									'bg-zinc-300 border border-zinc-400'
								}`}>
								<Text
									className='text-xs font-normal mx-3'
									style={{
										fontFamily: 'Inter_400Regular',
									}}>
									{item.type}
								</Text>
							</TouchableOpacity>
						)}
					/>
				</View>
				<FlatList
					scrollEnabled={false}
					data={Array(20)}
					numColumns={2}
					contentContainerStyle={{
						gap: 10,
					}}
					columnWrapperStyle={{
						gap: 10,
					}}
					renderItem={({ item, index }) => (
						<View
							className='flex flex-col justify-center items-center bg-zinc-100 rounded-xl overflow-hidden'
							key={index}>
							<TouchableOpacity
								onPress={() => router.push('product/' + item)}>
								<Image
									className=''
									source={require('../../../assets/roland-hechanova-nutRT2AD580-unsplash.jpg')}
									style={{
										width: width / 2 - 25,
										height: 180,
									}}
								/>
								<View className='p-2'>
									<Text
										className='text-sm'
										style={{
											fontFamily: 'Inter_600SemiBold',
										}}>
										Avacado
									</Text>
									<Text
										className='text-xs'
										style={{
											fontFamily: 'Inter_400Regular',
										}}>
										Jacket
									</Text>
									<View className='flex flex-row justify-between items-center'>
										<Text
											className='text-sm'
											style={{
												fontFamily: 'Inter_500Medium',
											}}>
											₹ 1,099.00
										</Text>
										<TouchableOpacity
											onPress={() => {
												dispatch(
													addItem({
														id: index,
														name: `Avacado_Jacket_${index}`,
														imgSrc: '../../../assets/katsiaryna-endruszkiewicz-BteCp6aq4GI-unsplash.jpg',
													})
												);
											}}>
											<Icon
												name='add-circle-sharp'
												size={35}
											/>
										</TouchableOpacity>
									</View>
								</View>
							</TouchableOpacity>
						</View>
					)}
				/>
				<View className='h-10'></View>
			</ScrollView>
		</SafeAreaView>
	);
};

export default App;
