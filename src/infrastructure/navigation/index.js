import React, { useContext, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { ClientNavigator } from "./client.navigator";
import { AccountNavigator } from "./account.navigator";
import { ShopkeeperNavigator } from "./shopkeeper.navigator";
import { TransporterNavigator } from "./transporter.navigator";
import { AuthenticationContext } from "../../services/authentication/authentication.context";

export const Navigation = () => {
  const { isAuthenticated, user, role } = useContext(AuthenticationContext);

  // useEffect(() => {
  //   console.log("user ...", user);
  //   if (user) {
  //   }
  // }, [user]);

  // useEffect(() => {
  //   console.log("role ...", role);
  // }, [role]);

  // useEffect(() => {
  //   console.log("isAuthenticated ...", isAuthenticated);
  // }, [isAuthenticated]);

  return (
    <NavigationContainer>
      {(isAuthenticated && role) ? (
        role === "client" ? (
          <ClientNavigator />
        ) : role === "shopkeeper" ? (
            <ShopkeeperNavigator />
        ) : role === "transporter" ? (
          <TransporterNavigator />
        ) : (
          <AccountNavigator />
        )
      ) : (
        <AccountNavigator />
      )}
    </NavigationContainer>
  );
};
