import React from "react";
import { TouchableOpacity,Image,Linking,View,ScrollView } from "react-native";
import { useNavigation } from '@react-navigation/native';

import { colors } from "../../../infrastructure/theme/colors";

import { MealInfoCard } from "../components/meal-info-card.component";
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
    
  } from "../../../features/restaurants/components/restaurant-detail.screen.style";

const TAB_ICON = {
    Takeaway: "shopping-bag",
    Delivery: "motorcycle",
    DineIn: "cutlery",
};

export const openWaze = (location) => {
    const latitude = location["lat"];
    const longitude = location["lng"];
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
  
export const PrintDeliveryInfo = (deliveryInfo) => {
    return (
      <Center>
        <Row>
          <RestaurantInfo>
            Delivery Cost: {deliveryInfo["deliveryCost"]}  |  Delivery Time:  {deliveryInfo["timeToDeliver"]}
          </RestaurantInfo>
        </Row>
      </Center>
    );
};
  
export const WorkingHoursComponent = (workingHours) => {
    const currentDay = new Date().getDay();
    if(workingHours[currentDay].start){
      return (workingHours[currentDay].start+"-"+workingHours[currentDay]["end"]);
    }else{
      return ("No working hours available for today");
    }
};
  
export const isOpenCheck = (workingHours) => {
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

export const PrintMenu = (menu) => {
  const navigation = useNavigation();
  return(
    <ViewMenu>
      {(menu).map((menuCategory,index) => {
        const categoryName = Object.keys(menuCategory)[0];
        const menuItems = menuCategory[categoryName];
        return (
          <MealsCard key={index}>
            <View>
              <CategoryName>{categoryName}</CategoryName>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} >
                <CardView>
                  {menuItems.map((menuItem, subIndex) => (
                    <View key={subIndex}  >
                      <TouchableOpacity onPress={() => navigation.navigate("MealDetailScreen")}>
                        <MealInfoCard meal={menuItem} />
                      </TouchableOpacity>
                    </View>
                  ))}
                </CardView>
              </ScrollView>
            </View>
          </MealsCard>
        );
      })}
    </ViewMenu>
  );
};

