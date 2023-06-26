import React, { useState, useContext } from "react";
import { View,Dimensions } from "react-native";

import { colors } from "../../../infrastructure/theme/colors";
import {
  InfoCard,
  InfoCardShadow,
  OrderName,
  Description,
  Price,
  TotalPrice,
  BlueBackGround,
} from '../components/orderAdditions.screen.style'

import{
  PrintCounter,
  printHeader,
  PrintIteamAdditions,
} from '../components/orderAdditions.screen.components'
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const OrderAdditionsScreen = ({ navigation,route,}) => {
  const { shop, item, updateAddItemAvailable } = route.params;
  const [count, setCount] = useState(1);
  const [checkedItems, setCheckedItems] = useState(
    Object.fromEntries(
      Object.entries(item.itemAdditions).flatMap(([additionType, additionsOfType]) =>
        additionsOfType.map((addition) => [addition.additionName, { isChecked: false, price: addition.additionPrice }])
      )
    )
  );
  const filteredItems = Object.fromEntries(
    Object.entries(checkedItems)
      .filter(([_, item]) => item.isChecked)
      .map(([key, { price }]) => [key, price])
  );
  const MyComponent = () => {
    const insets = useSafeAreaInsets();
    return Dimensions.get('window').height - insets.top - insets.bottom;
  };
  const checkedItemsTotalPrice = Object.entries(checkedItems)
  .filter(([_, item]) => item.isChecked)
  .reduce((total, [_, item]) => total + item.price, 0);

  return (
    <View style={{ flex: 1}}>
        {printHeader(item.itemPhoto,colors.text.inverse,navigation)}
        <InfoCardShadow>
          <InfoCard safeAreaViewHeight={ MyComponent()}>
            <OrderName>{item.itemName}</OrderName>
            <Price>Price for unite:{item.itemPrice}₪</Price>
            <Description>{item.itemDescription}</Description>
            {PrintIteamAdditions(item.itemAdditions,checkedItems,setCheckedItems,updateAddItemAvailable,item.itemUid)}
            
          </InfoCard>
        </InfoCardShadow>
    </View>
    
  );
};