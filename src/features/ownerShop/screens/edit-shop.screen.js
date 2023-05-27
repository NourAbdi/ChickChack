import React, { useContext, useState,useRef } from "react";
import { View,Animated,Switch,Text } from "react-native";
import CheckBox from '@react-native-community/checkbox';


import DropdownPicker from 'react-native-dropdown-picker';
import ModalDropdown from 'react-native-modal-dropdown';
import ModalSelector from 'react-native-modal-selector';


import { Card } from "react-native-paper";


import { OwnerShopContext } from "../../../services/ownerShop/ownerShop.context";
import { colors } from "../../../infrastructure/theme/colors";

import{
    HeaderImage,
    AnimatedImageView,
    AnimatedHeaderView,
    AnimatedScrollView,
    LoadingContainer,
    Loading,
    ShopIcon,
    MarginTop,
 } from '../components/shop-details.screen.style'

import{
    headerTranslate,
    titleScale,
    titleTranslate,
    titleOpacity,
} from "../components/shop-details.screen.components"

import {
  PrintWorkingHours
} from "../components/edit-shop.screen.component"

export const EditShopScreen = () => {
  const { shop,updateShop } = useContext(OwnerShopContext);
  const [isTemporaryClose, setTemporaryClose] = useState(shop.IstemporaryClose);
  const scrollY = useRef(new Animated.Value(0)).current;
  const workingHours = shop.workingHours;
  // const handleSave = () => {
  //   // Perform the saving action with the updated working hours
  //   console.log("Updated working hours:", workingHours);
  //   // TODO: Implement the saving logic here
  //   updateShop( workingHours, isOpen );
  // };
  
  
  console.log("workingHoursworkingHoursworkingHoursworkingHoursworkingHoursworkingHours11",workingHours);
  return (
    <View style={{ flex: 1 }}>
      <AnimatedScrollView scrollY={scrollY}>
        <HeaderImage source={{ uri: shop.headerBackground }} />
        {PrintWorkingHours(workingHours,isTemporaryClose,setTemporaryClose)}
        
      </AnimatedScrollView>

      <AnimatedImageView style={{ opacity: titleOpacity(scrollY),transform: [{ translateY: headerTranslate(scrollY) }],}}>
      </AnimatedImageView>

      <AnimatedHeaderView style={[{ opacity: titleOpacity(scrollY), transform: [{ scale: titleScale(scrollY) }, { translateY: titleTranslate(scrollY) }],},]} >
        <MarginTop>
          <ShopIcon source={{ uri: shop.icon }} />
        </MarginTop>
      </AnimatedHeaderView>

      {/* <Button title="Save" onPress={handleSave()} /> */}
      
    </View>
  );
};
