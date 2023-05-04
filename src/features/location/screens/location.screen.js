import React, { useContext } from "react";
import LottieView from "lottie-react-native";
import { SafeAreaView, StatusBar, StyleSheet, View } from "react-native";
import { Spacer } from "../../../components/spacer/spacer.component";
import {
    AccountBackground1,
    AccountContainer1,
    AccountCover1,
    AuthButton,
    Title1,
    AnimationWrapper1,
    AnimationWrapper2,
} from "../../account/components/account.styles";

import { Button } from 'react-native';
import { useState } from 'react';
import { currentLocationContext } from "../../../services/currentLocation/currentLocation.context";

export const LocationScreen = ({ navigation }) => {

    const [location, setLocation] = useState();
    // const [isLocatedWithLocation, isLocatedWithCity] = useState(false);
    const { onLocation, onCity } = useContext(currentLocationContext);

    return (
        <><SafeAreaView style={{ backgroundColor: "#2683C0" }}>
            <StatusBar
                barStyle="light-content"
            />
        </SafeAreaView>
            <AccountBackground1>
                <AccountCover1 />
                <View style={containerStyle.rowContainer}>
                    <Title1>Chick      Chak</Title1>
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
                    <Button
                        title="use my current location"
                        onPress={() => onLocation()}
                    >
                    </Button>
                    <Spacer size="large">
                        <Button
                            title="Kafr Kanna"
                            onPress={() => onCity("Kafr Kanna")}
                        >
                        </Button>
                    </Spacer>
                    <Spacer size="large">
                        <Button
                            title="Mashhad"
                            onPress={() => onCity("Mashhad")}
                        >
                        </Button>
                    </Spacer>
                    <Spacer size="large">
                        <Button
                            title="Rainy"
                            onPress={() => onCity("Rainy")}
                        >
                        </Button>
                    </Spacer>
                    <Spacer size="large">
                        <Button
                            title="Toraan"
                            onPress={() => onCity("Touraan")}
                        >
                        </Button>
                    </Spacer>
                </AccountContainer1>
            </AccountBackground1 ></>
    );
};


const containerStyle = StyleSheet.create({
    container: {
        padding: 8,
        backgroundColor: "#ffffff",
        alignItems: "center",
        justifycontent: "center"
    },
    rowContainer: {
        flexDirection: 'row',
        alignItems: "center",
        justifycontent: "center"
    }
});
