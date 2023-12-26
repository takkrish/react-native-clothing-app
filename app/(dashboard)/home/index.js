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
import React from 'react';
import { useSelector } from 'react-redux';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import { router } from 'expo-router';
import { signOut } from 'firebase/auth';
import { AUTH } from '../../../firebase/config';

const App = () => {
	const { user } = useSelector((state) => state.USER);
	const SIZE = Dimensions.get('window').width / 2 - 30;
	return (
		<SafeAreaView className='p-5'>
			<View className='flex flex-row justify-between items-center'>
				<Text className='text-xl font-bold py-3'>Avacado</Text>
				<View className='flex flex-row gap-x-5'>
					<TouchableOpacity>
						<Icon
							name='notifications-outline'
							size={24}
							color='black'
						/>
					</TouchableOpacity>
					<TouchableOpacity
						onPress={async () => {
							await signOut(AUTH);
							router.replace('(auth)');
						}}>
						<Icon name='person-outline' size={24} color='black' />
					</TouchableOpacity>
				</View>
			</View>
			<ScrollView
				showsVerticalScrollIndicator={false}
				style={{ width: '100%' }}>
				<View className='flex flex-col gap-y-5 mb-36'>
					<Text className='text-2xl font-normal'>
						Save up to -50% using promocode BLACKFRIDAY
					</Text>
					<TextInput
						placeholder='Search'
						className='bg-gray-200 rounded-lg py-5 px-3'
					/>
					<FlatList
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
						renderItem={({ item }) => (
							<TouchableOpacity className='flex flex-row items-center'>
								<Text className='text-sm font-normal mx-3'>
									{item.type}
								</Text>
							</TouchableOpacity>
						)}
						keyExtractor={(item) => item.id}
					/>

					<FlatList
						scrollEnabled={false}
						data={[1, 2, 3, 4, 5, 6, 7, 8, 9]}
						numColumns={2}
						keyExtractor={(item) => item}
						contentContainerStyle={{
							display: 'flex',
							alignItems: 'center',
							gap: 20,
						}}
						columnWrapperStyle={{
							width: '100%',
							gap: 20,
						}}
						renderItem={({ item }) => (
							<View className='flex flex-col justify-center items-center'>
								<TouchableOpacity>
									<Image
										source={require('../../../assets/roland-hechanova-nutRT2AD580-unsplash.jpg')}
										style={{
											width: SIZE,
											height: SIZE,
											borderRadius: 10,
										}}
									/>
									<Text className='text-sm font-normal mt-2'>
										Avacado
									</Text>
									<Text className='text-sm font-bold'>
										$ 20.00
									</Text>
								</TouchableOpacity>
							</View>
						)}
					/>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
};

export default App;
