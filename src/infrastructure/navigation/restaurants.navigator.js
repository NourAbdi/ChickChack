import React, {useContext,useState} from "react";

import { LocationContext } from "../../services/location/location.context";
import { IconButton } from "react-native-paper";


import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";

import { colors } from "../theme/colors";
import { RestaurantsScreen } from "../../features/restaurants/screens/restaurants.screen";
import { RestaurantDetailScreen } from "../../features/restaurants/screens/restaurant-detail.screen";

const RestaurantStack = createStackNavigator();

export const RestaurantsNavigator = ({navigation}) => {
  const { city } = useContext(LocationContext);

  return (
    
    <RestaurantStack.Navigator
      screenOptions={{
        headerShown: true,
        headerTintColor:"white" ,
        headerStyle:{backgroundColor:colors.mainblue},
      }}
    >
      <RestaurantStack.Screen 
        name={city}
        component={RestaurantsScreen}
      />
      <RestaurantStack.Screen
        name="RestaurantDetail"
        component={RestaurantDetailScreen}
        options={{
          title:"",
          headerBackVisible :"false",
          headerBackTitle:"",
          headerLeft: () => (
            <IconButton
              icon="arrow-left"
              color={colors.button.white}
              size={30}
              onPress={() => navigation.goBack()}
            />
          ),
        }}
        
      />
    </RestaurantStack.Navigator>
  );
};
