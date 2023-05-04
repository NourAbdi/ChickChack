import React from "react";
import { SettingsScreen } from "../../features/settings/screens/settings.screen";
 
import { colors } from "../theme/colors";
import {
  createStackNavigator,
  CardStyleInterpolators,
} from "@react-navigation/stack";

const SettingsStack = createStackNavigator();

export const SettingsNavigator = ({ route, navigation }) => {
  return (
    <SettingsStack.Navigator
      screenOptions={{
        headerShown: true,
        headerTintColor:"white" ,
        headerStyle:{backgroundColor:colors.mainblue},
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}
    >
      <SettingsStack.Screen
        // options={{
        //   header: () => null,
        // }}
        name="Settings"
        component={SettingsScreen}
      />
    </SettingsStack.Navigator>
  );
};
