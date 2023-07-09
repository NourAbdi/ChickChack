import React, { useContext, useEffect } from "react";
import { View, Text, Image, ScrollView } from "react-native";
import { SafeArea } from "../../../components/utility/safe-area.component";
import { CartContext } from "../../../services/cart/cart.context";

import {
  ViewOrder,
  Row,
  TitleRow,
  ShopIcon,
  ShopName,
  Flex,
  Line,
  Caption,
  Info,
  Center,
  CartItem,
  CartItemImage,
} from "../components/pastCarts.screen.style"

export const PastCartsScreen = () => {
  const { pastOrders } = useContext(CartContext);

  // useEffect(() => {
  //   if (pastOrders) {
  //     console.log(pastOrders);
  //   }
  // }, [pastOrders]);

  const convertTimeStringToDate = (timeString, orderTime) => {
    const [hours, minutes] = timeString.split(":");
    const month = orderTime.getMonth();
    const year = orderTime.getFullYear();
    const date = orderTime.getDate();
    return new Date(year, month, date, parseInt(hours), parseInt(minutes));
  };

  const addTimes = (time1, time2) => {
    const resultTime = new Date();
    resultTime.setHours(time1.getHours() + time2.getHours());
    resultTime.setMinutes(time1.getMinutes() + time2.getMinutes());
    return resultTime;
  };

  const getDeliveryTime = (orderTime, stringPreparationTime, stringDeliveryTime) => {
    const preparationTime = getPreparationTime(orderTime, stringPreparationTime);
    const deliveryTime = convertTimeStringToDate(stringDeliveryTime, orderTime);
    return addTimes(preparationTime, deliveryTime);
  };

  const getPreparationTime = (orderTime, stringPreparationTime) => {
    const preparationTime = convertTimeStringToDate(stringPreparationTime, orderTime);
    return addTimes(orderTime, preparationTime);
  };

  // Sort past orders by orderTime in descending order
  const sortedPastOrders = pastOrders
    ? [...pastOrders].sort((a, b) => new Date(b.orderTime) - new Date(a.orderTime))
    : [];

  return (
    <SafeArea>
      <ScrollView>
        <View>
          {sortedPastOrders.length > 0 ? (
            sortedPastOrders.map((order, index) => (
              <ViewOrder key={index}>
                <TitleRow>
                  <Info>Order ID: {order.orderId}</Info>
                  <Flex />
                  <Info>
                    {new Date(order.orderTime).toLocaleDateString()},{" "}
                    {new Date(order.orderTime).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", })}
                  </Info>
                </TitleRow>
                <Line />
                <Center>
                  <Info>Shop UID: {order.shopUid}</Info>
                </Center>
                {order.cartItems.map((item, index) => (
                  <CartItem key={index}>
                    {item.item.itemPhoto && (
                      <CartItemImage source={{ uri: item.item.itemPhoto }} />
                    )}
                    <View>
                      <Info>{item.item.itemName}</Info>
                      {item.additions.length === 0 ? null : (
                        <>
                          {Object.entries(item.additions).map(([additionName, additionPrice], index) => (
                            <Caption key={index}>
                              {additionName}{""}
                            </Caption>
                          ))}
                        </>
                      )}
                      <Caption>Price for unit: {item.item.itemPrice}₪</Caption>
                      <Info>Quantity: {item.quantity}</Info>
                    </View>
                  </CartItem>
                ))}
                <Line />
                <Line />
                <Row>
                  <Info>Order Total Price: {order.orderTotalPrice} ₪</Info>
                  <Flex />
                  <Info>Pay Option: {order.payOption}</Info>
                </Row>
                <Row>
                  <Info>Order Option: {order.orderOption}</Info>
                  <Flex />
                  <Info>Order Stage: {order.orderStage}</Info>
                </Row>
                <Row>
                  <Info>Estimate Preparation Time: {getPreparationTime(new Date(order.orderTime), order.preparationTime).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", })}</Info>
                  <Flex />
                  {order.orderOption === 'Delivery' ?
                    (<Info>Estimate Delivery Time: {getDeliveryTime(new Date(order.orderTime), order.preparationTime, order.deliveryTime).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", })}</Info>) :
                    (<Info>Estimate Delivery Time: ---</Info>)}
                </Row>
              </ViewOrder>
            ))
          ) : (
            <Text>No past orders found.</Text>
          )}
        </View>
      </ScrollView>
    </SafeArea>
  );
};

