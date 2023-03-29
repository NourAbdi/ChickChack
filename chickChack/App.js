import React from 'react'

import {View, Text, StyleSheet} from 'react-native'
import { colors } from './src/global/styles'
import SingInScreen from './src/screens/authScreens/SignInScreen'
import SignInWelcomeScreen from './src/screens/authScreens/SigninWelcomeScreen'


export default function App(){
  return(
    <View style={style.container}>
      <Statusbar 
        barStyle ="light-content"
        backgroundColor ={colors.statusbar}
      /> 

    <SignInWelcomeScreen/>

   </View>
  )
}

const style = StyleSheet.create({
  container: {flex:1}
})