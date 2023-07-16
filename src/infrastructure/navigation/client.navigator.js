import React, { useEffect, useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Fontisto } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";

import { ShopsNavigator } from "./shops.navigator";
import { MapScreen } from "../../features/map/screens/map.screen";
import { CartNavigator } from "./cart.navigator";
import { CartContextProvider } from "../../services/cart/cart.context";
import { ShopsContextProvider } from "../../services/shops/shops.context";
import { ShopContextProvider } from "../../services/shop/shop.context";
import { LocationContextProvider } from "../../services/location/location.context";
import { SettingNavigator } from "./setting.navigator";
import { ApplicationContextProvider } from "../../services/application/application.context"

const Tab = createBottomTabNavigator();

const TAB_ICON = {
  Shops: "shopping-store",
  Map: "map",
  Cart: "shopping-basket",
  Settings: "player-settings",
};

const createScreenOptions = ({ route }) => {
  const { t, i18n } = useTranslation();
  const iconName = TAB_ICON[route.name];
  const iconTitle = t(route.name);

  return {
    tabBarActiveTintColor: "#2683C0",
    tabBarInactiveTintColor: "#C6DAF7",
    tabBarStyle: {
      display: "flex",
      direction: i18n.dir(),
    },
    headerShown: false,
    tabBarIcon: ({ size, color }) => (
      <Fontisto name={iconName} size={size} color={color} />
    ),
    tabBarLabel: iconTitle,
  };
};

export const ClientNavigator = () => (
  <LocationContextProvider>
    <CartContextProvider>
      <ShopsContextProvider>
        <ShopContextProvider>
          <ApplicationContextProvider>

            <Tab.Navigator screenOptions={createScreenOptions}>
              <Tab.Screen name="Map" component={MapScreen} />
              <Tab.Screen name="Shops" component={ShopsNavigator} />
              <Tab.Screen name="Cart" component={CartNavigator} />
              <Tab.Screen name="Settings" component={SettingNavigator} />
            </Tab.Navigator>

          </ApplicationContextProvider>
        </ShopContextProvider>
      </ShopsContextProvider>
    </CartContextProvider>
  </LocationContextProvider>
);
