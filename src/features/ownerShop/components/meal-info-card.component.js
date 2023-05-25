import React from "react";
import { View } from "react-native";
import { Text } from "../../../components/typography/text.component";

  import{
    MealCard,
    MealCardCover,
    Price,
    Info,
    MealShadow, 
  } from "./meal-info-card.styles"

export const MealInfoCard = ({meal = {} }) => {
    const {
      itemName = "Some meal",
      itemPhoto = [
        "https://www.foodiesfeed.com/wp-content/uploads/2019/06/top-view-for-box-of-2-burgers-home-made-600x899.jpg",
      ],
      itemPrice=20,
      // itemAddition=false,
    } = meal; 
    return (
      <MealShadow>
      <MealCard elevation={2} >
        <View>
          <MealCardCover key={itemName} source={{ uri:itemPhoto }} />
        </View>
        <Info>
            <Text variant="label">{itemName}</Text>
            <Price>price: {itemPrice}₪</Price>
        </Info>
      </MealCard>
      </MealShadow>
    );
  };
  