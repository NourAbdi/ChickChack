import React,{useState} from "react";
import { View } from "react-native";
import { Text } from "../../../components/typography/text.component";
import Icons from "@expo/vector-icons/MaterialIcons";

  import{
    MealCard,
    MealCardCover,
    Price,
    Info,
    MealShadow,
    CounterButton, 
    MealCardOverlay,
    UnavailableContainer,
    UnavailableText,
  } from "./meal-info-card.styles"

export const MealInfoCard = ({meal = {} ,updateItemAvailable, t}) => {
    const {
      itemName = "Some meal",
      itemPhoto = [
        "https://www.foodiesfeed.com/wp-content/uploads/2019/06/top-view-for-box-of-2-burgers-home-made-600x899.jpg",
      ],
      itemPrice=20,
      itemAvailability=true,
    } = meal; 
    const [isRemoveIcon, setIsRemoveIcon] = useState(itemAvailability);
    const handleButtonPress = () => {
      if(updateItemAvailable(meal.itemUid, !isRemoveIcon)){
        setIsRemoveIcon((prevState) => !prevState);
      }
    };
    return (
      <View>
        <MealShadow>
          <MealCard elevation={2}>
            <MealCardCover key={itemName} source={{ uri: itemPhoto }} />
            <Info>
              <Text variant="label">{itemName}</Text>
              <Price>{t("price")} : {itemPrice}₪</Price>
            </Info>
            {isRemoveIcon ? null: ( 
              <>
                <MealCardOverlay />
                <UnavailableContainer>
                  <UnavailableText>Meal not available</UnavailableText>
                </UnavailableContainer>
              </>
            )}
          </MealCard>
        </MealShadow>
        <CounterButton onPress={handleButtonPress}>
          <Icons name={isRemoveIcon ? 'remove' : 'add'} size={20} color="white" />
        </CounterButton>
      </View>
    );
  };
  