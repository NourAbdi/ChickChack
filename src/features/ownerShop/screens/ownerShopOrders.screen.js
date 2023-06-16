import React from 'react';
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { SafeArea } from "../../../components/utility/safe-area.component";

import { OwnerShopNewOrdersScreen } from "../../ownerShop/screens/ownerShopNewOrders.screen";
import { OwnerShopPastOrdersScreen } from "../../ownerShop/screens/ownerShopPastOrders.screen";

export const OwnerShopOrdersScreen = ({navigation}) => {
  const Tab = createMaterialTopTabNavigator();
  return (
    <SafeArea>
    <Tab.Navigator>
      <Tab.Screen
        name="OwnerShopNewOrdersScreen"
        component={OwnerShopNewOrdersScreen}
        options={{ title: "New orders" }}
      />
      <Tab.Screen
        name="OwnerShopPastOrdersScreen"
        component={OwnerShopPastOrdersScreen}
        options={{ title: "Past Orders" }}
      />
    </Tab.Navigator>
    </SafeArea>
  );
};