import React, { useContext, useEffect, useState } from 'react';
import { View, Button, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { OwnerShopContext } from '../../../services/ownerShop/ownerShop.context';
import { colors } from "../../../infrastructure/theme/colors";
import {
  Title,
  OrderCard,
  Heading,
  Shadow,
  Row,
  ButtonCard,
  LoadingContainer,
  Loading,
} from "../components/ownerShopOrders.style";

import {
  printOrderinfo,
  printCartIteam,
  PrintConfirmingOrder,
} from "../components/ownerShopOrders.components";

export const OwnerShopNewOrdersScreen = () => {
  const { newOrders, updateOrder, isLoading } = useContext(OwnerShopContext);
  const sortedOrders = newOrders.sort((a, b) => new Date(a.orderTime) - new Date(b.orderTime));
  const [expandedItems, setExpandedItems] = useState([]);

  const toggleItemExpand = (orderId) => {
    setExpandedItems((prevExpandedItems) => {
      if (prevExpandedItems.includes(orderId)) {
        return prevExpandedItems.filter((item) => item !== orderId);
      } else {
        return [...prevExpandedItems, orderId];
      }
    });
  };
  const isItemExpanded = (orderId) => {
    return expandedItems.includes(orderId);
  };
  if (isLoading) {
    // If new orders are not yet fetched, you can show a loading indicator
    return (
      <LoadingContainer>
        <Loading size={50} color={colors.mainblue} animating={true} />
      </LoadingContainer>
    );
  }

  return (
    <SafeAreaView>
      <ScrollView>
        {sortedOrders.map((order, index) => (
          <View key={order.orderId}>
            <Title>Order {index + 1}:</Title>
            <Shadow>
              <OrderCard isExpanded={isItemExpanded(order.orderId)}>
                <Heading>Order information:</Heading>
                {printOrderinfo(order)}
                <Heading>Confirming order:</Heading>
                <PrintConfirmingOrder orderId={order.orderId} preparationTime={order.preparationTime} updateOrder={updateOrder} />
                <Row>
                  <Heading>Cart items:</Heading>
                </Row>
                <ButtonCard color={colors.button.white}>
                  <Button
                    title={isItemExpanded(order.orderId) ? "Collapse" : "Expand"}
                    onPress={() => toggleItemExpand(order.orderId)}
                    color="black"
                  />
                </ButtonCard>
                {/* {printCartIteam(order.cartItems)} */}
                {isItemExpanded(order.orderId) && printCartIteam(order.cartItems)}
              </OrderCard>
            </Shadow>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};
