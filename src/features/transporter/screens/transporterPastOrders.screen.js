import React, { useContext } from 'react';
import { View, ScrollView, Text, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { colors } from "../../../infrastructure/theme/colors";
import { TransporterContext } from '../../../services/transporter/transporter.context';

export const TransporterPastOrdersScreen = () => {
    const { pastOrders, areaOrdersIsLoading } = useContext(TransporterContext);

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
                {pastOrders.map((order, index) => (
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
                        <Text>---------------------------------</Text>
                    </View>
                ))}
            </ScrollView>
        </SafeAreaView>
    );
};
