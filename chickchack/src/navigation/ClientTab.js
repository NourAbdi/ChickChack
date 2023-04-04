import React from "react";


import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import {Icon,withBadge} from '@rneui/themed';

import{colors} from '../global/styles'
import HomeScreen from "../screens/HomeScreen";
import SearchScreen from "../screens/SearchScreen";
import MyOrdersScreen from "../screens/MyOrdersScreen";
import MyAccountScreen from "../screens/MyAccountScreen";

import { View,Text, StyleSheet } from 'react-native';
 

const ClientTabs = createBottomTabNavigator();

export default function RootClientTabs(){
    
    return(
        <ClientTabs.Navigator

        screenOptions={({ route }) => ({
            tabBarInactiveTintColor: colors.grey3,
            tabBarActiveTintColor:  colors.buttons
        })}
            // tabBarOptions ={{
            //     activeTintColor: colors.buttons
            // }}
        >
            <ClientTabs.Screen
                name="HomeScreen"
                component={HomeScreen}
                options ={ 
                    {
                        tabBarLabel : "Home",
                        headerShown:false,
                        tabBarIcon: ({color,size})=>(
                            <Icon
                                name ='home'
                                type='material'
                                color={color}
                                size={size}
                            />
                        )
                    
                    }
                }
            />

            <ClientTabs.Screen
                name="SearchScreen"
                component={SearchScreen}
                options ={ 
                    {
                        tabBarLabel : "Search",
                        headerShown:false,
                        tabBarIcon: ({color,size})=>(
                            <Icon
                                name ='search'
                                type='material'
                                color={color}
                                size={size}
                            />
                        )
                    
                    }
                }
            />

            <ClientTabs.Screen
                name="MyOrdersScreen"
                component={MyOrdersScreen}
                options ={ 
                    {
                        tabBarLabel : "My Orders",
                        headerShown:false,
                        tabBarIcon: ({color,size})=>(
                            <Icon
                                name ='view-list'
                                type='material'
                                color={color}
                                size={size}
                            />
                        )
                    
                    }
                }
            />

            <ClientTabs.Screen
                name="MyAccountScreen"
                component={MyAccountScreen}
                options ={ 
                    {
                        tabBarLabel : "My Account",
                        headerShown:false,
                        tabBarIcon: ({color,size})=>(
                            <Icon
                                name ='person'
                                type='material'
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