import React, { useContext, useRef } from "react";
import LottieView from "lottie-react-native";
import { SafeAreaView, StatusBar, StyleSheet, View, Text, TouchableOpacity, Button, TextInput } from "react-native";
import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha';
import { AuthenticationContext } from "../../../services/authentication/authentication.context";
import { useTranslation } from "react-i18next";

import { app } from "../../../utils/env";
import {
  AccountBackground1,
  AccountContainer1,
  AccountCover1,
  AuthButton,
  Title,
  AnimationWrapper1,
  AnimationWrapper2,
  LeftTitle,
  RightTitle,
  VerificationInput,
  BodyText,
  ButtonView,
  ButtonText,
} from "../components/account.styles";
import {
  GetHeader,
  StatusBarPlaceHolder,

} from "../components/account.component"

import { Dimensions } from "react-native";

const screenWidth = Dimensions.get("window").width;

export const AccountScreen = ({ navigation }) => {
  const firebaseConfig = app ? app.options : undefined;
  const recaptchaVerifier = useRef(null);
  const { phoneNumber, setPhoneNumber, verificationId, setVerificationCode, sendVerificationCode, confirmVerificationCode } = useContext(AuthenticationContext);
  const { t } = useTranslation();

  return (
    <>
      <StatusBarPlaceHolder />
      <GetHeader />
      <View style={{ flex: 1 }} />
      <View style={{ padding: 20 }}>
        <FirebaseRecaptchaVerifierModal
          ref={recaptchaVerifier}
          firebaseConfig={firebaseConfig}
          attemptInvisibleVerification
        />
        <BodyText>{t("Enter phone number")}:</BodyText>
        <VerificationInput
          placeholder="+972..."
          autoCompleteType="tel"
          keyboardType="phone-pad"
          textContentType="telephoneNumber"
          onChangeText={setPhoneNumber}
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
      </View>
      <View style={{ flex: 1 }} />

      <SafeAreaView>
        <LottieView
          key="animation"
          autoPlay
          loop
          resizeMode="cover"
          source={require("../../../../assets/delivery1.json")}
          style={{ width: screenWidth }}
        />
      </SafeAreaView>
    </>
  );
};
