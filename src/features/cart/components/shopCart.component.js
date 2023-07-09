import React, { useContext, useState, useEffect } from "react";
import { TouchableOpacity,View } from "react-native";
import Icons from "@expo/vector-icons/MaterialIcons";

import { colors } from "../../../infrastructure/theme/colors";
import { 
    ViewCounter,
    CounterButton,
    Count,
} from "../components/shopCart.styles";
  
const increaseQuantity = (shop, item,additions,addToCart) => {
    addToCart(shop, item, 1,additions);
};

const decreaseQuantity = (shop, item,additions,addToCart) => {
    addToCart(shop, item, -1,additions);
};

export const printButtons = (shop,item,additions,quantity,addToCart,removeFromCart) => {
    return (
        <View style={{marginRight:5}}>
            <TouchableOpacity onPress={() => removeFromCart(shop, item, additions)} style={{ alignSelf:'flex-end'}}>
                <Icons name="delete" size={25} color={colors.text.error} />
            </TouchableOpacity>
            <View style={{flex:1}}/>
            <ViewCounter>
                <CounterButton onPress={() => decreaseQuantity(shop, item, additions, addToCart)}>
                    <Icons name="remove" size={20} color='black' />
                </CounterButton>
                <Count>{quantity}</Count>
                <CounterButton onPress={() => increaseQuantity(shop, item, additions, addToCart)}>
                    <Icons name="add" size={20} color='black' />
                </CounterButton>
            </ViewCounter>
        </View>
    );
}

export const singleOrderPrice = (itemPrice,additions,quantity) => {
    additionsPrice =  Object.values(additions).reduce((sum, price) => sum + price, 0);
    return (itemPrice + additionsPrice) * quantity;
}

export const isOpenCheck = (workingHours,isTemporaryClose) => {
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
      if (isOpen && currentTime >= startTime && currentTime <= endTime) {
        if(isTemporaryClose)
          return false;
        else
        return true;
      } else {
        return false;
    }
    } else {
        return false;
    }
  };