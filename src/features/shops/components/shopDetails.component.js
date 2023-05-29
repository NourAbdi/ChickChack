import React from "react";
import { View,TouchableOpacity,ScrollView,Image,Linking} from "react-native";
import { groupBy } from 'lodash';
import { IconButton } from "react-native-paper";

import { colors } from "../../../infrastructure/theme/colors";
import { MealInfoCard } from "./meal-info-card.component";
import{
  RestaurantInfo,
  IsOpenCard,
  IsOpenWord,
  IconCard,
  Row,
  StyledIcon,
  CheckIcon,
  Center,
  ViewMenu,
  CategoryName,
  MealsCard,
  CardView,
  AnimatedHeaderView,
  AnimatedIconView,
  ShopIcon,
  AnimatedBackView,
} from "./shopDetails.styles";


const TAB_ICON = {
  TakeAway: "shopping-bag",
  Delivery: "motorcycle",
  DineIn: "cutlery",
};

const HEADER_HEIGHT = 100;
 
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

export const PrintMenu = (menu) => {
  // Group items by itemCategory
  const groupedItems = groupBy(menu, 'itemCategory');
  return (
    <ViewMenu>
      {Object.entries(groupedItems).map(([menuCategory, menuItems]) => {
        return (
          <MealsCard key={menuCategory}>
            <CategoryName>{menuCategory}</CategoryName>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <CardView>
                {menuItems.map((item) => (
                  <View key={item.itemUid}>
                    <MealInfoCard meal={item} />
                  </View>
                ))}
              </CardView>
            </ScrollView>
          </MealsCard>
        );
      })}
    </ViewMenu>
  );
};

export const openWaze = (location) => {
  const latitude = location["_latitude"];
  const longitude = location["_longitude"];
  // Open Waze with the specified location
  Linking.openURL(`https://waze.com/ul?ll=${latitude},${longitude}&navigate=yes`);
};

export const wazeButton = (location,address) => {
  return(
    <Center>
      <Row>
        <TouchableOpacity onPress={() =>openWaze(location)}>
          <Image
          source={require('../../../../assets/waze.png')}
          style={{width:35,height:35,borderRadius:17}}
          />
        </TouchableOpacity>
        <RestaurantInfo>{address}</RestaurantInfo>
      </Row>
    </Center>
   );
};

export const PrintGettingOrder = (takeOrder) => {
  return (
    <Center>
      <Row>
        {Object.entries(takeOrder).map(([key, value]) => {
          const iconName = TAB_ICON[key];
          return (
            <Row key={key}>
              <Row>
                <IconCard>
                    <StyledIcon name={iconName} />
                </IconCard>
                {value ? (<CheckIcon name="check"  color={colors.button.green} />):(<CheckIcon name="close"  color={colors.button.red} />) }            
              </Row>
            </Row>
          );
        })}
      </Row>
    </Center>
  );
};

export const WorkingHoursComponent = (workingHours) => {
  const options = { weekday: 'long' };
  const currentDay = new Intl.DateTimeFormat('en-US', options).format(new Date());
    if(workingHours[currentDay].start){
      return (workingHours[currentDay].start+"-"+workingHours[currentDay]["end"]);
    }else{
      return ("No working hours available for today");
    }
};

export const isOpenCheck = (workingHours,isOpen) => {
  const options = { weekday: 'long' };
  const currentDay = new Intl.DateTimeFormat('en-US', options).format(new Date());
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
      if(isOpen)
        return (<IsOpenCard backgroundColor={colors.button.green}><IsOpenWord>OPEN</IsOpenWord></IsOpenCard>);
      else
      return (<IsOpenCard backgroundColor={colors.mainblue}><IsOpenWord>CLOSED TEMPORARY</IsOpenWord></IsOpenCard>);
    } else {
      return (<IsOpenCard backgroundColor={colors.button.red}><IsOpenWord>CLOSE</IsOpenWord></IsOpenCard>);
    }
  } else {
    return (<IsOpenCard backgroundColor={colors.button.red}><IsOpenWord>CLOSE</IsOpenWord></IsOpenCard>);
  }
};

export const PrintHeader = (icon,scrollY,navigation) => {
    return(
        <>
            <AnimatedHeaderView style={{ opacity: titleOpacity(scrollY), transform: [{ translateY: headerTranslate(scrollY) }] }} />
            <AnimatedIconView style={[{ opacity: titleOpacity(scrollY), transform: [{ scale: titleScale(scrollY) }, { translateY: titleTranslate(scrollY) }] }]}>
                <ShopIcon source={{ uri: icon }} />
            </AnimatedIconView>
            <AnimatedBackView style={[{ transform: [{ translateY: titleTranslate(scrollY) }] }]}>
                <IconButton
                    icon="arrow-left"
                    color="white"
                    size={30}
                    onPress={() => navigation.goBack()} />
            </AnimatedBackView>
        </>
    );
};
