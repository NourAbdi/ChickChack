import React from "react";

import { View,Text, StyleSheet } from 'react-native';
import {Icon} from '@rneui/themed';
import HomeHeader from "../../components/HomeHeader";


export default function HomeScreen(){
    return(
        <View style={styles.container}>
            <HomeHeader />

        </View>

    )
}
const styles= StyleSheet.create({
    
    container:{
        flex:1,
        
    }
})