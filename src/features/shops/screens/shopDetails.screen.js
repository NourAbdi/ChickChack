import React, { useContext, useEffect, useState } from "react";
import { ScrollView, View, Image, ActivityIndicator, TouchableOpacity } from "react-native";
import { Text } from "../../../components/typography/text.component";
import { SafeArea } from "../../../components/utility/safe-area.component";

import { ShopContext } from "../../../services/shop/shop.context";
import { CartContext } from "../../../services/cart/cart.context";

import {
  ShopDetailsContainer,
  ShopHeaderBackground,
  ShopName,
  ButtonText,
  QuantityContainer,
  QuantityButton,
  ItemQuantity,
  styles,
} from "../components/shopDetails.styles";

export const ShopDetailsScreen = ({ route }) => {
  const { shop } = route.params;
  const { selectedShop, setSelectedShop, menu, isLoading } = useContext(ShopContext);
  const { cartItems, addToCart, clearCart, checkout, totalPrice } = useContext(CartContext);


  useEffect(() => {
    if (shop) {
      console.log("ShopDetailsScreen, shop changed:", shop);
      setSelectedShop(shop);
    }
  }, [shop]);

  useEffect(() => {
    if (selectedShop) {
      console.log("ShopDetailsScreen, selectedShop changed:", selectedShop);
    }
  }, [selectedShop]);

  return (
    <>
      <SafeArea>
        {isLoading ? (
          <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <ActivityIndicator size="large" color="#000000" />
          </View>
        ) : (
          <ScrollView style={{ flex: 1 }}>
            <ShopHeaderBackground source={{ uri: selectedShop.headerBackground }}></ShopHeaderBackground>
            <ShopDetailsContainer>
              <View>
                <ShopName>{selectedShop.name}</ShopName>
                <Image
                  source={{ uri: selectedShop.icon }}
                  style={styles.shopIcon}
                />
              </View>
              {menu.map((menuItem) => (
                <View key={menuItem.itemUid}>
                  <Text>{menuItem.itemName}</Text>
                  <Text>{menuItem.itemCategory}</Text>
                  <Text>{menuItem.itemPrice}₪</Text>
                  <Image
                    source={{ uri: menuItem.itemPhoto }}
                    style={styles.menuItemImage}
                  />
                  <TouchableOpacity onPress={() => addToCart(menuItem, 1, selectedShop.shopUid)}>
                    <ButtonText>Add to Cart</ButtonText>
                  </TouchableOpacity>
                </View>
              ))}
            </ShopDetailsContainer>
          </ScrollView>
        )}
      </SafeArea>
    </>
  );
};
