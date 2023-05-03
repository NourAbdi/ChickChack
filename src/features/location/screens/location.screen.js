import React, { useContext } from "react";
import LottieView from "lottie-react-native";
import { SafeAreaView, StatusBar, StyleSheet, View, Text, Alert } from "react-native";
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
import { useState, useEffect } from 'react';
import * as Location from 'expo-location';
import { locationContext } from "../../../services/currentLocation/currentLocation.context";

export const LocationScreen = ({ navigation }) => {

    const [ location,setLocation] = useState();
    const {  onLocation } = useContext(locationContext);

    useEffect(() => {
        const getPermissions = async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                console.log("Please grant location permissions");
                return;
            }

            let currentLocation = await Location.getCurrentPositionAsync({});
            // onLocation(currentLocation);
            setLocation(currentLocation);
            // console.log("Location:");
            // console.log(currentLocation);
            // console.log(location);
        };
        getPermissions();
    }, []);

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
                        onPress={() =>
                            // !location
                            //     ? Alert.alert('current location', 'Please grant location permissions', [
                            //         { text: 'OK', onPress: () => console.log('OK Pressed') },
                            //     ])
                            //     :
                                 onLocation(location)
                        }
                    >
                    </Button>
                    <Spacer size="large">
                        <Button
                            title="Kafar Kanna"
                            onPress={() => navigation.navigate("RestaurantsScreen")}
                        >
                        </Button>
                    </Spacer>
                    <Spacer size="large">
                        <Button
                            title="Mashhad"
                            onPress={() => navigation.navigate()}
                        >
                        </Button>
                    </Spacer>
                    <Spacer size="large">
                        <Button
                            title="Rainy"
                            onPress={() => navigation.navigate()}
                        >
                        </Button>
                    </Spacer>
                    <Spacer size="large">
                        <Button
                            title="Toraan"
                            onPress={() => navigation.navigate()}
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
