import React from "react";


import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import {Icon,withBadge} from '@rneui/themed';


import { View,Text, StyleSheet } from 'react-native';
import{colors,parameters} from '../global/styles'
import { create } from "react-test-renderer";
import HomeScreen from "../screens/HomeScreen";
 

const ClientTabs = createBottomTabNavigator();

export default function RootClientTabs(){
    
    return(
        <ClientTabs.Navigator
            tabBarOption ={{
                activeTintColor: colors.lightgreen
            }}
        
        >
            <ClientTabs.Screen
                name="HomeScreen"
                component={HomeScreen}
                options ={ 
                    {
                        tabBarLabel : 'Home',
                        tabBarIcon: ({color,size})=>(
                            <Icon
                                name ="home"
                                type="material"
                                color={color}
                                size={size}
                            />
                        )
                    
                    }
                }
            />
        </ClientTabs.Navigator>
    )
}