import React from "react";

import { createStackNavigator } from "@react-navigation/stack";
const CheckoutStack = createStackNavigator();

import { colors } from "../theme/colors";
import { CheckoutScreen } from "../../features/checkout/screens/checkout.screen";
import { CheckoutErrorScreen } from "../../features/checkout/screens/checkout-error.screen";
import { CheckoutSuccessScreen } from "../../features/checkout/screens/checkout-success.screen";


export const CheckoutNavigator = () => (
  <CheckoutStack.Navigator screenOptions={{headerShown: true,headerTintColor:"white" ,headerStyle:{backgroundColor:colors.mainblue}}}>
    <CheckoutStack.Screen name="Checkout" component={CheckoutScreen} />
    <CheckoutStack.Screen
      name="CheckoutSuccess"
      component={CheckoutSuccessScreen}
    />
    <CheckoutStack.Screen
      name="CheckoutError"
      component={CheckoutErrorScreen}
    />
  </CheckoutStack.Navigator>
);
