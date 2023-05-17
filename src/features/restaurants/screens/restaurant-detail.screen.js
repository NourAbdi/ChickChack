import React, { useState, useContext,useEffect } from "react";
import { ScrollView,View,ImageBackground,Dimensions,TouchableOpacity } from "react-native";
import { SafeArea } from "../../../components/utility/safe-area.component";


import { MealInfoCard } from "../components/meal-info-card.component";
import { Spacer } from "../../../components/spacer/spacer.component";
import { OrderButton } from "../components/restaurant-list.styles";
import star from "../../../../assets/star";
import { List, Divider } from "react-native-paper";



import { CartContext } from "../../../services/cart/cart.context";

import{
  MealsCard,
  CategoryName,
  InfoRestaurantCard,
  RestaurantInfo,

} from "../../../features/restaurants/components/restaurant-detail.screen.style";

import{
  wazeButton,
  PrintGettingOrder,
  PrintDeliveryInfo,
  WorkingHoursComponent,
  isOpenCheck,

}from "../../../features/restaurants/components/restaurant-detail.screen.components";



// *******************************************************************************************************************************

export const RestaurantDetailScreen = ({ navigation, route }) => {

  // useEffect(()=>{
  //   navigation.getParent().setOptions({tabBarStyle: { display: 'none' }});
  //   return()=>{
  //     navigation.getParent().setOptions({tabBarStyle: { display: 'flex' }});
  //   };
  // },[]);
  const [breakfastExpanded, setBreakfastExpanded] = useState(false);
  const [lunchExpanded, setLunchExpanded] = useState(false);
  const [dinnerExpanded, setDinnerExpanded] = useState(false);
  const [drinksExpanded, setDrinksExpanded] = useState(false);
  const { addToCart } = useContext(CartContext);

  const screenWidth = Dimensions.get('window').width;
  const { restaurant } = route.params;
  const todayWorkingHours=WorkingHoursComponent(restaurant["workingHours"]);
  const MARGIN =200;
  console.log(restaurant["DeliveryInfo"]);
  return (
    <SafeArea>
        <ScrollView >
          <View>
            <ImageBackground
              source={{ uri:"https://www.foodiesfeed.com/wp-content/uploads/2020/08/detail-of-pavlova-strawberry-piece-of-cake-600x800.jpg"}}
              style={{ width: screenWidth, height: 200 }} 
            ></ImageBackground>
            <View style={{ position: 'absolute', bottom: -MARGIN }}>
              <InfoRestaurantCard height={MARGIN+20}>
                <RestaurantInfo>{restaurant["name"]}</RestaurantInfo>
                {isOpenCheck(restaurant["workingHours"])}
                <RestaurantInfo>Working Hours: {todayWorkingHours}</RestaurantInfo>
                {PrintDeliveryInfo(restaurant["DeliveryInfo"])}
                {PrintGettingOrder(restaurant["takeOrder"])}
                {wazeButton(restaurant["geometry"]["location"],restaurant["address"])}
              </InfoRestaurantCard>
            </View>
          </View>
  
          <View style={{ marginTop:(MARGIN)}}>
          {(restaurant["menu"]).map((menuCategory,index) => {
            const categoryName = Object.keys(menuCategory)[0];
            const menuItems = menuCategory[categoryName];
            return (
              <MealsCard key={index}>
                <View >
                  <CategoryName>{categoryName}</CategoryName>
                  <ScrollView horizontal showsHorizontalScrollIndicator={false} >
                    <View style={{flexDirection: 'row'}}>
                      {menuItems.map((menuItem, subIndex) => (
                        <View key={subIndex} >
                          <TouchableOpacity onPress={() => navigation.navigate("MealDetailScreen")}>
                            <MealInfoCard meal={menuItem} />
                          </TouchableOpacity>
                        </View>
                      ))}
                    </View>
                  </ScrollView>
                </View>
              </MealsCard>
            );
          })}
          </View>
        </ScrollView>
    </SafeArea>
    
  );
};




