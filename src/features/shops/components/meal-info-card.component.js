import React from "react";
import { Text } from "../../../components/typography/text.component";
import { useTranslation } from "react-i18next";

import {
  MealCard,
  MealCardCover,
  Price,
  Info,
  MealShadow,
  MealCardOverlay,
  UnavailableText,
  UnavailableContainer,
} from "./meal-info-card.styles"

export const MealInfoCard = ({ meal = {} }) => {
  const { t } = useTranslation();

  const {
    itemName = "Some meal",
    itemPhoto = [
      "https://www.foodiesfeed.com/wp-content/uploads/2019/06/top-view-for-box-of-2-burgers-home-made-600x899.jpg",
    ],
    itemPrice = 20,
    itemAvailability=true,
  } = meal;
  return (
    <MealShadow>
      <MealCard elevation={2} >
        <MealCardCover source={{ uri: itemPhoto }} />
        <Info>
          <Text variant="label">{itemName}</Text>
          <Price>{t("price")}: {itemPrice}₪</Price>
        </Info>
        {itemAvailability ? null: ( 
          <>
            <MealCardOverlay />
            <UnavailableContainer>
              <UnavailableText>Meal not available</UnavailableText>
            </UnavailableContainer>
          </>
        )}
      </MealCard>
    </MealShadow>

  );
};
