import React, { useContext, useEffect, useState,useRef } from "react";
import {View,ActivityIndicator,Animated} from "react-native";

import { ShopContext } from "../../../services/shop/shop.context";
import { CartContext } from "../../../services/cart/cart.context";

import{
  HeaderImage,
  RestaurantInfoCard,
  RestaurantName,
  RestaurantInfo,
  ViewAbove,
  AnimatedScrollView,
} from "../components/shopDetails.styles";

import{
  wazeButton,
  PrintGettingOrder,
  WorkingHoursComponent,
  isOpenCheck,
  PrintMenu,
  PrintHeader,
} from "../components/shopDetails.component";

export const ShopDetailsScreen = ({ route,navigation }) => {
  const { shop } = route.params;
  const { selectedShop, setSelectedShop, menu, isLoading } = useContext(ShopContext);
  const { cartItems, addToCart, clearCart, checkout, totalPrice } = useContext(CartContext);
  const scrollY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (shop) {
      // console.log("ShopDetailsScreen, shop changed:", shop);
      setSelectedShop(shop);
    }
  }, [shop]);

  useEffect(() => {
    if (selectedShop) {
      // console.log("ShopDetailsScreen, selectedShop changed:", selectedShop);
    }
  }, [selectedShop]);

  return (
    <>
      {isLoading ? (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <ActivityIndicator size="large" color="#000000" />
        </View>
      ) : (
        <View style={{ flex: 1  }}>
          <AnimatedScrollView scrollY={scrollY}> 
          <View>
            <HeaderImage  source={{uri:shop.headerBackground}}/>
            <ViewAbove>
              <RestaurantInfoCard>
                <RestaurantName>{selectedShop.name}</RestaurantName>
                {isOpenCheck(selectedShop.workingHours,selectedShop.IsTemporaryClose)}
                <RestaurantInfo>Working Hours: {WorkingHoursComponent(selectedShop.workingHours)}</RestaurantInfo>
                {PrintGettingOrder(selectedShop.takeOrder)}
                {wazeButton(selectedShop.location,selectedShop.address)}
              </RestaurantInfoCard>
            </ViewAbove>
          </View>
          {PrintMenu(menu,navigation,selectedShop.shopUid,addToCart)}
          </AnimatedScrollView>
          {PrintHeader(selectedShop.icon,scrollY,navigation)}
        </View>
      )}   
    </>
  );
};
