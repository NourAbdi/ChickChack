import React, {useContext} from "react";
import { 
  View,
} from "react-native";

import star from "../../../../assets/star";
import { List, Divider,IconButton } from "react-native-paper";
import { Spacer } from "../../../components/spacer/spacer.component";
import { OrderButton } from "../components/restaurant-list.styles";

import { CartContext } from "../../../services/cart/cart.context";

import{
  InfoRestaurantCard,
  RestaurantInfo,
  HeaderImage,
  ViewAbove,
  StyledScrollView,
  StyledIconButton,
} from "../../../features/restaurants/components/restaurant-detail.screen.style";

import{
  wazeButton,
  PrintGettingOrder,
  PrintDeliveryInfo,
  WorkingHoursComponent,
  isOpenCheck,
  PrintMenu,

}from "../../../features/restaurants/components/restaurant-detail.screen.components";

// *******************************************************************************************************************************

export const RestaurantDetailScreen = ({navigation,route}) => {
  const { addToCart } = useContext(CartContext);
  const { restaurant } = route.params;
  const todayWorkingHours=WorkingHoursComponent(restaurant["workingHours"]);
  console.log(restaurant["DeliveryInfo"]);
  return (
    <StyledScrollView >
      <View>
        <HeaderImage
          source={{ uri:"https://www.foodiesfeed.com/wp-content/uploads/2020/08/detail-of-pavlova-strawberry-piece-of-cake-600x800.jpg"}}
        ></HeaderImage>
        <StyledIconButton
              icon="arrow-left"
              color="white"
              size={30}
              onPress={() => navigation.goBack()}
            />
        <ViewAbove>
          <InfoRestaurantCard>
            <RestaurantInfo>{restaurant["name"]}</RestaurantInfo>
            {isOpenCheck(restaurant["workingHours"])}
            <RestaurantInfo>Working Hours: {todayWorkingHours}</RestaurantInfo>
            {PrintDeliveryInfo(restaurant["DeliveryInfo"])}
            {PrintGettingOrder(restaurant["takeOrder"])}
            {wazeButton(restaurant["geometry"]["location"],restaurant["address"])}
          </InfoRestaurantCard>
        </ViewAbove>
      </View>
      {PrintMenu(restaurant["menu"])}
    </StyledScrollView>
  );
};




