import React, { useEffect,useContext,useState } from "react";
import { View } from "react-native";

import { ShopsContext } from "../../../services/shops/shops.context";
import {
    printShops,
    PrintHeader,
} from "../components/shopsByType.screen.components"

export const ShopsByTypeScreen = ({ navigation,route  }) => {
    const { category }= route.params;
    const { shops } = useContext(ShopsContext);
    const [filteredShops, setFilteredShops] = useState([]);

    useEffect(() => {
        if (shops) {
          const filteredShops = shops.filter((shop) => shop.shopCategory.includes(category.categoryId));
          setFilteredShops(filteredShops);
        }
      }, [category, shops]);
    
    return (
        <View>
            {PrintHeader(navigation,category.categoryName)}
            {printShops(filteredShops,navigation)} 
        </View>
    );
  };