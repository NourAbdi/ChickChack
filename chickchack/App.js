import React from 'react'

import {View, Text, StyleSheet,StatusBar} from 'react-native'
import { colors } from './src/global/styles'
import SingInScreen from './src/screens/authScreens/SignInScreen'
import SignInWelcomeScreen from './src/screens/authScreens/SignInWelcomeScreen'


export default function App(){
  return(
    <View style={style.container}>
      <StatusBar  
        barStyle ="light-content"
        backgroundColor ={colors.statusbar}
      />

      <SingInScreen/> 

   </View>
  )
}

const style = StyleSheet.create({
  container: {flex:1}
})