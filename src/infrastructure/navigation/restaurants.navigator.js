import React, {useContext} from "react";

import { getFocusedRouteNameFromRoute,useFocusEffect } from '@react-navigation/native';
import { IconButton } from "react-native-paper";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";

import { LocationContext } from "../../services/location/location.context";
import { colors } from "../theme/colors";
import { RestaurantsScreen } from "../../features/restaurants/screens/restaurants.screen";
import { RestaurantDetailScreen } from "../../features/restaurants/screens/restaurant-detail.screen";
import{MealDetailScreen} from "../../features/restaurants/screens/meal-detail.screen"

const RestaurantStack = createStackNavigator();

export const RestaurantsNavigator = ({navigation,route}) => {
  const { city } = useContext(LocationContext);

  useFocusEffect(
    React.useCallback(() => {
      if (getFocusedRouteNameFromRoute(route) === 'MealDetailScreen') {
        navigation.setOptions({ tabBarStyle: { display: 'none' } });
      } else {
        navigation.setOptions({ tabBarStyle: { display: 'flex' } });
      }
    }, [navigation, route])
  );

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
          headerShown: false,
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
    </RestaurantStack.Navigator>
  );
};
