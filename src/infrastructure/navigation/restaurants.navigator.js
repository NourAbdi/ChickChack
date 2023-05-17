import React, {useContext,useEffect} from "react";



import { LocationContext } from "../../services/location/location.context";
import { IconButton } from "react-native-paper";


import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";

import { colors } from "../theme/colors";
import { RestaurantsScreen } from "../../features/restaurants/screens/restaurants.screen";
import { RestaurantDetailScreen } from "../../features/restaurants/screens/restaurant-detail.screen";
import{MealDetailScreen} from "../../features/restaurants/screens/meal-detail.screen"

const RestaurantStack = createStackNavigator();

export const RestaurantsNavigator = ({navigation,route}) => {
  const { city } = useContext(LocationContext);
  console.log("RestaurantsNavigator");
  console.log(route.RestaurantDetailScreen);

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
        options={{
        tabBarStyle: { display: 'flex' }
        }}
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
      <RestaurantStack.Screen
        name="MealDetailScreen"
        component={MealDetailScreen}
        options={{ tabBarStyle: { display: "none" } }} 
      />
      {/* navigation.setOptions(
      tabBarStyle= { display= 'none' }
    ); */}
    </RestaurantStack.Navigator>
  );
};
