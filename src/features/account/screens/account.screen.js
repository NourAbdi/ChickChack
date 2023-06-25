import React from "react";
import LottieView from "lottie-react-native";

import { SafeAreaView,StatusBar,StyleSheet,View,Text } from "react-native";

import { Spacer } from "../../../components/spacer/spacer.component";
import {
  AccountBackground1,
  AccountContainer1,
  AccountCover1,
  AuthButton,
  Title1,
  AnimationWrapper1,
  AnimationWrapper2,
} from "../components/account.styles";
import { useTranslation } from "react-i18next";

export const AccountScreen = ({ navigation }) => {
  const { t } = useTranslation();
  return (
    <><SafeAreaView  style={{backgroundColor:"#2683C0"}}>
      <StatusBar
        barStyle = "light-content"
      />
    </SafeAreaView>
    <AccountBackground1>
     
      <AccountCover1 />

      <View style={containerStyle.rowContainer}>
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
      
        
      
        

        <AccountContainer1>
          <AuthButton
            icon="lock-open-outline"
            mode="contained"
            onPress={() => navigation.navigate("Login")}
          >
            {t("login")}
          </AuthButton>
          <Spacer size="large">
            <AuthButton
              icon="email"
              mode="contained"
              onPress={() => navigation.navigate("Register")}
            >
              {t("register")}
            </AuthButton>
          </Spacer>
        </AccountContainer1>

        <AnimationWrapper2>
          <LottieView
            key="animation"
            autoPlay
            loop
            resizeMode="cover"
            source={require("../../../../assets/delivery1.json")} />
        </AnimationWrapper2>



      </AccountBackground1></>
  );
};



const containerStyle = StyleSheet.create({
  container: {
    padding: 8,
    backgroundColor: "#ffffff",
    alignItems:"center",
    justifycontent: "center"
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems:"center",
    justifycontent: "center"
  }
}); 
