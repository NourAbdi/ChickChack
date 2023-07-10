import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { ClientNavigator } from "./client.navigator";
import { AccountNavigator } from "./account.navigator";
import { ShopkeeperNavigator } from "./shopkeeper.navigator";
import { TransporterNavigator } from "./transporter.navigator";
import { AuthenticationContext } from "../../services/authentication/authentication.context";
import { OwnerShopContextProvider } from "../../services/ownerShop/ownerShop.context";


export const Navigation = () => {
  const { isAuthenticated, role } = useContext(AuthenticationContext);

  return (
    <NavigationContainer>
      {(isAuthenticated && role) ? (
        role === "client" ? (
          <ClientNavigator />
        ) : role === "shopkeeper" ? (
          <OwnerShopContextProvider>
            <ShopkeeperNavigator />
          </OwnerShopContextProvider>
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
