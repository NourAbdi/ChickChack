import React, { useContext, useEffect, useState } from 'react';
import { View,Button,ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { OwnerShopContext } from '../../../services/ownerShop/ownerShop.context';

import {
  Title,
  OrderCard,
  Heading,
  Shadow,
  Row,
  ButtonCard,
} from "../components/ownerShopNewOrders.screen.style";

import {
  printOrderinfo,
  printCartIteam,
  PrintConfirmingOrder,
} from "../components/ownerShopNewOrders.screen.components";


export const OwnerShopNewOrdersScreen = () => {
  const { newOrders } = useContext(OwnerShopContext);

  useEffect(() => {
    if (newOrders) {
      console.log("newOrders", JSON.stringify(newOrders));
    }
  }, [newOrders]);
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
  
  return (
    <SafeAreaView>
      <ScrollView>
        {sortedOrders.map((order, index) => (
          <View  key={order.orderId}>
            <Title>Order {index+1}:</Title>
            <Shadow>
              <OrderCard isExpanded = {isItemExpanded(order.orderId)}>
                <Heading>Order information:</Heading>
                  {printOrderinfo(order)}
                <Heading>Confirming order:</Heading>
                  <PrintConfirmingOrder preparationTime={order.preparationTime}/> 
                <Row>
                  <Heading>Cart items:</Heading>
                </Row>
                <ButtonCard>
                  <Button
                    title={isItemExpanded(order.orderId) ? "Collapse" : "Expand"}
                    onPress={() => toggleItemExpand(order.orderId)}
                    color="black"
                  />
                </ButtonCard>
                {isItemExpanded(order.orderId) && printCartIteam(order.cartItems)}
              </OrderCard>
            </Shadow>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};
