import React, { useContext, useEffect } from "react";
import { View, Text, Image, ScrollView } from "react-native";
import { SafeArea } from "../../../components/utility/safe-area.component";
import { CartContext } from "../../../services/cart/cart.context";

import{
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

  useEffect(() => {
    if (pastOrders) {
      console.log(pastOrders);
    }
  }, [pastOrders]);
  const orderTime = new Date(pastOrders[0].orderTime);
  console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",orderTime);
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
                  <Flex/>
                  <Info>
                    {new Date(order.orderTime).toLocaleDateString()},{" "}  
                    {new Date(order.orderTime).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit",})} 
                  </Info>
                </TitleRow>
                <Line/>
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
                <Line/>
                <Line/>
                <Row>
                  <Info>Order Total Price: {order.orderTotalPrice} ₪</Info>
                  <Flex/>
                  <Info>Pay Option: {order.payOption}</Info>
                </Row>
                <Row>
                  <Info>Preparation Time: {order.preparationTime}</Info>
                  <Flex/>
                  {order.orderOption === 'Delivery' ? (<Info>Delivery Time: {order.deliveryTime}</Info>):(<Info>Delivery Time: ---</Info>)}                  
                </Row>
                <Row>
                  <Info>Order Option: {order.orderOption}</Info>
                  <Flex/>
                  <Info>Order Stage: {order.orderStage}</Info>
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

