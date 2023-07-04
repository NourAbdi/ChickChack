import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { SafeArea } from "../../../components/utility/safe-area.component";
import { useTranslation } from "react-i18next";

import { OwnerShopNewOrdersScreen } from "../../ownerShop/screens/ownerShopNewOrders.screen";
import { OwnerShopPastOrdersScreen } from "../../ownerShop/screens/ownerShopPastOrders.screen";

export const OwnerShopOrdersScreen = ({ navigation }) => {
  const { t, i18n } = useTranslation();
  const Tab = createMaterialTopTabNavigator();

  const createScreenOptions = () => ({
    tabBarActiveTintColor: "#2683C0",
    tabBarInactiveTintColor: "#C6DAF7"
  });

  return (
    <SafeArea>
      <Tab.Navigator screenOptions={createScreenOptions}>
        <Tab.Screen
          name="OwnerShopNewOrdersScreen"
          component={OwnerShopNewOrdersScreen}
          options={{
            title: t("New orders"),
            direction: i18n.dir()
          }}
        />
        <Tab.Screen
          name="OwnerShopPastOrdersScreen"
          component={OwnerShopPastOrdersScreen}
          options={{
            title: t("Past orders"),
            direction: i18n.dir()
          }}
        />
      </Tab.Navigator>
    </SafeArea>
  );
};
