import React, { useState, useContext } from "react";
import { ScrollView,View,Image,ImageBackground,Text,Dimensions } from "react-native";
import { List, Divider } from "react-native-paper";

import { Spacer } from "../../../components/spacer/spacer.component";
import { RestaurantInfoCard } from "../components/restaurant-info-card.component";
import { MealInfoCard } from "../components/meal-info-card.component";

import { SafeArea } from "../../../components/utility/safe-area.component";
import { OrderButton } from "../components/restaurant-list.styles";
import { CartContext } from "../../../services/cart/cart.context";


export const RestaurantDetailScreen = ({ navigation, route }) => {
  const [breakfastExpanded, setBreakfastExpanded] = useState(false);
  const [lunchExpanded, setLunchExpanded] = useState(false);
  const [dinnerExpanded, setDinnerExpanded] = useState(false);
  const [drinksExpanded, setDrinksExpanded] = useState(false);
  const { addToCart } = useContext(CartContext);

  const screenWidth = Dimensions.get('window').width;
  const { restaurant } = route.params;
  
  return (
    
    <SafeArea>
        <ScrollView >
          <View>
          <ImageBackground
            source={{ uri:"https://www.foodiesfeed.com/wp-content/uploads/2020/08/detail-of-pavlova-strawberry-piece-of-cake-600x800.jpg"}}
            style={{ width: screenWidth, height: 200 }} 
          ></ImageBackground>
          </View>
          {(restaurant["menu"]).map((menuCategory) => {
            const categoryName = Object.keys(menuCategory)[0];
            const menuItems = menuCategory[categoryName];
            return (
              <View key={categoryName}>
                <Text>{categoryName}</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} >
                  <View style={{flexDirection: 'row'}}>
                    {menuItems.map((menuItem, index) => (
                      <View key={index} >
                        <MealInfoCard meal={menuItem} />
                      </View>
                    ))}
                  </View>
                </ScrollView>
              </View>
            );
          })}
        </ScrollView>
    </SafeArea>
    
  );
};




