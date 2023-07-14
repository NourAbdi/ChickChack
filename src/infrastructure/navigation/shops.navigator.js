import React, { useContext, useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { IconButton } from "react-native-paper";
import { getFocusedRouteNameFromRoute,useFocusEffect } from '@react-navigation/native';
import { useTranslation } from "react-i18next";

import { colors } from "../theme/colors";
import { ShopsScreen } from "../../features/shops/screens/shops.screen";
import { ShopDetailsScreen } from "../../features/shops/screens/shopDetails.screen";
import { ShopsByTypeScreen } from "../../features/shops/screens/shopsByType.screen";
import { OrderDetailsScreen } from "../../features/shops/screens/orderDetails.screen";

import { LocationContext } from "../../services/location/location.context";

const ShopStack = createStackNavigator();

export const ShopsNavigator = ({ navigation,route }) => {
  const { selectedCity } = useContext(LocationContext);
  const { i18n } = useTranslation();
  useFocusEffect(
    React.useCallback(() => {
      if (getFocusedRouteNameFromRoute(route) === 'OrderDetailsScreen') {
        navigation.setOptions({ tabBarStyle: { display: 'none' } });
      } else {
        navigation.setOptions({ tabBarStyle: { display: 'flex',direction: i18n.dir() } });
      }
    }, [navigation, route])
  );

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
          headerShown: false,
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
      <ShopStack.Screen
        name="OrderDetailsScreen"
        component={OrderDetailsScreen}
        options={{
          headerShown: false,
          headerBackVisible: false,
          // headerLeft: () => (
          //   <IconButton
          //     icon="arrow-left"
          //     color={colors.button.white}
          //     size={30}
          //     // onPress={() => navigation.goBack()}
          //   />
          // ),
          headerTitleStyle: { color: 'white', fontSize: 20, fontWeight: "bold" },
        }}
      />
    </ShopStack.Navigator>
  );
};
