import React, {useContext} from "react";

import { LocationContext } from "../../services/location/location.context";


import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";

import { colors } from "../theme/colors";
import { RestaurantsScreen } from "../../features/restaurants/screens/restaurants.screen";
import { RestaurantDetailScreen } from "../../features/restaurants/screens/restaurant-detail.screen";

const RestaurantStack = createStackNavigator();

export const RestaurantsNavigator = () => {
  const { keyword: cityName} = useContext(LocationContext);
  return (
    <RestaurantStack.Navigator
      screenOptions={{
        headerShown: true,
        headerTintColor:"white" ,
        headerStyle:{backgroundColor:colors.mainblue},
        ...TransitionPresets.ModalPresentationIOS,
      }}
    >
      <RestaurantStack.Screen
        name={cityName}
        component={RestaurantsScreen}
      />
      <RestaurantStack.Screen
        name="RestaurantDetail"
        component={RestaurantDetailScreen}
      />
    </RestaurantStack.Navigator>
  );
};
