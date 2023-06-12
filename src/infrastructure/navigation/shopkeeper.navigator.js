import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { SettingsScreen } from "../../features/settings/screens/settings.screen";
import { ShopDetailsScreen } from "../../features/ownerShop/screens/shop-details.screen";
import { OwnerShopOrdersScreen } from "../../features/ownerShop/screens/ownerShopOrders.screen";
import { EditShopScreen } from "../../features/ownerShop/screens/edit-shop.screen";
import { OwnerShopContextProvider } from "../../services/ownerShop/ownerShop.context";

const Tab = createBottomTabNavigator();

const TAB_ICON = {
    Shop: "storefront",
    EditShop: "database-edit",
    Orders: "order-bool-descending-variant",
    Account: "account-settings",
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
            <MaterialCommunityIcons name={iconName} size={30} color={color} />
        ),
    };
}


export const ShopkeeperNavigator = () => (
    <OwnerShopContextProvider>
        <Tab.Navigator screenOptions={createScreenOptions}>
            <Tab.Screen name="Shop" component={ShopDetailsScreen} />
            <Tab.Screen name="EditShop" component={EditShopScreen} />
            <Tab.Screen name="Orders" component={OwnerShopOrdersScreen} />
            <Tab.Screen name="Account" component={SettingsScreen} />
        </Tab.Navigator>
    </OwnerShopContextProvider>
);
