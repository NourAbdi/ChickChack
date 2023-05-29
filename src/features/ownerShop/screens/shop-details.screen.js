import React, { useRef,useContext} from 'react';
import { View, Animated} from 'react-native';

import { OwnerShopContext } from "../../../services/ownerShop/ownerShop.context";
import { colors } from "../../../infrastructure/theme/colors";
import{
    HeaderImage,
    RestaurantInfoCard,
    RestaurantName,
    RestaurantInfo,
    ViewAbove,
    AnimatedScrollView,
    LoadingContainer,
    Loading,
 } from '../components/shop-details.screen.style'

import{
    wazeButton,
    PrintGettingOrder,
    WorkingHoursComponent,
    isOpenCheck,
    PrintHeader,
    PrintMenu,
} from "../components/shop-details.screen.components"


export const ShopDetailsScreen = ({navigation}) => {
    const { shop, menu, isLoading } = useContext(OwnerShopContext);
    const scrollY = useRef(new Animated.Value(0)).current;
    
    if (isLoading) {
      // If shop details are not yet fetched, you can show a loading indicator
      return(
        <LoadingContainer>
          <Loading size={50} color={colors.mainblue} animating={true} />
        </LoadingContainer>
      );
  }
    return (
      <View style={{ flex: 1  }}>
      <AnimatedScrollView scrollY={scrollY}> 
      <View>
        <HeaderImage  source={{uri:shop.headerBackground}}/>
        <ViewAbove>
          <RestaurantInfoCard>
            <RestaurantName>{shop.name}</RestaurantName>
            {isOpenCheck(shop.workingHours,shop.IstemporaryClose)}
            <RestaurantInfo>Working Hours: {WorkingHoursComponent(shop.workingHours)}</RestaurantInfo>
            {PrintGettingOrder(shop.takeOrder)}
            {wazeButton(shop.location,shop.address)}
          </RestaurantInfoCard>
        </ViewAbove>
      </View>
      {PrintMenu(menu,navigation)}
      </AnimatedScrollView>
      {PrintHeader(shop.icon,scrollY)}
      </View>   
    );
};