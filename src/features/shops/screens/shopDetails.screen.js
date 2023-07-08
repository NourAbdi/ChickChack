import React, { useContext, useEffect, useState,useRef } from "react";
import {View,ActivityIndicator,Animated} from "react-native";
import { useTranslation } from "react-i18next";
import { ShopContext } from "../../../services/shop/shop.context";

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
  const scrollY = useRef(new Animated.Value(0)).current;
  const { t } = useTranslation();

  useEffect(() => {
    if (shop) {
      console.log("ShopDetailsScreen, shop changed:", shop);
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
                {isOpenCheck(selectedShop.workingHours,selectedShop.isTemporaryClose, t)}
                <WorkingHoursComponent workingHours={selectedShop.workingHours} t={t}/>
                <RestaurantInfo>{t("Tel")}: {selectedShop.Tel}</RestaurantInfo>
                {PrintGettingOrder(selectedShop.takeOrder)}
                {wazeButton(selectedShop.location,selectedShop.address)}
              </RestaurantInfoCard>
            </ViewAbove>
          </View>
          <PrintMenu menu ={menu} navigation={navigation} shop={selectedShop}/>
          </AnimatedScrollView>
          {PrintHeader(selectedShop.icon,scrollY,navigation)}
        </View>
      )}   
    </>
  );
};
