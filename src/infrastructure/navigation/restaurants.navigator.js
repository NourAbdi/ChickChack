import React, {useContext} from "react";

import { LocationContext } from "../../services/location/location.context";


import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";

import { Text } from "react-native";
import { colors } from "../theme/colors";
import { RestaurantsScreen } from "../../features/restaurants/screens/restaurants.screen";
import { RestaurantDetailScreen } from "../../features/restaurants/screens/restaurant-detail.screen";
import { FullWindowOverlay } from "react-native-screens";

const RestaurantStack = createStackNavigator();

export const RestaurantsNavigator = () => {
  const { city } = useContext(LocationContext);
  return (
    <RestaurantStack.Navigator
      screenOptions={{
        headerShown: true,
        headerTintColor:"white" ,
        headerStyle:{backgroundColor:colors.mainblue},
        // ...TransitionPresets.ModalPresentationIOS
      }}
    >
      <RestaurantStack.Screen 
        name={city}
        component={RestaurantsScreen}
      />
      <RestaurantStack.Screen
        options={{
          title:"",
          headerBackVisible :"true",
          headerBackTitle:"",
        }}
        name="RestaurantDetail"
        component={RestaurantDetailScreen}
      />
    </RestaurantStack.Navigator>
  );
};
