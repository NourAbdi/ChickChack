import React, { useContext, useState,useRef } from "react";
import { View,Animated,Button,Alert } from "react-native";

import { OwnerShopContext } from "../../../services/ownerShop/ownerShop.context";
import { colors } from "../../../infrastructure/theme/colors";
import{
    HeaderImage,
    AnimatedScrollView,
    LoadingContainer,
    Loading
 } from '../components/shop-details.screen.style'

import{
  PrintHeader
} from "../components/shop-details.screen.components"

import {
  PrintWorkingHours
} from "../components/edit-shop.screen.component"

export const EditShopScreen = () => {
  const { shop, updateShop, isLoading } = useContext(OwnerShopContext);
  const [isTemporaryClose, setTemporaryClose] = useState(shop.isTemporaryClose);
  const scrollY = useRef(new Animated.Value(0)).current;
  const workingHours = shop.workingHours;
  
  const handleSave = () => {
    console.log("Updating workingHours, isTemporaryClose :", workingHours, isTemporaryClose);
    updateShop(workingHours, isTemporaryClose);
    showAlert(); // Show the alert after saving
  };

  const showAlert = () => {
    Alert.alert(
      "Changes Saved",
      "Changes have been saved successfully!",
      [
        { text: "OK", onPress: () => console.log("OK Pressed") }
      ]
    );
  };

  if (isLoading) {
    return(
      <LoadingContainer>
        <Loading size={50} color={colors.mainblue} animating={true} />
      </LoadingContainer>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <AnimatedScrollView scrollY={scrollY}>
        <HeaderImage source={{ uri: shop.headerBackground }} />
        {PrintWorkingHours(workingHours,isTemporaryClose,setTemporaryClose)}
        
      </AnimatedScrollView>
      {PrintHeader(shop.icon,scrollY)}

      <View style={{ borderWidth: 1, borderColor: colors.mainblue, borderRadius: 5 }}>
      <Button title="Save" onPress={handleSave} />
      </View>
    </View>
  );
};