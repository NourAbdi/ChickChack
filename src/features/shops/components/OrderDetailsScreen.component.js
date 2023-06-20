import React from "react";
import { View,SafeAreaView,StatusBar} from "react-native";
import { IconButton } from "react-native-paper";
import Icons from "@expo/vector-icons/MaterialIcons";
import { colors } from "../../../infrastructure/theme/colors";


import { theme } from "../../../infrastructure/theme";
import{
    Row,
    AnimatedHeaderView,
    AnimatedIconView,
    ShopIcon,
    AnimatedBackView,
    ViewCounter,
    CounterButton,
    Count,
  } from "./OrderDetailsScreen.style";



export const PrintCounter = (count,setCount,addToCart,shop,item) => {
  return(
    <Row>
      <ViewCounter>
        <CounterButton onPress={() => setCount((count) => Math.max(1, count - 1))}>
          <Icons name="remove" size={20} color={colors.mainblue} />
        </CounterButton>
        <Count>{count}</Count>
        <CounterButton onPress={() => setCount((count) => count + 1)}>
          <Icons name="add" size={20} color={colors.mainblue} />
        </CounterButton>
        
      </ViewCounter>
      <View style={{flex:1}}/>
      <ViewCounter>
        <CounterButton onPress={() => addToCart(shop, item, count)}>
          <Icons name="add-shopping-cart" size={24} color={colors.mainblue} />
        </CounterButton>
        <Count>Add to cart</Count>
      </ViewCounter>
    </Row>
  );
};

export const StatusBarPlaceHolder= () => {
  return (
      <SafeAreaView style={{ backgroundColor: colors.mainblue}}>
        <StatusBar barStyle="light-content"/>
      </SafeAreaView>
  );
}
//------------------------------------------------------------------------------------------------------------------------------------
const HEADER_HEIGHT = theme.headerHeigth;
 
export const headerTranslate =(scrollY) =>{ 
  return(
  scrollY.interpolate({
    inputRange: [0, HEADER_HEIGHT],
    outputRange: [0,0],
    extrapolate: 'clamp',
  })
  );
}

export const titleScale =(scrollY) =>{
  return(
    scrollY.interpolate({
      inputRange: [0,HEADER_HEIGHT, 2*HEADER_HEIGHT],
      outputRange: [1, 1, 0.8],
      extrapolate: 'clamp',
    })
  );
}
export const titleTranslate =(scrollY) =>{
   return(
    scrollY.interpolate({
      inputRange: [0, HEADER_HEIGHT / 2, HEADER_HEIGHT],
      outputRange: [0, 0, -8],
      extrapolate: 'clamp',
    })
   );
}

export const titleOpacity =(scrollY) =>{
  return(
    scrollY.interpolate({
      inputRange: [HEADER_HEIGHT,HEADER_HEIGHT+100],
      outputRange: [0,1],
    })
  );
}

export const PrintHeader = (icon,scrollY,navigation) => {
    return(
      <>
        <AnimatedHeaderView style={{ opacity: titleOpacity(scrollY), transform: [{ translateY: headerTranslate(scrollY) }] }} />
        <AnimatedIconView style={[{ opacity: titleOpacity(scrollY), transform: [{ scale: titleScale(scrollY) }, { translateY: titleTranslate(scrollY) }] }]}>
          <ShopIcon source={{ uri: icon }} />
        </AnimatedIconView>
        <AnimatedBackView style={[{ transform: [{ translateY: titleTranslate(scrollY) }] }]}>
          <Row style={{ justifyContent: 'space-between' }}>
            <IconButton
              icon="arrow-left"
              color="white"
              size={30}
              onPress={() => navigation.goBack()} 
              style={{alignSelf:'flex-start'}}

            />
            <IconButton
              icon="cart"
              color="white"
              size={30}
              onPress={() => navigation.navigate("Cart")} 
              style={{alignSelf:"flex-end"}}
            />
          </Row>
          
        </AnimatedBackView>
      </>
    );
};
