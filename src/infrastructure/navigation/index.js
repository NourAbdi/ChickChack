import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";

import { AppNavigator } from "./app.navigator";
import { LocationNavigator } from "./location.navigator";
import { AccountNavigator } from "./account.navigator";

import { AuthenticationContext } from "../../services/authentication/authentication.context";
import { locationContext } from "../../services/currentLocation/currentLocation.context";

export const Navigation = () => {
  const { isLocated } = useContext(locationContext);
  const { isAuthenticated } = useContext(AuthenticationContext);
  console.log(isAuthenticated);
  console.log(isLocated);
  return (
    <NavigationContainer>
      {
        isAuthenticated ?
          (
            isLocated ?
            <AppNavigator />
            :
            <LocationNavigator />
          )
          :
          <AccountNavigator />
      }
    </NavigationContainer>
  );
};
