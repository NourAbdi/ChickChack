import React, { useRef, useContext } from 'react';
import { View, Animated } from 'react-native';

import { OwnerShopContext } from "../../../services/ownerShop/ownerShop.context";
import { colors } from "../../../infrastructure/theme/colors";
import {
  HeaderImage,
  RestaurantInfoCard,
  RestaurantName,
  RestaurantInfo,
  ViewAbove,
  AnimatedScrollView,
  LoadingContainer,
  Loading,
} from '../components/shop-details.screen.style'

import {
  wazeButton,
  PrintGettingOrder,
  WorkingHoursComponent,
  IsOpenCheck,
  PrintHeader,
  PrintMenu,
  StatusBarPlaceHolder,
} from "../components/shop-details.screen.components"
import { useTranslation } from "react-i18next";

export const ShopDetailsScreen = ({ navigation }) => {
  const { t } = useTranslation();
  const { shop, menu, isLoading, updateItemAvailable } = useContext(OwnerShopContext);
  const scrollY = useRef(new Animated.Value(0)).current;

  if (isLoading) {
    // If shop details are not yet fetched, you can show a loading indicator
    return (
      <LoadingContainer>
        <Loading size={50} color={colors.mainblue} animating={true} />
      </LoadingContainer>
    );
  }
  return (
    <View style={{ flex: 1 }}>
      <StatusBarPlaceHolder/>
      <AnimatedScrollView scrollY={scrollY}>
        <View>
          <HeaderImage source={{ uri: shop.headerBackground }} />
          <ViewAbove>
            <RestaurantInfoCard>
              <RestaurantName>{shop.name}</RestaurantName>
              <IsOpenCheck workingHours={shop.workingHours} isTemporaryClose={shop.isTemporaryClose} t={t} />
              <RestaurantInfo>{t("workingHours")} : {WorkingHoursComponent(shop.workingHours)}</RestaurantInfo>
              <RestaurantInfo>{t("Tel")} : {shop.Tel}</RestaurantInfo>
              {PrintGettingOrder(shop.takeOrder)}
              {wazeButton(shop.location, shop.address)}
            </RestaurantInfoCard>
          </ViewAbove>
        </View>
        <PrintMenu menu={menu} navigation={navigation} shop={shop} updateItemAvailable={updateItemAvailable} t={t} />
        {/* {PrintMenu(menu, navigation, shop, updateItemAvailable,t)} */}
      </AnimatedScrollView>
      {PrintHeader(shop.icon, scrollY)}
    </View>
  );
};