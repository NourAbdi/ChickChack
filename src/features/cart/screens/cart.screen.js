import React, { useContext } from "react";
import { View, ScrollView, TouchableOpacity,SafeAreaView } from "react-native";
import Icons from "@expo/vector-icons/MaterialIcons";
import { useTranslation } from "react-i18next";

import { colors } from "../../../infrastructure/theme/colors";
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
  const { t } = useTranslation();

  return (
    <SafeAreaView>
      <ScrollView>
        <Title>{t("Your Orders")}:</Title>
        {order.map((item, index) => (
          <TouchableOpacity key={index} onPress={() => navigation.navigate("ShopCart", { desiredShopUid: item.shop.shopUid, shopWorkingHours: item.shop.workingHours,isTemporaryClose: item.shop.isTemporaryClose})}>
            <ViewShop>
              <ShopIcon source={{uri:item.shop.icon}} />
              <ShopName  style={{alignSelf:'center'}}>{item.shop.name}</ShopName>
              <RightIcon name="angle-right" size={30} color="black" />
              <View style={{flex:1}} />
              <TouchableOpacity onPress={() => removeShopFromCart(item.shop.shopUid) } >
              <Icons name="delete" size={25} color={colors.button.red} />
              </TouchableOpacity>
            </ViewShop>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};
