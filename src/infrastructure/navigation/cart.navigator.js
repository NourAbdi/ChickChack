import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { SafeArea } from "../../components/utility/safe-area.component";

import { CartScreen } from "../../features/cart/screens/cart.screen";
import { PastCartsScreen } from "../../features/cart/screens/pastCarts.screen";

const Tab = createMaterialTopTabNavigator();

export const CartNavigator = () => {
  return (
    <SafeArea>
    <Tab.Navigator>
      <Tab.Screen
        name="CartScreen"
        component={CartScreen}
        options={{ title: "New order" }}
      />
      <Tab.Screen
        name="PastCartsScreen"
        component={PastCartsScreen}
        options={{ title: "Past orders" }}
      />
    </Tab.Navigator>
    </SafeArea>
  );
};
