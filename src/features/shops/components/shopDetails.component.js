import React,{useState} from "react";
import { View,TouchableOpacity,Image,Linking,Text,Alert } from "react-native";
import { groupBy } from 'lodash';
import Icons from "@expo/vector-icons/MaterialIcons";

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
  RowCenter,
  ReadMoreView,
  ReadMoreButton,
  ReadMoreText,
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

export const PrintMenu = ({ menu, navigation, shop }) => {
  const [showAllItems, setShowAllItems] = useState(false);
  const groupedItems = groupBy(menu, 'itemCategory');

  const toggleShowAllItems = () => {
    setShowAllItems(!showAllItems);
  };

  const renderMenuItem = ( item ) => {
    return(item.itemAvailability ? (
      <TouchableOpacity onPress={() => navigation.navigate("OrderDetailsScreen", { shop, item })}>
        <MealInfoCard meal={item} />
      </TouchableOpacity>
    ) : (
      <TouchableOpacity onPress={() =>null}>
        <MealInfoCard meal={item} />
      </TouchableOpacity>
    ));
  };

  const renderMenuItems = (displayedItems) => {
    const renderedItems = [];
    for (let i = 0; i < displayedItems.length; i += 2) {
      const item1 = displayedItems[i];
      const item2 = displayedItems[i + 1];

      const row = (
        <View key={i} style={{ flexDirection: 'row' }}>
          { item1 &&  renderMenuItem(item1)}
          { item2 &&  renderMenuItem(item2)}
        </View>
      );
      renderedItems.push(row);
    }
    return renderedItems;
  };

  return (
    <ViewMenu>
      {Object.entries(groupedItems).map(([menuCategory, menuItems]) => {
        const displayedItems = showAllItems ? menuItems : menuItems.slice(0, 2);
        return (
          <MealsCard key={menuCategory}>
            <CategoryName>{menuCategory}</CategoryName>
            <CardView>
              {renderMenuItems(displayedItems)}
            </CardView>
            {menuItems.length > 2 && (
              <ReadMoreView>
                <ReadMoreButton onPress={toggleShowAllItems}>
                  <ReadMoreText>
                    {showAllItems ? 'Read Less' : 'Read More'}
                  </ReadMoreText>
                </ReadMoreButton>
              </ReadMoreView>
            )}
          </MealsCard>
        );
      })}
    </ViewMenu>
  );
};

export const openWaze = (location) => {
  const latitude = location.latitude;
  const longitude = location.longitude;
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

export const WorkingHoursComponent = ({ workingHours, t }) => {
  const options = { weekday: "long" };
  const currentDay = new Intl.DateTimeFormat("en-US", options).format(new Date());
  let data = "";

  const handleShowAlert = () => {
    const days = Object.keys(workingHours);
    const sortedDays = days.sort((a, b) => {
      const dayOrder = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
      return dayOrder.indexOf(a) - dayOrder.indexOf(b);
    });
  
    const allHours = sortedDays
      .map((day) => {
        const { start, end, isOpen } = workingHours[day];
        const hours = isOpen ? `${start} - ${end}` : t("closed");
        return `${t(day)}: ${hours}`;
      })
      .join("\n");
  
    Alert.alert(t("workingHours"), allHours);
  };

  if (workingHours[currentDay].start && workingHours[currentDay].isOpen) {
    data = `${t("workingHours")}: ${workingHours[currentDay].start} - ${workingHours[currentDay].end}`;
  } else {
    data = `${t("workingHours")}: ${t("No working hours available for today")}`;
  }
  
  return (
    <TouchableOpacity onPress={handleShowAlert}>
      <RowCenter>
        <RestaurantInfo>{data}</RestaurantInfo>
        <Icons name="add-circle-outline" size={20} color="black" />
      </RowCenter>
    </TouchableOpacity>
  );
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
    if (isOpen  && currentTime >= startTime && currentTime <= endTime) {
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
        <HeaderView>
          <LeftHeaderButton onPress={() => navigation.goBack()} color="white">
            <Icons name="arrow-back" size={25} color="white" />
          </LeftHeaderButton>
          <RightHeaderButton onPress={() => navigation.navigate("Cart")} color="white">
            <Icons name="shopping-cart" size={25} color="white" />
          </RightHeaderButton>
        </HeaderView>
      </>
    );
};

