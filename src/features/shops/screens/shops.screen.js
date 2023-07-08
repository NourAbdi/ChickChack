// ShopsScreen.js
import React, { useContext, useRef, useState, useEffect } from "react";
import { View, Animated, Text } from "react-native";
import { SafeArea } from "../../../components/utility/safe-area.component";

import { ShopsContext } from "../../../services/shops/shops.context";
import { colors } from "../../../infrastructure/theme/colors";
import { useTranslation } from "react-i18next";

import {
  Loading,
  LoadingContainer,
} from "../components/ShopsScreen.styles";

import {
  PrintHeader,
  StatusBarPlaceHolder,
  PrintSwiper,
  ShopTypeSelector,
  PrintShops,
} from "../components/ShopsScreen.compoent";

import {
  AnimatedScrollView,
} from "../components/shopDetails.styles";

export const ShopsScreen = ({ navigation }) => {
  const { t } = useTranslation();
  const { isLoading, isShopsLoading, shops, swiperPhoto, cityName } = useContext(ShopsContext);
  const scrollY = useRef(new Animated.Value(0)).current;

  if (isLoading) {
    return (
      <LoadingContainer>
        <Loading size={50} animating={true} color={colors.mainblue} />
      </LoadingContainer>
    );
  }

  if ((!isLoading && !shops) || (!isLoading && shops && shops.length == 0)) {
    return (
      <SafeArea>
        <Text>{t("No shops available in this city")}</Text>
      </SafeArea>
    );
  }

  if (!isLoading && shops && shops.length > 0) {
    return (
      <View style={{ flex: 1 }}>
        <StatusBarPlaceHolder />
        <AnimatedScrollView scrollY={scrollY}>
          {PrintSwiper(swiperPhoto)}
          <ShopTypeSelector shops={shops} navigation={navigation} />
          {PrintShops(shops, navigation, t)}
        </AnimatedScrollView>
        {PrintHeader(scrollY, cityName)}
      </View>
    );
  }
};