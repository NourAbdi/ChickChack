import React from "react";

import { createStackNavigator, TransitionPresets } from '@react-navigation/stack'
import HomeScreen from "../screens/HomeScreen";
import RootClientTabs from "./ClientTab";


const App = createStackNavigator();

export default function AppStack() {
    return (
        <App.Navigator>
            <App.Screen
                name="RootClientTabs"
                component={RootClientTabs}
                options={{
                    headerShown: false,
                    ...TransitionPresets.RevealFromBottomAndroid
                }}
            />

        </App.Navigator>
    )
}



