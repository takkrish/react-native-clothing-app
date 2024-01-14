import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { router, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';

const OrderID = () => {
	const { orderID } = useLocalSearchParams();
	return (
		<SafeAreaView style={{ flex: 1 }}>
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
					className='text-xs'
					style={{
						fontFamily: 'Inter_500Medium',
					}}>
					{orderID}
				</Text>
				<TouchableOpacity className='bg-zinc-100 rounded-full w-12 h-12 flex justify-center items-center'>
					<Icon name='information-circle' size={30} />
				</TouchableOpacity>
			</View>
		</SafeAreaView>
	);
};

export default OrderID;
