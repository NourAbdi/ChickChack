import React, { useContext, useState, useRef } from "react";
import { View, Animated, Button, Alert } from "react-native";
import Modal from "react-native-modal";

import { OwnerShopContext } from "../../../services/ownerShop/ownerShop.context";
import { colors } from "../../../infrastructure/theme/colors";
import {
  HeaderImage,
  AnimatedScrollView,
  LoadingContainer,
  Loading,
} from "../components/shop-details.screen.style";

import {
  PrintHeader
} from "../components/shop-details.screen.components";

import{
  SaveButton
} from "../components/edit-shop.screen.style"

import {
  PrintWorkingHours,
  isWorkingHoursValid,
} from "../components/edit-shop.screen.component";

export const EditShopScreen = () => {
  const { shop, updateShop, isLoading } = useContext(OwnerShopContext);
  const [isTemporaryClose, setTemporaryClose] = useState(shop.isTemporaryClose);
  const [isSaving, setIsSaving] = useState(false);
  const scrollY = useRef(new Animated.Value(0)).current;
  const workingHours = shop.workingHours;

  const handleSave = async () => {
    setIsSaving(true); 

    if(isWorkingHoursValid(workingHours).isValid){
      console.log("Updating workingHours, isTemporaryClose:", workingHours, isTemporaryClose);
      const isUpdateSuccessful = await updateShop(workingHours, isTemporaryClose);
      setIsSaving(false);
      if (isUpdateSuccessful) {
        showAlert("Changes Saved", "Changes have been saved successfully!");
      } else {
        showAlert("Error", "Failed to save changes. Please try again later.");
      }
    }else{
      setIsSaving(false);
      showAlert("Error",`${"Start hour shold be smaller than End hour"}\nInvalid day: ${isWorkingHoursValid(workingHours).invalidDay}`);
    }
  };

  const showAlert = (title, message) => {

    Alert.alert(
      title,
      message,
      [
        { text: "OK", onPress: () => console.log("OK Pressed") }
      ]
    );
  };

  if (isLoading) {
    return (
      <LoadingContainer>
        <Loading size={50} color={colors.mainblue} animating={true} />
      </LoadingContainer>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <AnimatedScrollView scrollY={scrollY}>
        <HeaderImage source={{ uri: shop.headerBackground }} />
        {PrintWorkingHours(workingHours, isTemporaryClose, setTemporaryClose)}
      </AnimatedScrollView>

      {PrintHeader(shop.icon, scrollY)}

      <SaveButton>
        <Button title="Save" onPress={handleSave} />
      </SaveButton>

      <Modal isVisible={isSaving}>
        <Loading size={50} color={colors.mainblue} animating={true} />      
      </Modal>
     
    </View>
  );
};
