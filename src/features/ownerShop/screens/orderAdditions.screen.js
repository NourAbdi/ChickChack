import React from "react";
import { View,Dimensions } from "react-native";

import { colors } from "../../../infrastructure/theme/colors";
import {
  InfoCard,
  InfoCardShadow,
  OrderName,
  Description,
  Price,
} from '../components/orderAdditions.screen.style'

import{
  printHeader,
  PrintIteamAdditions,
} from '../components/orderAdditions.screen.components'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTranslation } from "react-i18next";

export const OrderAdditionsScreen = ({ navigation,route,}) => {
  const { t } = useTranslation();
  const { item } = route.params;
  const MyComponent = () => {
    const insets = useSafeAreaInsets();
    return Dimensions.get('window').height - insets.top - insets.bottom;
  };

  return (
    <View style={{ flex: 1}}>
        {printHeader(item.itemPhoto,colors.text.inverse,navigation)}
        <InfoCardShadow>
          <InfoCard safeAreaViewHeight={ MyComponent()}>
            <OrderName>{item.itemName}</OrderName>
            <Price>{t("Price for unit")} :{item.itemPrice}₪</Price>
            <Description>{item.itemDescription}</Description>
            {PrintIteamAdditions(item.itemAdditions,item.itemUid)}
          </InfoCard>
        </InfoCardShadow>
    </View>
  );
};