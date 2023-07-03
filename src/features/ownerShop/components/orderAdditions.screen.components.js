import React,{useState, useContext} from "react";
import { View,SafeAreaView,StatusBar,Animated,ScrollView} from "react-native";
import Icons from "@expo/vector-icons/MaterialIcons";
import { CheckBox } from 'react-native-elements'
import { OwnerShopContext } from "../../../services/ownerShop/ownerShop.context";

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

export const PrintIteamAdditions = (additions,checkedItems,setCheckedItems,itemUid) => {
  const { updateAddItemAvailable } = useContext(OwnerShopContext);
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
    if(updateAddItemAvailable(itemUid,additionName,isRemoveIcon[additionName])){
      setIsRemoveIcon((prevState) => ({
        ...prevState,
        [additionName]: !prevState[additionName]
      })
      );
    }
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
