import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { LocationScreen } from "../../features/location/screens/location.screen";

const Stack = createStackNavigator();

export const LocationNavigator = () => (
  <Stack.Navigator screenOptions={{headerShown: false,}}>
    <Stack.Screen name="Location" component={LocationScreen} />
  </Stack.Navigator>
);