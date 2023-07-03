import React from 'react';
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { SafeArea } from "../../../components/utility/safe-area.component";

import { OwnerShopNewOrdersScreen } from "../../ownerShop/screens/ownerShopNewOrders.screen";
import { OwnerShopPastOrdersScreen } from "../../ownerShop/screens/ownerShopPastOrders.screen";
import { useTranslation } from "react-i18next";

export const OwnerShopOrdersScreen = ({navigation}) => {
  const { t } = useTranslation();
  const Tab = createMaterialTopTabNavigator();
  return (
    <SafeArea>
    <Tab.Navigator>
      <Tab.Screen
        name="OwnerShopNewOrdersScreen"
        component={OwnerShopNewOrdersScreen}
        options={{ title: t("New orders") }}
      />
      <Tab.Screen
        name="OwnerShopPastOrdersScreen"
        component={OwnerShopPastOrdersScreen}
        options={{ title: t("Past orders") }}
      />
    </Tab.Navigator>
    </SafeArea>
  );
};