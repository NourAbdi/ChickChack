import React, { useContext, useRef } from "react";
import LottieView from "lottie-react-native";
import { SafeAreaView, StatusBar, StyleSheet, View, Text, TouchableOpacity, Button, TextInput } from "react-native";
import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha';
import { AuthenticationContext } from "../../../services/authentication/authentication.context"; 
import { useTranslation } from "react-i18next";
import {
  AccountBackground1,
  AccountContainer1,
  AccountCover1,
  AuthButton,
  Title1,
  AnimationWrapper1,
  AnimationWrapper2,
} from "../components/account.styles";
import { app } from "../../../utils/env";

export const AccountScreen = ({ navigation }) => {
  const firebaseConfig = app ? app.options : undefined;
  const recaptchaVerifier = useRef(null);
  const { phoneNumber, setPhoneNumber, verificationId, setVerificationCode, sendVerificationCode, confirmVerificationCode } = useContext(AuthenticationContext);
  const { t } = useTranslation();

  return (
    <>
      <SafeAreaView style={{ backgroundColor: "#2683C0" }}>
        <StatusBar barStyle="light-content" />
      </SafeAreaView>
      <AccountBackground1>
        <AccountCover1 />
        <View>
          <Title1>{t("ChickChack")}</Title1>
          <AnimationWrapper1>
            <LottieView
              key="animation"
              autoPlay
              loop
              resizeMode="cover"
              source={require("../../../../assets/lightning.json")}
            />
          </AnimationWrapper1>
        </View>
        <View style={{ padding: 20, marginTop: 50 }}>
          <FirebaseRecaptchaVerifierModal
            ref={recaptchaVerifier}
            firebaseConfig={firebaseConfig}
            attemptInvisibleVerification
          />
          <Text style={{ marginTop: 20 }}>Enter phone number</Text>
          <TextInput
            placeholder="Enter phone number"
            autoCompleteType="tel"
            keyboardType="phone-pad"
            textContentType="telephoneNumber"
            onChangeText={setPhoneNumber}
          />
          <Button
            title="Send Verification Code"
            disabled={!phoneNumber}
            onPress={() => sendVerificationCode(recaptchaVerifier)}
          />
          <Text>Enter Verification code</Text>
          <TextInput
            editable={!!verificationId}
            placeholder="123456"
            onChangeText={setVerificationCode}
          />
          <Button
            title="Confirm Verification Code"
            disabled={!verificationId}
            onPress={confirmVerificationCode}
          />
        </View>
        <AnimationWrapper2>
          <LottieView
            key="animation"
            autoPlay
            loop
            resizeMode="cover"
            source={require("../../../../assets/delivery1.json")}
          />
        </AnimationWrapper2>
      </AccountBackground1>
    </>
  );
};
