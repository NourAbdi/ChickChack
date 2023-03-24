import React from "react";

import { View,Text,StyleSheet,Dimensions } from "react-native";
import { colors,parameters } from "../global/styles";

export default function Header(){

    return (<View style = {styles.header}>

            </View>
    )
}

const styles= StyleSheet.create({
   header:{
        flexDireaction:"row",
        backgroundColor:colors.buttons,
        height:parameters.headerHeight
   } 
})