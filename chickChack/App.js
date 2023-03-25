import React from 'react'

import {View, Text, StyleSheet} from 'react-native'
import Header from './src/components/Headers'
import { colors } from './src/global/styles'


export default function App(){
  return(
    <View style={style.container}>
      <Statusbar 
        barStyle ="light-content"
        backgroundColor ={colors.statusbar}
      />
      <Header title ="My Account" />
    </View>
  )
}

const style = StyleSheet.create({
  container: {flex:1}
})