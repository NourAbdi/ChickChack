import React, { useContext, useState } from 'react';
import { View, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text } from "../../../components/typography/text.component";

import { colors } from "../../../infrastructure/theme/colors";
import { TransporterContext } from '../../../services/transporter/transporter.context';

export const TransporterCurrentOrdersScreen = () => {
    const { currentOrders, areaOrdersIsLoading, updateOrderStageAndTime } = useContext(TransporterContext);
    const [deliveryStage, setDeliveryStage] = useState('done');
    const [deliveryTime, setDeliveryTime] = useState('00:14:00');

    const handleDeliveredOrder = (orderId) => {
        console.log(`Delivered order with ID: ${orderId}`);
        updateOrderStageAndTime(orderId, deliveryStage, deliveryTime);
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
                {currentOrders.map((order, index) => (
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
                        <TouchableOpacity
                            onPress={() => handleDeliveredOrder(order.orderId)}
                            style={{
                                backgroundColor: colors.primary,
                                paddingVertical: 8,
                                paddingHorizontal: 16,
                                borderRadius: 5,
                                marginTop: 8
                            }}
                        >
                            <Text style={{ color: colors.white, fontWeight: 'bold' }}>Delivered</Text>
                        </TouchableOpacity>
                        <Text>---------------------------------</Text>
                    </View>
                ))}
            </ScrollView>
        </SafeAreaView>
    );
};
