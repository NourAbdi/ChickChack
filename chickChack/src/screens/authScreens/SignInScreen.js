import React,{useState,useRef} from "react";

import { View,Text,StyleSheet,Dimensions,TextInput} from "react-native";
import { colors,parameters } from "../global/styles";
import * as Animatable from 'react-native-animatable'

import {Icon} from 'react-native-elements'

import Header from '../../components/Headers'

export default function SingInScreen(){

    const [TextInput2Fossued,setTextInput2Fossued]=useState(false)

    const textInput1 = useRef(1)
    const textInput2 = useRef(2)

    return(
        <View style = {styles.container}>
            <Header title ="My Account" type = "arrow-left"/>

            <View>
                <Text style ={title}>Sign-In</Text>
            </View>

            <View style={{alignItems:"center",marginTop:10}}>
                <Text style ={styles.text1}> Please enter the email and password</Text>
                <Text style ={styles.text1}>registered with your account</Text>
            </View>

            <View style={{marginTop:20}}>
                <View> 
                    <TextInput
                        style={styles.TextInput1}
                        placeholder="Email"
                        ref = {textInput1}
                    />
                </View>
                
                
                
                <View style={styles.TextInput2}>
                    <Animatable.View animation ={TextInput2Fossued?"":"fadeInLeft"} duration = {400}>
                        <Icon
                            name = "lock"
                            IconStyle={{color:colors.grey3}}
                            type="material"

                        />
                    </Animatable.View>

                    <TextInput
                        style = {{width:"80%"}}
                        placeholder="password"
                        ref = {textInput2}
                        onFocus = {() => {
                            setTextInput2Fossued(false)
                        }}

                        onBlure={()=>{
                            setTextInput2Fossued(trues)
                        }}
                    />

                    <Animatable.View animation ={TextInput2Fossued?"":"fadeInLeft"} duration = {400}> 
                        <Icon
                            name = "visibility-off"
                            IconStyle={{color:colors.grey3}}
                            type="material"
                            style = {{marginRight:10}}
                        />
                    </Animatable.View>
                </View>

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container :{
        flex:1
    },

    text1:{
        color:colors.grey3,
        fontSize:16
    },

    TextInput1:{
        borderWidth:1,
        borderColor:"#86939e",
        marginHorizontal:20,
        borderRadius:12,
        marginBottom:20,
        paddingLeft:15
    },

    TextInput2:{
        borderWidth:1,
        borderRadius:12,
        marginHorizontal:20,
        borderColor:"#86939e",
        flexDirection:"row",
        justifyContent:"space-between",
        alignCotent:"center",
        alignItems:"center",
        paddingLeft:15
    },

})