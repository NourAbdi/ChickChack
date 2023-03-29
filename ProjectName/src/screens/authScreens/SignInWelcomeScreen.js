// import React,{useState,useRef} from "react";

// import { View,Text,StyleSheet,Dimensions,Image } from "react-native";
// import { colors,parameters } from "../global/styles";
// import * as Animatable from 'react-native-animatable'

// import {Icon,Button,SocialIcon} from 'react-native-elements'

// import Swiper from 'react-native-swiper'


// export default function SignInWelcomeScreen(){
//     return(
//         <View style={{flex:1}}>

//             <View style ={{flex:3,justifyContent:'flex-start',alignIteam:'center',paddingTop:20}}>
//                 <Text style = {{fontSize:26,color:colors.button,fontWeight:'bold'}}>DISCOVER RESTAURANTS</Text>
//                 <Text style = {{fontSize:26,color:colors.button,fontWeight:'bold'}}>IN YOUR AREA</Text>
//             </View>

//             <View style= {{flex:4,justifyContent:"center"}}>
//                 <Swiper autoplay ={true}>
//                     <View style ={styles.slide1}>
//                         <Image
//                             sourse ={{uri:"C:\Users\adama\OneDrive\Desktop\CHICHAK\TikTak\Photos\aa"}}
//                             style={{height:"100%", width:"100%"}}
//                         />
//                     </View>

//                     <View style ={styles.slide2}>
//                         <Image
//                             sourse ={{uri:"C:\Users\adama\OneDrive\Desktop\CHICHAK\TikTak\Photos\bb"}}
//                             style={{height:"100%", width:"100%"}}
//                         />
//                     </View>

//                     <View style ={styles.slide3}>
//                         <Image
//                             sourse ={{uri:"C:\Users\adama\OneDrive\Desktop\CHICHAK\TikTak\Photos\cc"}}
//                             style={{height:"100%", width:"100%"}}
//                         />
//                     </View>

//                     <View style ={styles.slide3}>
//                         <Image
//                             sourse ={{uri:"C:\Users\adama\OneDrive\Desktop\CHICHAK\TikTak\Photos\food-pizza"}}
//                             style={{height:"100%", width:"100%"}}
//                         />
//                     </View>
//                 </Swiper>
//             </View>

//             <View style ={{flex:4, justifyContent:"flex-end", marginBottom:20}}>
//                 <View style={{marginHorizontal:20, marginTop:30}}>
//                     <Button
//                         title = "SIGN-IN"
//                         buttonStyle = {parameters.styledButton}
//                         titleStyle = {parameters.buttonTitle}
//                     />
//                 </View>

//                 <View style ={{marginHorizontal:20, marginTop:30}}>
//                     <Button
//                         title = "Create an account"
//                         buttonStyle ={styles.createButton}
//                         titleStyle= {styles.createButtonTitle}
//                     />
//                 </View>
//             </View>


//         </View>
//     )
// }


// const styles=StyleSheet.create({
//     slide1: {
//         flex: 1,
//         justifyContent: 'center',
//         alignIteams: 'center',
//         backgroundColor: '#9DD6EB'
//     },
//     slide2: {
//         flex: 1,
//         justifyContent: 'center',
//         alignIteams: 'center',
//         backgroundColor: '#97cAE5'
//     },
//     slide2: {
//         flex: 1,
//         justifyContent: 'center',
//         alignIteams: 'center',
//         backgroundColor: '#92BBD9n '
//     },

//     createButton:{
//         backgroundColor:"white",
//         alignCotent:"center",
//         justifyContent:"center",
//         borderRadius:12,
//         borderWidth:1,
//         borderColor:"#ff8c52",
//         height:30,
//         paddingHorizontal:20,
//         borderColor:colors.buttons
//     },

//     createButtonTitle:{
//         color:colors.grey1,
//         fountSize:20,
//         fountWeight:"bold",
//         alignItems:"center",
//         justifyContent:"center",
//         marginTop:-3
//     } 
  
// })