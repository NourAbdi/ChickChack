import React, { useContext, useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { IconButton } from "react-native-paper";

import { colors } from "../theme/colors";
import { ShopsScreen } from "../../features/shops/screens/shops.screen";
import { ShopDetailsScreen } from "../../features/shops/screens/shopDetails.screen";
import { ShopsByTypeScreen } from "../../features/shops/screens/shopsByType.screen";
import { LocationContext } from "../../services/location/location.context";

const ShopStack = createStackNavigator();

export const ShopsNavigator = ({ navigation }) => {
  const { selectedCity } = useContext(LocationContext);

  return (
    selectedCity &&
    <ShopStack.Navigator
      screenOptions={{
        headerTintColor: "white",
        headerStyle: { backgroundColor: colors.mainblue },
      }}
    >
      <ShopStack.Screen
        name="cityShops"
        component={ShopsScreen}
        options={{
          headerShown: false,
          tabBarStyle: { display: "flex" },
        }}
      />
      <ShopStack.Screen
        name="ShopDetailsScreen"
        component={ShopDetailsScreen}
        options={{
          headerShown: false,
          tabBarStyle: { display: "flex" },
        }}
      />
      <ShopStack.Screen
        name="ShopsByTypeScreen"
        component={ShopsByTypeScreen}
        options={{
          headerShown: true,
          headerBackVisible: "false",
          headerLeft: () => (
            <IconButton
              icon="arrow-left"
              color={colors.button.white}
              size={30}
              onPress={() => navigation.goBack()}
            />
          ),
          headerTitleStyle: { color: 'white', fontSize: 20, fontWeight: "bold" },
        }}
      />
    </ShopStack.Navigator>
  );
};
