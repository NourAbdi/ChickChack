import React, { useContext, useState } from "react";
import { View, Text, TextInput, Button, ImageBackground, StyleSheet, Switch } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { SafeArea } from "../../../components/utility/safe-area.component";
import { OwnerShopContext } from "../../../services/ownerShop/ownerShop.context";

export const EditShopScreen = () => {
  const { shop } = useContext(OwnerShopContext);
  
  return (
    <SafeArea>
      <ScrollView>
        <View>
          <ImageBackground
            source={{ uri: shop.headerBackground }}
          />
          
        </View>
      </ScrollView>
    </SafeArea>
  );
};
