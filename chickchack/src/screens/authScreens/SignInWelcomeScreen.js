import React, { useState, useRef } from "react";

import { View, Text, StyleSheet, Dimensions, Image } from "react-native";
import { colors, parameters } from "../../global/styles";
import * as Animatable from 'react-native-animatable'

import { Icon, Button, SocialIcon } from '@rneui/base';

import Swiper from 'react-native-swiper'


export default function SignInWelcomeScreen({navigation}) {
    return (
        <View style={{ flex: 1 }}>

            <View style={{ flex: 3, justifyContent: 'flex-start', alignItems: "center", paddingTop: 20 }}>
                <Text style={{ fontSize: 26, color: colors.buttons, fontWeight: 'bold' }}>DISCOVER RESTAURANTS</Text>
                <Text style={{ fontSize: 26, color: colors.buttons, fontWeight: 'bold' }}>IN YOUR AREA</Text>
            </View>

            <View style={{ flex: 4, justifyContent: "center" }}>
                <Swiper autoplay={true}>
                    <View style={styles.slide1}>
                        <Image
                            source={require('../../photos/food1.png')}
                            style={{ height: "100%", width: "100%" }}
                        />
                    </View>

                    <View style={styles.slide2}>
                        <Image
                            source={require('../../photos/food2.png')}
                            style={{ height: "100%", width: "100%" }}
                        />
                    </View>

                    <View style={styles.slide3}>
                        <Image
                            source={require('../../photos/food3.png')}
                            style={{ height: "100%", width: "100%" }}
                        />
                    </View>

                    <View style={styles.slide3}>
                        <Image
                            source={require('../../photos/food4.png')}
                            style={{ height: "100%", width: "100%" }}
                        />
                    </View>
                </Swiper>
            </View>

            <View style={{ flex: 4, justifyContent: "flex-end", marginBottom: 20 }}>
                <View style={{ marginHorizontal: 20, marginTop: 20 }}>
                    <Button
                        title="SIGN-IN"
                        buttonStyle={parameters.styledButton}
                        titleStyle={parameters.buttonTitle}
                        onPress={()=>{
                            navigation.navigate("SignInScreen")
                        }}
                    />
                </View>

                <View style={{ marginHorizontal: 20, marginTop: 20 }}>
                    <Button
                        title="Create an account"
                        buttonStyle={styles.createButton}
                        titleStyle={styles.createButtonTitle}
                    />
                </View>
            </View>


        </View>
    )
}


const styles = StyleSheet.create({
    slide1: {
        flex: 1,
        justifyContent: 'center',
        alignIteams: 'center',
        backgroundColor: '#9DD6EB'
    },
    slide2: {
        flex: 1,
        justifyContent: 'center',
        alignIteams: 'center',
        backgroundColor: '#97cAE5'
    },
    slide3: {
        flex: 1,
        justifyContent: 'center',
        alignIteams: 'center',
        backgroundColor: '#92BBD9n '
    },

    createButton: {
        backgroundColor: "white",
        alignContent: "center",
        justifyContent: "center",
        borderRadius: 50,
        borderWidth: 1,
        borderColor: "#ff8c52",
        height: 30,
        paddingHorizontal: 20,
        borderColor: colors.buttons
    },

    createButtonTitle: {
        color: colors.grey1,
        fontSize: 20,
        fontWeight: "bold",
        alignItems: "center",
        justifyContent: "center",
        marginTop: -3
    }

})