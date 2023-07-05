import React, { useContext, useState, useEffect } from "react";
import { View, ScrollView, TouchableOpacity,SafeAreaView } from "react-native";
import Icons from "@expo/vector-icons/MaterialIcons";

import { CartContext } from "../../../services/cart/cart.context";
import {
  Title,
  ViewShop,
  ShopName,
  ShopIcon,
  RightIcon,
} from "../components/cart.style";

export const CartScreen = ({navigation}) => {
  const { order,removeShopFromCart } = useContext(CartContext);
  return (
    <SafeAreaView>
      <ScrollView>
        <Title>Your Orders:</Title>
        {order.map((item, index) => (
          <TouchableOpacity key={index} onPress={() => navigation.navigate("ShopCart", { desiredShopUid: item.shop.shopUid, shopWorkingHours: item.shop.workingHours,isTemporaryClose: item.shop.isTemporaryClose})}>
            <ViewShop>
              <TouchableOpacity onPress={() => removeShopFromCart(item.shop.shopUid) } >
                <Icons name="delete" size={25} color='red' />
              </TouchableOpacity>
              <ShopIcon source={{uri:item.shop.icon}} />
              <ShopName  style={{alignSelf:'center'}}>{item.shop.name}</ShopName>
              <View style={{flex:1}} />
              <RightIcon name="angle-right" size={30} color="black" />
            </ViewShop>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};
