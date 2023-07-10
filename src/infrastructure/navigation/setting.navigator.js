import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { SafeArea } from "../../components/utility/safe-area.component";
import { useTranslation } from "react-i18next";

import {UserProfileScreen} from "../../features/settings/screens/userProfile.screen";
import {ApplicationScreen} from "../../features/settings/screens/application.screen";
import { colors } from "../theme/colors";


const Tab = createMaterialTopTabNavigator();


export const SettingNavigator = () => {
  const { t } = useTranslation();
  return (
    <SafeArea>
      <Tab.Navigator
        screenOptions={{
          tabBarIndicatorStyle: { backgroundColor: colors.mainblue }
        }}>
        <Tab.Screen name="UserProfile" component={UserProfileScreen} options={{ title: t("My Account") ,tabBarButton: () => null, tabBarVisible: false }} />
        <Tab.Screen name="Application" component={ApplicationScreen} options={{ title: t("Application") }} />
      </Tab.Navigator>
    </SafeArea>
  );
};
