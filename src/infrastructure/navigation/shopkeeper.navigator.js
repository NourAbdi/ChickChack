import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import { createStackNavigator } from "@react-navigation/stack";
import { getFocusedRouteNameFromRoute,useFocusEffect } from '@react-navigation/native';

import { SettingsScreen } from "../../features/settings/screens/settings.screen";
import { ShopDetailsScreen } from "../../features/ownerShop/screens/shop-details.screen";
import { OrderAdditionsScreen } from "../../features/ownerShop/screens/orderAdditions.screen";
import { OwnerShopOrdersScreen } from "../../features/ownerShop/screens/ownerShopOrders.screen";
import { EditShopScreen } from "../../features/ownerShop/screens/edit-shop.screen";
import { OwnerShopContextProvider } from "../../services/ownerShop/ownerShop.context";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const TAB_ICON = {
    Shop: "storefront",
    EditShop: "database-edit",
    Orders: "order-bool-descending-variant",
    Account: "account-settings",
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
      <MaterialCommunityIcons name={iconName} size={size} color={color} />
    ),
    tabBarLabel: iconTitle,
  };
};

const ShopStack = ({navigation,route}) => {
  useFocusEffect(
    React.useCallback(() => {
      if (getFocusedRouteNameFromRoute(route) === 'OrderAdditionsScreen') {
        navigation.setOptions({ tabBarStyle: { display: 'none' } });
      } else {
        navigation.setOptions({ tabBarStyle: { display: 'flex' } });
      }
    }, [navigation, route])
  );
  return(
    <Stack.Navigator >
      <Stack.Screen name="ShopDetails" component={ShopDetailsScreen} options={{headerShown: false}}/>
      <Stack.Screen name="OrderAdditionsScreen" component={OrderAdditionsScreen} options={{headerShown: false}} />
    </Stack.Navigator>
  );
};

export const ShopkeeperNavigator = () => (
    <OwnerShopContextProvider>
        <Tab.Navigator screenOptions={createScreenOptions}>
            <Tab.Screen name="Shop" component={ShopStack} />
            <Tab.Screen name="EditShop" component={EditShopScreen} />
            <Tab.Screen name="Orders" component={OwnerShopOrdersScreen} />
            <Tab.Screen name="Account" component={SettingsScreen} />
        </Tab.Navigator>
    </OwnerShopContextProvider>
);
