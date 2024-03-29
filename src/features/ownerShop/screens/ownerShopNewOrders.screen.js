import React, { useContext, useState } from 'react';
import { View, Button, FlatList } from 'react-native';
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
import { useTranslation } from "react-i18next";

export const OwnerShopNewOrdersScreen = () => {
  const { t } = useTranslation();
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
      <FlatList
        data={sortedOrders}
        keyExtractor={(item,index) => index}
        renderItem={({ item, index }) => (
          <View key={index}>
            <Title>{t("order")} {index + 1}:</Title>
            <Shadow key={index}>
              <OrderCard isExpanded={isItemExpanded(item.orderId)}>
                <Heading>{t("Order information")} :</Heading>
                {printOrderinfo(item, t)}
                <Heading>{t("Confirming order")} :</Heading>
                <PrintConfirmingOrder orderId={item.orderId} preparationTime={item.preparationTime} updateOrder={updateOrder} t={t}/>
                <Row>
                  <Heading>{t("Cart items")} :</Heading>
                </Row>
                <ButtonCard color={colors.button.white}>
                  <Button
                    title={isItemExpanded(item.orderId) ? t("Collapse") : t("Expand")}
                    onPress={() => toggleItemExpand(item.orderId)}
                    color="black"
                  />
                </ButtonCard>
                {isItemExpanded(item.orderId) && printCartIteam(item.cartItems, t)}
              </OrderCard>
            </Shadow>
          </View>
        )}
      />
    </SafeAreaView>
  );
};
