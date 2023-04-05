import React from 'react'

import { View, Text, StyleSheet, StatusBar } from 'react-native'
import { colors } from './src/global/styles'
import RootNavigator from './src/navigation/RootNavigation'
import SignInScreen from './src/screens/authScreens/SignInScreen'
import { SocialIcon, Icon } from '@rneui/themed';


export default function App() {
  return (
    <View style={style.container}>

      <StatusBar
        barStyle="light-content"
        backgroundColor={colors.statusbar}
      />

      <RootNavigator />

    </View>
  )
}

const style = StyleSheet.create({
  container: { flex: 1 }
})