import React from 'react';
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { SafeArea } from "../../../components/utility/safe-area.component";

import { TransporterNewOrdersScreen } from "./transporterNewOrders.screen";
import { TransporterCurrentOrdersScreen } from "./transporterCurrentOrders.screen";
import { TransporterPastOrdersScreen } from "./transporterPastOrders.screen";

export const TransporterOrdersScreen = () => {
  const Tab = createMaterialTopTabNavigator();
  return (
    <SafeArea>
      <Tab.Navigator
        onAnimatedValueUpdate={() => {}}
      >
        <Tab.Screen
          name="TransporterNewOrdersScreen"
          component={TransporterNewOrdersScreen}
          options={{ title: "New orders" }}
        />
        <Tab.Screen
          name="TransporterCurrentOrdersScreen"
          component={TransporterCurrentOrdersScreen}
          options={{ title: "Current Orders" }}
        />
        <Tab.Screen
          name="TransporterPastOrdersScreen"
          component={TransporterPastOrdersScreen}
          options={{ title: "Past Orders" }}
        />
      </Tab.Navigator>
    </SafeArea>
  );
};
