import React, { useState, useContext } from "react";
import { ScrollView,View,ImageBackground,Text,Dimensions } from "react-native";
import { List, Divider } from "react-native-paper";

import { Spacer } from "../../../components/spacer/spacer.component";
import { OrderButton } from "../components/restaurant-list.styles";
import star from "../../../../assets/star";
import { MealInfoCard } from "../components/meal-info-card.component";
import { colors } from "../../../infrastructure/theme/colors";
import {FontAwesome } from "@expo/vector-icons";


import { SafeArea } from "../../../components/utility/safe-area.component";

import { CartContext } from "../../../services/cart/cart.context";

import{
  MealsCard,
  MealName,
  InfoRestaurantCard,
  RestaurantInfo,
  IsOpenCard,
  IsOpenWord,
  IconCard,
  Row,
  StyledIcon,
  CheckIcon,
  Center,
 
  
} from "../../../features/restaurants/components/meal-info-card.styles";


const TAB_ICON = {
  Takeaway: "shopping-bag",
  Delivery: "motorcycle",
  DineIn: "cutlery",
};  
const PrintGettingOrder = (takeOrder) => {
  return (
    <Center>
      <Row>
        {Object.entries(takeOrder).map(([key, value]) => {
          const iconName = TAB_ICON[key];
          return (
            <Row key={key}>
              <Row>
              <IconCard><StyledIcon  name={iconName} /></IconCard>
              {value ? (<CheckIcon name="check"  color={colors.button.green} />):(<CheckIcon name="close"  color={colors.button.red} />) }            
              </Row>
            </Row>
          );
        })}
      </Row>
    </Center>
  );
};

const PrintDeliveryInfo = (deliveryInfo) => {
  return (
    <Center>
      <Row>
        <RestaurantInfo>
          Delivery Cost: {deliveryInfo["deliveryCost"]}  | Delivery Time:  {deliveryInfo["timeToDeliver"]}
        </RestaurantInfo>
      </Row>
    </Center>
  );
};

 const WorkingHoursComponent = (workingHours) => {
  const currentDay = new Date().getDay();
  if(workingHours[currentDay].start){
    return (workingHours[currentDay].start+"-"+workingHours[currentDay]["end"]);
  }else{
    return ("No working hours available for today");
  }
};

const isOpenCheck = (workingHours) => {
  const currentDay = new Date().getDay();

  // Get the working hours for the current day
  const todayWorkingHours = workingHours[currentDay];

  // Check if the restaurant is open based on the working hours
  if (todayWorkingHours.start && todayWorkingHours.end) {
    const currentTime = new Date();
    const startTime = new Date();
    const endTime = new Date();

    // Set the start and end time for today's working hours
    const [startHour, startMinute] = todayWorkingHours.start.split(":");
    const [endHour, endMinute] = todayWorkingHours.end.split(":");
    startTime.setHours(startHour, startMinute);
    endTime.setHours(endHour, endMinute);

    // Compare the current time with the start and end time
    if (currentTime >= startTime && currentTime <= endTime) {
      return (<IsOpenCard backgroundColor={colors.button.green}><IsOpenWord>OPEN</IsOpenWord></IsOpenCard>);
    } else {
      return (<IsOpenCard backgroundColor={colors.button.red}><IsOpenWord>CLOSE</IsOpenWord></IsOpenCard>);
    }
  } else {
    return (<IsOpenCard backgroundColor={colors.button.red}><IsOpenWord>CLOSE</IsOpenWord></IsOpenCard>);
  }
};

// *******************************************************************************************************************************

export const RestaurantDetailScreen = ({ navigation, route }) => {
  const [breakfastExpanded, setBreakfastExpanded] = useState(false);
  const [lunchExpanded, setLunchExpanded] = useState(false);
  const [dinnerExpanded, setDinnerExpanded] = useState(false);
  const [drinksExpanded, setDrinksExpanded] = useState(false);
  const { addToCart } = useContext(CartContext);

  const screenWidth = Dimensions.get('window').width;
  const { restaurant } = route.params;
  const todayWorkingHours=WorkingHoursComponent(restaurant["workingHours"]);
  const MARGIN =170;
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
                <MealName>{categoryName}</MealName>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} >
                  <View style={{flexDirection: 'row'}}>
                    {menuItems.map((menuItem, subIndex) => (
                      <View key={subIndex} >
                        <MealInfoCard meal={menuItem} />
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




