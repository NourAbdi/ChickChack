import React from "react";

import { View,Text, StyleSheet } from 'react-native';
import {Icon,withBadge} from '@rneui/themed';
import{colors,parameters} from '../global/styles'

export default function HomeHeader(){

    const BadgeIcon =withBadge(0)(Icon)
    return(
        <View style={styles.header}>
            <View style={{alignContent:"center", justifyContent:'center', marginLeft:15}}>
                <Icon
                    type="material-community"
                    name="menu"
                    color={colors.cardbackground}
                    size ={32}
                />
            </View>

            <View style={{alignContent:"center",justifyContent:"center"}}>
                <Text style={{color:colors.cardbackground, fontSize:25,fontWeight:'bold'}}>XpressFood</Text>
            </View>

            <View style={{alignContent:"center",justifyContent:"center", marginRight:15}}>
                <BadgeIcon
                type="material-community"
                name="cart"
                color={colors.cardbackground}
                size ={35}
                />
            </View>
        </View>
    )
}

const styles=StyleSheet.create({
    header:{
        flexDirection:'row',
        backgroundColor: colors.buttons,
        height:parameters.headerHeight,
        justifyContent:'space-between'

    }
})