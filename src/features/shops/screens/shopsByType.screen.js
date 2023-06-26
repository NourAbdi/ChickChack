import React, { useEffect } from "react";
import { View } from "react-native";

import {
    printShops,
    PrintHeader,
} from "../components/shopsByType.screen.components"

export const ShopsByTypeScreen = ({ navigation,route  }) => {
    const { category,shops }= route.params;
    useEffect(() => {
        navigation.setOptions({ title: category }); 
      }, [category]);

    return (
        <View>
            {PrintHeader(navigation,category)}
            {printShops(shops,navigation)} 
        </View>
    );
  };