import React, { useContext, useState } from 'react';
import { View, ScrollView, ActivityIndicator, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text } from "../../../components/typography/text.component";

import { colors } from "../../../infrastructure/theme/colors";
import { TransporterContext } from '../../../services/transporter/transporter.context';

export const TransporterNewOrdersScreen = () => {
    const { newOrders, areaOrdersIsLoading, updateOrderStageAndTime } = useContext(TransporterContext);
    const [deliveryStage, setDeliveryStage] = useState('onDelivery');
    const [deliveryTime, setDeliveryTime] = useState('00:14:00');

    const handleAcceptOrder = (orderId) => {
        console.log(`Accepted order with ID: ${orderId}`);
        if (deliveryTime !== '') {
            updateOrderStageAndTime(orderId, deliveryStage, deliveryTime);
        } else {
            console.log('Please enter the delivery time');
        }
    };

    if (areaOrdersIsLoading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color={colors.primary} />
            </View>
        );
    }

    return (
        <SafeAreaView>
            <ScrollView>
                {newOrders.map((order, index) => (
                    <View key={index} style={{ backgroundColor: colors.white, padding: 16, marginBottom: 8 }}>
                        <Text>Order ID: {order.orderId}</Text>
                        <Text>Shop UID: {order.shopUid}</Text>
                        <Text>orderStage: {order.orderStage}</Text>
                        <Text>locationToDeliver: {order.locationToDeliver.latitude}, {order.locationToDeliver.longitude}</Text>
                        <Text>orderTime: {order.orderTime}</Text>
                        <Text>Shop preparationTime: {order.preparationTime}</Text>
                        <Text>Delivery Time: {order.deliveryTime}</Text>
                        <Text>payOption: {order.payOption}</Text>
                        <Text>orderTotalPrice: {order.orderTotalPrice}</Text>
                        {/* Add more Text components to display other order details */}
                        {order.orderStage === 'onProcess' && (
                            <>
                                <TextInput
                                    placeholder="Enter Delivery Time"
                                    value={deliveryTime}
                                    onChangeText={setDeliveryTime}
                                    style={{
                                        borderWidth: 1,
                                        borderColor: 'gray',
                                        padding: 10,
                                        marginBottom: 8
                                    }}
                                />
                                <TouchableOpacity
                                    onPress={() => handleAcceptOrder(order.orderId)}
                                    style={{
                                        backgroundColor: colors.primary,
                                        paddingVertical: 8,
                                        paddingHorizontal: 16,
                                        borderRadius: 5,
                                        marginTop: 8
                                    }}
                                >
                                    <Text style={{ color: colors.white, fontWeight: 'bold' }}>Accept Order</Text>
                                </TouchableOpacity>
                            </>
                        )}
                        <Text>---------------------------------</Text>
                    </View>
                ))}
            </ScrollView>
        </SafeAreaView>
    );
};
