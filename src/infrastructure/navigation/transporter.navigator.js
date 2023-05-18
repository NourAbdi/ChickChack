import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Fontisto } from "@expo/vector-icons";

import { SettingsScreen } from "../../features/settings/screens/settings.screen";

const Tab = createBottomTabNavigator();

const TAB_ICON = {
    myShop: "shopping-store",
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
        headerShown: false,
        tabBarIcon: ({ size, color }) => (
            <Fontisto name={iconName} size={size} color={color} />
        ),
    };
}


export const TransporterNavigator = () => (
    <Tab.Navigator screenOptions={createScreenOptions}>
        <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
);
