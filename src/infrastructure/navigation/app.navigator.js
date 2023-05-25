import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Fontisto } from "@expo/vector-icons";

import { ShopsNavigator } from "./shops.navigator";
import { SettingsScreen } from "../../features/settings/screens/settings.screen";
import { MapScreen } from "../../features/map/screens/map.screen";
import { CartNavigator } from "./cart.navigator";
import { CartContextProvider } from "../../services/cart/cart.context";
import { ShopsContextProvider } from "../../services/shops/shops.context";
import { LocationContextProvider } from "../../services/location/location.context";

const Tab = createBottomTabNavigator();

const TAB_ICON = {
  Shops: "shopping-store",
  Map: "map",
  Checkout: "shopping-basket",
  Settings: "player-settings",
};

const createScreenOptions = ({ route }) => {
  const iconName = TAB_ICON[route.name];
  return {
    tabBarActiveTintColor: "#2683C0",
    tabBarInactiveTintColor: "#C6DAF7",
    tabBarStyle: {
      display: "flex",
    },
    headerShown: false,
    tabBarIcon: ({ size, color }) => (
      <Fontisto name={iconName} size={size} color={color} />
    ),
  };
};

export const AppNavigator = () => (
  <LocationContextProvider>
    <CartContextProvider>
      <ShopsContextProvider>
        <Tab.Navigator screenOptions={createScreenOptions}>
          <Tab.Screen name="Shops" component={ShopsNavigator} />
          <Tab.Screen name="Checkout" component={CartNavigator} />
          <Tab.Screen name="Map" component={MapScreen} />
          <Tab.Screen name="Settings" component={SettingsScreen} />
        </Tab.Navigator>
      </ShopsContextProvider>
    </CartContextProvider>
  </LocationContextProvider>
);
