import { View, Text } from 'react-native';
import React from 'react';
import { useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

const OrderID = () => {
	const { orderID } = useLocalSearchParams();
	return (
		<SafeAreaView style={{ flex: 1 }}>
			<Text>{orderID}</Text>
		</SafeAreaView>
	);
};

export default OrderID;
