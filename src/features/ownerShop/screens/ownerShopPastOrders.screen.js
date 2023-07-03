import React, { useContext, useEffect, useState } from 'react';
import { View,Button,ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { OwnerShopContext } from '../../../services/ownerShop/ownerShop.context';
import { colors } from "../../../infrastructure/theme/colors";
import {
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
} from "../components/ownerShopOrders.components";
import { useTranslation } from "react-i18next";

export const OwnerShopPastOrdersScreen = () => {
  const { t } = useTranslation();
  const { pastOrders, isLoading } = useContext(OwnerShopContext);
  const sortedOrders = pastOrders.sort((a, b) => new Date(a.orderTime) - new Date(b.orderTime));
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
    // If past orders are not yet fetched, you can show a loading indicator
    return(
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
            <Shadow> 
              <OrderCard isExpanded = {isItemExpanded(order.orderId)}>
                <Heading>{t("Order information")} :</Heading>
                  {printOrderinfo(order, t)}
                <Row>
                  <Heading>{t("Cart items")} :</Heading>
                </Row>
                <ButtonCard color={colors.button.white}>
                  <Button
                    title={isItemExpanded(order.orderId) ? t("Collapse") : t("Expand")}
                    onPress={() => toggleItemExpand(order.orderId)}
                    color="black"
                  />
                </ButtonCard>
                {isItemExpanded(order.orderId) && printCartIteam(order.cartItems, t)}
              </OrderCard>
            </Shadow>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};
