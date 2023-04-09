import React from "react";
import LottieView from "lottie-react-native";

import { SafeAreaView,StatusBar } from "react-native";

import { Spacer } from "../../../components/spacer/spacer.component";
import {
  AccountBackground,
  AccountContainer,
  AccountCover,
  AuthButton,
  Title,
  AnimationWrapper,
} from "../components/account.styles";

export const AccountScreen = ({ navigation }) => {
  return (
    <><SafeAreaView  style={{backgroundColor:"#2683C0"}}>
      <StatusBar
        barStyle = "light-content"
      />
    </SafeAreaView>
    <AccountBackground>
        <AccountCover />
        <Title>Chick Chak</Title>

        <AccountContainer>
          <AuthButton
            icon="lock-open-outline"
            mode="contained"
            onPress={() => navigation.navigate("Login")}
          >
            Login
          </AuthButton>
          <Spacer size="large">
            <AuthButton
              icon="email"
              mode="contained"
              onPress={() => navigation.navigate("Register")}
            >
              Register
            </AuthButton>
          </Spacer>
        </AccountContainer>

        <AnimationWrapper>
          <LottieView
            key="animation"
            autoPlay
            loop
            resizeMode="cover"
            source={require("../../../../assets/delivery1.json")} />
        </AnimationWrapper>



      </AccountBackground></>
  );
};
