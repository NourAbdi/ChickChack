import React from "react";
import { View, Text } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {Fontisto } from "@expo/vector-icons";


import { RestaurantsNavigator } from "./restaurants.navigator";
import { SettingsNavigator } from "./settings.navigator";
import { MapScreen } from "../../features/map/screens/map.screen";
import { CheckoutNavigator } from "./checkout.navigator";
import { CartContextProvider } from "../../services/cart/cart.context";
import { RestaurantsContextProvider } from "../../services/restaurants/restaurants.context";
import { LocationContextProvider } from "../../services/location/location.context";
import { colors } from "../../infrastructure/theme/colors";

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
      "tabBarActiveTintColor": "#2683C0",
      "tabBarInactiveTintColor": "#C6DAF7",
      "tabBarStyle": [
        {
          "display": "flex"
        },
        null
      ],
      headerShown:false,
      tabBarIcon: ({ size, color }) => (
          <Fontisto name={iconName} size={size} color={color} />        
      ),
    };
  }



export const ShopkeeperNavigator = () => (
    <Tab.Navigator screenOptions={createScreenOptions}>
        <Tab.Screen name="Shopkeeper" component={SettingsNavigator} />
    </Tab.Navigator>
);
