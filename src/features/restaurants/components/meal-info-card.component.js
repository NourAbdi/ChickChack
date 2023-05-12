import React from "react";
import { View } from "react-native";

import { Spacer } from "../../../components/spacer/spacer.component";
import { Text } from "../../../components/typography/text.component";


  import{
    MealCard,
    MealCardCover,
    Price,
    Info 
  } from "./meal-info-card.styles"

export const MealInfoCard = ({ meal = {} }) => {
    const {
      name = "Some meal",
      photos = [
        "https://www.foodiesfeed.com/wp-content/uploads/2019/06/top-view-for-box-of-2-burgers-home-made-600x899.jpg",
      ],
      price=20,
    } = meal; 
    return (
      <MealCard elevation={2}>
        <View>
          <MealCardCover key={name} source={{ uri: "https://www.foodiesfeed.com/wp-content/uploads/2019/06/top-view-for-box-of-2-burgers-home-made-600x899.jpg" }} />
        </View>
        <Info>
            <Text variant="label">{name}</Text>
            <Price>price: {price} shekel</Price>
        </Info>
      </MealCard>
    );
  };
  