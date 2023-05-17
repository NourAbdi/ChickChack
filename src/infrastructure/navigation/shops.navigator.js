import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { ShopDetailsScreen } from "../../features/shops/screens/shop-details.screen";
import { EditShopScreen } from "../../features/shops/screens/edit-shop.screen";

const Stack = createStackNavigator();

export const ShopsNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="ShopDetails"
      component={ShopDetailsScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="EditShop"
      component={EditShopScreen}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
);
