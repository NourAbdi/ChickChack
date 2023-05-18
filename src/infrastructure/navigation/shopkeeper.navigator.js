import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Fontisto } from "@expo/vector-icons";

import { SettingsScreen } from "../../features/settings/screens/settings.screen";
import { ShopDetailsScreen } from "../../features/shops/screens/shop-details.screen";
import { EditShopScreen } from "../../features/shops/screens/edit-shop.screen";
import { ShopContextProvider } from "../../services/shops/shop.context";

const Tab = createBottomTabNavigator();

const TAB_ICON = {
    Shop: "shopping-store",
    Map: "map",
    EditShop: "player-settings",
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
        headerShown: false,
        tabBarIcon: ({ size, color }) => (
            <Fontisto name={iconName} size={size} color={color} />
        ),
    };
}


export const ShopkeeperNavigator = () => (
    <ShopContextProvider>
        <Tab.Navigator screenOptions={createScreenOptions}>
            <Tab.Screen name="Shop" component={ShopDetailsScreen} />
            <Tab.Screen name="EditShop" component={EditShopScreen} />
            {/* <Tab.Screen name="Orders" component={OrdersScreen} /> */}
            <Tab.Screen name="Settings" component={SettingsScreen} />
        </Tab.Navigator>
    </ShopContextProvider>
);
