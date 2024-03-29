// ShopsScreen.js
import React, { useContext, useRef, useState, useEffect } from "react";
import { View, Animated } from "react-native";
import { SafeArea } from "../../../components/utility/safe-area.component";

import { ShopsContext } from "../../../services/shops/shops.context";
import {ShopsCategorysContext} from "../../../services/shopsCategorys/shopsCategorys.context"
import { colors } from "../../../infrastructure/theme/colors";
import { useTranslation } from "react-i18next";
import { Text } from "../../../components/typography/text.component";

import {
  Loading,
  LoadingContainer,
  HeaderTitle,
  CityName,
  NoteView,
  NoteText,
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
  const { shopsCategories } = useContext(ShopsCategorysContext);
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
      <>
        <StatusBarPlaceHolder/>
        <CityName><HeaderTitle>{cityName}</HeaderTitle></CityName>
        <NoteView>
         <NoteText>{t("No shops available in this city")}</NoteText>
        </NoteView>
      </>
    );
  }

  if (!isLoading && shops && shops.length > 0) {
    return (
      <View style={{ flex: 1 }}>
        <StatusBarPlaceHolder />
        <AnimatedScrollView scrollY={scrollY}>
          {PrintSwiper(swiperPhoto)}
          <ShopTypeSelector shops={shops} shopsCategories={shopsCategories} navigation={navigation}  />
          {PrintShops(shops, navigation, t)}
        </AnimatedScrollView>
        {PrintHeader(scrollY, cityName)}
      </View>
    );
  }
};