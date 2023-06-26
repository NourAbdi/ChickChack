import React,{useState} from "react";
import { View,SafeAreaView,StatusBar,Animated,ScrollView} from "react-native";
import Icons from "@expo/vector-icons/MaterialIcons";
import { CheckBox } from 'react-native-elements'

import { colors } from "../../../infrastructure/theme/colors";
import{
    Row,
    ViewCounter,
    CounterButton,
    Count,
    OrderImage,
    HeaderView,
    LeftHeaderButton,
    ViewAddition,
    AdditionImage,
    AdditionInfo,
    CategoryName,
  } from "./orderAdditions.screen.style";

export const PrintCounter = (count,setCount,shop,item,additions={}) => {
  const [buttonAnimation] = useState(new Animated.Value(1));
  const handlePress = () => {
    // addToCart(shop, item, count, additions);
    // Start the button animation
    Animated.sequence([
      Animated.timing(buttonAnimation, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(buttonAnimation, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const buttonScale = buttonAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  return(
    <Row style={{position:'relative'}}>
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
      <Animated.View style={{ transform: [{ scale: buttonScale }] }}>
        <ViewCounter>
          <CounterButton onPress={() => handlePress()}>
            <Icons name="add-shopping-cart" size={24} color={colors.mainblue} />
          </CounterButton>
          <Count>Add to cart</Count>
        </ViewCounter>
      </Animated.View>

    </Row>
  );
};

export const printHeader = (headerImage,buttonColor,navigation) => {
  
  return (
    <>
      <SafeAreaView style={{ backgroundColor: colors.mainblue}}>
        <StatusBar barStyle="light-content"/>
      </SafeAreaView>      
      <OrderImage source={{ uri: headerImage }} />
      <SafeAreaView style={{ position: 'absolute' }}>
        <HeaderView>
          <LeftHeaderButton onPress={() => navigation.goBack()} color={buttonColor}>
            <Icons name="arrow-back" size={24} color={buttonColor} />
          </LeftHeaderButton>
        </HeaderView>
      </SafeAreaView>
    </>
  );
}

export const PrintIteamAdditions = (additions,checkedItems,setCheckedItems) => {
  const isEmpty = Object.keys(additions).length === 0;
  const [isRemoveIcon, setIsRemoveIcon] = useState(() => {
    const initialRemoveIconState = {};
    Object.entries(additions).forEach(([additionType, additionsOfType]) => {
      additionsOfType.forEach((addition) => {
        initialRemoveIconState[addition.additionName] = addition.additionAvailability;
      });
    });
    return initialRemoveIconState;
  });
  const handleButtonPress = (additionName) => {
    // Toggle the state variable for the clicked addition
    setIsRemoveIcon((prevState) => ({
      ...prevState,
      [additionName]: !prevState[additionName]
    }));
  };
  return (
    !isEmpty && (
      <ScrollView>
        {Object.entries(additions).map(([additionType, additionsOfType]) => (
          <View key={additionType}>
            <CategoryName>{additionType}</CategoryName>
            {additionsOfType.map((addition,index) => (
              <ViewAddition key={index}>
                <AdditionImage source={{ uri: addition.additionPhoto }} />
                <AdditionInfo>{addition.additionName}</AdditionInfo>
                <View style={{ flex: 1 }} />
                <AdditionInfo>{addition.additionPrice}₪</AdditionInfo>
                <CounterButton onPress={() => handleButtonPress(addition.additionName)}>
                  <Icons name={isRemoveIcon[addition.additionName] ? 'add' : 'remove'} size={20} color="black" />
                </CounterButton>
              </ViewAddition>
            ))}
          </View>
        ))}
      </ScrollView>
    )
  );
};
