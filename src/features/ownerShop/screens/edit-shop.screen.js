import React, { useContext, useState, useRef } from "react";
import { View, Animated, Button, Alert } from "react-native";
import Modal from "react-native-modal";
import { useTranslation } from "react-i18next";

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
  const [isTemporaryClose, setTemporaryClose] = useState(shop?.isTemporaryClose);
  const [isSaving, setIsSaving] = useState(false);
  const scrollY = useRef(new Animated.Value(0)).current;
  const workingHours = shop?.workingHours;
  const { t } = useTranslation();

  if (isLoading) {
    return (
      <LoadingContainer>
        <Loading size={50} color={colors.mainblue} animating={true} />
      </LoadingContainer>
    );
  }
  
  const handleSave = async () => {
    setIsSaving(true);

    if (isWorkingHoursValid(workingHours).isValid) {
      const isUpdateSuccessful = await updateShop(workingHours, isTemporaryClose);
      setIsSaving(false);
      if (isUpdateSuccessful) {
        showAlert(t("Changes Saved"), t("Changes have been saved successfully!"));
      } else {
        showAlert(t("Error"), t("Failed to save changes. Please try again later."));
      }
    } else {
      setIsSaving(false);
      showAlert(
        t("Error"),
        `${t("Start hour should be smaller than End hour")}\n${t("Invalid day")}: ${isWorkingHoursValid(workingHours).invalidDay}`
      );
    }
  };

  const showAlert = (title, message) => {
    Alert.alert(
      title,
      message,
      [{ text: t("OK"), onPress: () => console.log("OK Pressed") }]
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <AnimatedScrollView scrollY={scrollY}>
        <HeaderImage source={{ uri: shop.headerBackground }} />
        {PrintWorkingHours(workingHours, isTemporaryClose, setTemporaryClose)}
      </AnimatedScrollView>

      {PrintHeader(shop.icon, scrollY)}

      <SaveButton>
        <Button title={t("Save")} onPress={handleSave} />
      </SaveButton>

      <Modal isVisible={isSaving}>
        <Loading size={50} color={colors.mainblue} animating={true} />
      </Modal>
    </View>
  );
};
