import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { TransporterEditScreen } from "../../features/transporter/screens/transporterEdit.screen";
import { TransporterOrdersScreen } from "../../features/transporter/screens/transporterOrders.screen";
import { TransporterMapScreen } from "../../features/transporter/screens/transporterMap.screen";
import { SettingNavigator } from "./setting.navigator";

import { TransporterContextProvider } from "../../services/transporter/transporter.context";

const Tab = createBottomTabNavigator();

const TAB_ICON = {
    Edits: "database-edit",
    Orders: "order-bool-descending-variant",
    Map: "map",
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

export const TransporterNavigator = () => (
    <TransporterContextProvider>
        <Tab.Navigator screenOptions={createScreenOptions}>
            <Tab.Screen name="Edits" component={TransporterEditScreen} />
            <Tab.Screen name="Orders" component={TransporterOrdersScreen} />
            <Tab.Screen name="Map" component={TransporterMapScreen} />
            <Tab.Screen name="Account" component={SettingNavigator} />
        </Tab.Navigator>
    </TransporterContextProvider>
);
