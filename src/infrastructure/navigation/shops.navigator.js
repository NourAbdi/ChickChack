import React, { useContext } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { colors } from "../theme/colors";


import { ShopsScreen } from "../../features/shops/screens/shops.screen";
import { ShopDetailsScreen } from "../../features/shops/screens/shopDetails.screen";
import { LocationContext } from "../../services/location/location.context";

const ShopStack = createStackNavigator();

export const ShopsNavigator = ({ navigation }) => {
  const { city, cityName } = useContext(LocationContext);
  // console.log("ShopsNavigator ...", city);

  return (

    <ShopStack.Navigator
      screenOptions={{
        headerTintColor: "white",
        headerStyle: { backgroundColor: colors.mainblue },
      }}
    >
      <ShopStack.Screen
        name={cityName}
        component={ShopsScreen}
        options={{
          headerShown: true,
          tabBarStyle: { display: "flex" },
        }}
      />
      <ShopStack.Screen
        name="ShopDetailsScreen"
        component={ShopDetailsScreen}
        options={{
          headerShown: true,
          tabBarStyle: { display: "flex" },
        }}
      />
    </ShopStack.Navigator>
  );
};
