import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { SafeArea } from "../../components/utility/safe-area.component";

import { CartScreen } from "../../features/cart/screens/cart.screen";
import { ShopCart } from "../../features/cart/screens/shopCart.screen";
import { PastCartsScreen } from "../../features/cart/screens/pastCarts.screen";
import { CartLocationScreen } from "../../features/cart/screens/cartLocation.screen";
import { getFocusedRouteNameFromRoute,useFocusEffect } from '@react-navigation/native';
import { useTranslation } from "react-i18next";

const Tab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();

const CartLocationStack = () => {
  
  return(
    <Stack.Navigator >
      <Stack.Screen name="CartScreen" component={CartScreen} options={{headerShown: false}}/>
      <Stack.Screen name="CartLocationScreen" component={CartLocationScreen} options={{headerShown: false}} />
      <Stack.Screen name="ShopCart" component={ShopCart} options={{ headerShown: false}} />
    </Stack.Navigator>
  );
};

export const CartNavigator = () => {
  const { t } = useTranslation();
  return (
    <SafeArea>
      <Tab.Navigator>
        <Tab.Screen name="Carts" component={CartLocationStack} options={{ title: t("Carts") ,tabBarButton: () => null, tabBarVisible: false }} />
        <Tab.Screen name="PastCartsScreen" component={PastCartsScreen} options={{ title: t("Past orders") }} />
      </Tab.Navigator>
    </SafeArea>
  );
};
