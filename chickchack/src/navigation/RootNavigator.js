import React from "react";

import 'react-native-gesture-handler';

import {NavigationContainer} from '@react-navigation/native'
import AuthStack from "./authNavigators";



export default function RootNavigator(){

    return(
        <NavigationContainer>
            <AuthStack />
        </NavigationContainer>
    )
}