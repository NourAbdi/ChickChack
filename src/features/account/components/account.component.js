import { StatusBar,SafeAreaView,View } from "react-native";
import LottieView from "lottie-react-native";

import { colors } from "../../../infrastructure/theme/colors";
import {
    Header,
    LeftTitle,
    RightTitle,
    AnimationLightning,
} from "./account.styles";

export const StatusBarPlaceHolder = () => {
  return (
        <SafeAreaView style={{ backgroundColor: colors.mainblue}}>
            <StatusBar barStyle="light-content" />
        </SafeAreaView>
  );
}

export const GetHeader = () => {
    return (
        <Header>
            <LeftTitle>Chick</LeftTitle>
            <AnimationLightning>
                <LottieView
                    key="animation"
                    autoPlay
                    loop
                    resizeMode="cover"
                    source={require("../../../../assets/lightning.json")}
                    style={{ width: 130, height: 130 }}
                />
            </AnimationLightning>
            <RightTitle>Chack</RightTitle>
        </Header>
    );
  }