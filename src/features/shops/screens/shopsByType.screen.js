import React, { useEffect } from "react";
import { View } from "react-native";

import {
    printShops
} from "../components/shopsByType.screen.components"

export const ShopsByTypeScreen = ({ navigation,route  }) => {
    const { category,shops }= route.params;
    useEffect(() => {
        navigation.setOptions({ title: category }); // Set the title dynamically
      }, [category]);

    return (
        <View>
            {printShops(shops,navigation)} 
        </View>
    );
  };