import React, { useContext, useRef } from "react";
import LottieView from "lottie-react-native";
import { View, Text } from "react-native";
import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha';
import { AuthenticationContext } from "../../../services/authentication/authentication.context";
import { useTranslation } from "react-i18next";
import { app } from "../../../utils/env";
import { VerificationInput, BodyText, ButtonView, ButtonText } from "../components/account.styles";
import { GetHeader, StatusBarPlaceHolder } from "../components/account.component"
import { Dimensions } from "react-native";

const screenWidth = Dimensions.get("window").width;

export const AccountScreen = () => {
  const firebaseConfig = app ? app.options : undefined;
  const recaptchaVerifier = useRef(null);
  const { phoneNumber, setPhoneNumber, verificationId, setVerificationCode, sendVerificationCode, confirmVerificationCode, error } = useContext(AuthenticationContext);
  const { t, i18n } = useTranslation();

  // Function to normalize phone number
  const normalizePhoneNumber = (input) => {
    // Remove all non-numeric characters
    const numericInput = input.replace(/\D/g, "");
    // Check if the input starts with "0" or "05"
    if (numericInput.startsWith("0")) {
      // If it starts with "0", replace with "+972"
      return `+972${numericInput.slice(1)}`;
    } else if (numericInput.startsWith("05")) {
      // If it starts with "05", prepend with "+972"
      return `+972${numericInput.slice(2)}`;
    }
    // Otherwise, return input as is
    return input;
  };

  // Function to handle phone number change
  const handlePhoneNumberChange = (input) => {
    const normalizedNumber = normalizePhoneNumber(input);
    setPhoneNumber(normalizedNumber);
  };

  // Function to extract error code from Firebase error message
  const extractErrorCode = (errorMessage) => {
    const errorCodeRegex = /auth\/([^)]+)/;
    const matches = errorMessage.match(errorCodeRegex);
    if (matches && matches.length > 1) {
      return matches[1];
    }
    return null;
  };

  // Function to render error message
  const renderErrorMessage = () => {
    if (error) {
      const errorCode = extractErrorCode(error.message);
      if (errorCode) {
        return <Text style={{ color: 'red' }}>{errorCode}</Text>;
      }
    }
    return null;
  };

  return (
    <View style={{ flex: 1 }}   >
      <StatusBarPlaceHolder />
      <GetHeader/>
      <View style={{ padding: 10,flex: 1,justifyContent:'center'  }}>
        <FirebaseRecaptchaVerifierModal
          ref={recaptchaVerifier}
          firebaseConfig={firebaseConfig}
          languageCode = {i18n.language}
        />
        <BodyText>{t("Enter phone number")}:</BodyText>
        <VerificationInput
          placeholder="+972..."
          autoCompleteType="tel"
          keyboardType="phone-pad"
          textContentType="telephoneNumber"
          onChangeText={handlePhoneNumberChange}
        />
        <ButtonView onPress={() => sendVerificationCode(recaptchaVerifier)} disabled={!phoneNumber} isSelected={!phoneNumber} >
          <ButtonText>{t("Send Verification Code")}</ButtonText>
        </ButtonView>
        <BodyText>{t("Enter Verification code")}:</BodyText>
        <VerificationInput
          editable={!!verificationId}
          placeholder="123456"
          onChangeText={setVerificationCode}
          keyboardType="phone-pad"
        />
        <ButtonView onPress={confirmVerificationCode} disabled={!verificationId} isSelected={!verificationId} >
          <ButtonText>{t("Confirm Verification Code")}</ButtonText>
        </ButtonView>
        <View>
        {renderErrorMessage()}
        </View>
      </View>
      <LottieView
        key="animation"
        autoPlay
        loop
        resizeMode="cover"
        source={require("../../../../assets/delivery1.json")}
        style={{ width: screenWidth }}
      />
    </View>
  );
};
