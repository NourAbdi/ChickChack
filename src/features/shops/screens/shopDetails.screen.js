import React, { useContext, useState, useEffect } from "react";
import { ScrollView, View, Image, Button } from "react-native";
import { Text } from "../../../components/typography/text.component";
import { SafeArea } from "../../../components/utility/safe-area.component";

import { CartContext } from "../../../services/cart/cart.context";
import {
  ShopDetailsContainer,
  ShopHeaderBackground,
  ShopName
} from "../components/shopDetails.styles";

export const ShopDetailsScreen = ({ route }) => {
  const { shop } = route.params;

  // const { addToCart } = useContext(CartContext);

  useEffect(() => {
    console.log("ShopDetailsScreen , shop changed:", shop);
  }, [shop]);

  return (
    <ScrollView style={{ flex: 1 }}>
      <ShopHeaderBackground source={{ uri: shop.headerBackground }}></ShopHeaderBackground>
      <SafeArea>
        <ShopDetailsContainer>
          <View>
            <ShopName>{shop.name}</ShopName>
            <Image source={{ uri: shop.icon }} style={{ width: 100, height: 100, borderRadius: 8, marginBottom: 16 }} />
          </View>
        </ShopDetailsContainer>
      </SafeArea>
    </ScrollView>
  );
};
