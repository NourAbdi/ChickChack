import React, { useContext, useState,useRef } from "react";
import { View,Animated} from "react-native";

import { OwnerShopContext } from "../../../services/ownerShop/ownerShop.context";
import { colors } from "../../../infrastructure/theme/colors";
import{
    HeaderImage,
    AnimatedScrollView,
    LoadingContainer,
    Loading,
} from '../components/shop-details.screen.style'

import{
  PrintHeader
} from "../components/shop-details.screen.components"

import {
  PrintWorkingHours
} from "../components/edit-shop.screen.component"

export const EditShopScreen = () => {
  const { shop,updateShop, isLoading } = useContext(OwnerShopContext);
  const [isTemporaryClose, setTemporaryClose] = useState(shop.IstemporaryClose);
  const scrollY = useRef(new Animated.Value(0)).current;
  const workingHours = shop.workingHours;
  // const handleSave = () => {
  //   // Perform the saving action with the updated working hours
  //   console.log("Updated working hours:", workingHours);
  //   // TODO: Implement the saving logic here
  //   updateShop( workingHours, isOpen );
  // };
  // console.log("workingHoursworkingHoursworkingHoursworkingHoursworkingHoursworkingHours11",workingHours);
  
  if (isLoading) {
    // If shop details are not yet fetched, you can show a loading indicator
    return(
      <LoadingContainer>
        <Loading size={50} color={colors.mainblue} animating={true} />
      </LoadingContainer>
    );
  }
  return (
    <View style={{ flex: 1 }}>
      <AnimatedScrollView scrollY={scrollY}>
        <HeaderImage source={{ uri: shop.headerBackground }} />
        {PrintWorkingHours(workingHours,isTemporaryClose,setTemporaryClose)}
        
      </AnimatedScrollView>
      {PrintHeader(shop.icon,scrollY)}


      {/* <Button title="Save" onPress={handleSave()} /> */}
      
    </View>
  );
};
