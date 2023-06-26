import React from "react";
import { View,TouchableOpacity,ScrollView,Image,Linking,SafeAreaView} from "react-native";
import { groupBy } from 'lodash';
import Icons from "@expo/vector-icons/MaterialIcons";
import { useTranslation } from "react-i18next";
import { colors } from "../../../infrastructure/theme/colors";
import { theme } from "../../../infrastructure/theme";
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
  HeaderView,
  LeftHeaderButton,
  RightHeaderButton,
} from "./shopDetails.styles";


const TAB_ICON = {
  TakeAway: "shopping-bag",
  Delivery: "motorcycle",
  DineIn: "cutlery",
};

const HEADER_HEIGHT = theme.headerHeigth;
 
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

export const PrintMenu = (menu,navigation,shop) => {
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
                    <TouchableOpacity onPress={() => navigation.navigate("OrderDetailsScreen", { shop, item })} >
                      <MealInfoCard meal={item} />
                    </TouchableOpacity>
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
    if(workingHours[currentDay].start && workingHours[currentDay].isOpen === "Yes"){
      return (workingHours[currentDay].start+"-"+workingHours[currentDay]["end"]);
    }else{
      return ("No working hours available for today");
    }
};

export const isOpenCheck = (workingHours,isTemporaryClose, t) => {
  
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
    const isOpen=todayWorkingHours.isOpen;
    startTime.setHours(startHour, startMinute);
    endTime.setHours(endHour, endMinute);
    // Compare the current time with the start and end time
    if (isOpen==="Yes" && currentTime >= startTime && currentTime <= endTime) {
      if(isTemporaryClose)
        return (<IsOpenCard backgroundColor={colors.mainblue}><IsOpenWord>{t("CLOSED TEMPORARY")}</IsOpenWord></IsOpenCard>);
      else
      return (<IsOpenCard backgroundColor={colors.button.green}><IsOpenWord>{t("open")}</IsOpenWord></IsOpenCard>);
    } else {
      return (<IsOpenCard backgroundColor={colors.button.red}><IsOpenWord>{t("closed")}</IsOpenWord></IsOpenCard>);
    }
  } else {
    return (<IsOpenCard backgroundColor={colors.button.red}><IsOpenWord>{t("closed")}</IsOpenWord></IsOpenCard>);
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
        <SafeAreaView style={{ position: 'absolute' }}>
          <HeaderView>
            <LeftHeaderButton onPress={() => navigation.goBack()} color="white">
              <Icons name="arrow-back" size={24} color="white" />
            </LeftHeaderButton>
            <RightHeaderButton onPress={() => navigation.navigate("Cart")} color="white">
              <Icons name="shopping-cart" size={24} color="white" />
            </RightHeaderButton>
          </HeaderView>
        </SafeAreaView>
        </AnimatedBackView>
      </>
    );
};

