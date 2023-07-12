import React, { useContext, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { ClientNavigator } from "./client.navigator";
import { AccountScreen } from "../../features/account/screens/account.screen";
import { ShopkeeperNavigator } from "./shopkeeper.navigator";
import { TransporterNavigator } from "./transporter.navigator";
import { AuthenticationContext } from "../../services/authentication/authentication.context";
import { OwnerShopContextProvider } from "../../services/ownerShop/ownerShop.context";


export const Navigation = () => {
  const { user } = useContext(AuthenticationContext);

  useEffect(() => {
      console.log("User :", user);
  }, [user]);

  return (
    <NavigationContainer>
      {user ? (
        user.role === "client" ? (
          <ClientNavigator />
        ) : user.role === "shopkeeper" ? (
          <OwnerShopContextProvider>
            <ShopkeeperNavigator />
          </OwnerShopContextProvider>
        ) : user.role === "transporter" ? (
          <TransporterNavigator />
        ) : (
          <AccountScreen />
        )
      ) : (
        <AccountScreen />
      )}
    </NavigationContainer>
  );
};
