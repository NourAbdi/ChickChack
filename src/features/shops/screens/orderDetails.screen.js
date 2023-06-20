import React, { useRef, useState, useContext } from "react";
import { View, Animated, Text, Image,TouchableOpacity } from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import Icons from "@expo/vector-icons/MaterialIcons";
import { StatusBar } from "expo-status-bar";
const SIZES = ["XS", "S", "M", "L", "XL", "XXL", "3XL"];


import { CartContext } from "../../../services/cart/cart.context";
import { colors } from "../../../infrastructure/theme/colors";

import {
  OrderImage,
  InfoCard,
  InfoCardShadow,
  HeaderButton,
  HeaderView,
  OrderName,
  Center,
  Description,
  Row,
  CounterButton
} from '../components/OrderDetailsScreen.style'

import{
  PrintCounter,
  StatusBarPlaceHolder,
} from '../components/OrderDetailsScreen.component'
import { add } from "lodash";

export const OrderDetailsScreen = ({ navigation,route}) => {
  const { shop, item } = route.params;
  const { addToCart } = useContext(CartContext);
  const [count, setCount] = useState(1);
  const insets = useSafeAreaInsets();


  return (
    <View style={{ flex: 1}}>
      <StatusBarPlaceHolder/>
        <OrderImage source={{uri:item.itemPhoto}}/> 
        <SafeAreaView style={{position: 'absolute'}}>
          <HeaderButton  onPress={() => navigation.goBack() } color={colors.mainblue} >
            <Icons name="arrow-back" size={24} color={colors.mainblue} />
          </HeaderButton>
        </SafeAreaView>
        
        <InfoCardShadow>
          <InfoCard>
            <OrderName>{item.itemName}</OrderName>
            <Description>{item.itemDescription}</Description>
              {PrintCounter(count,setCount,addToCart,shop,item)}
          </InfoCard>
        </InfoCardShadow>
    </View>
    
  );
};