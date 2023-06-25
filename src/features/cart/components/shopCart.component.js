import React, { useContext, useState, useEffect } from "react";
import Icons from "@expo/vector-icons/MaterialIcons";


import { 
    styles,
    Title, 
    ViewItem,
    Row,
    LeftIcon,
    ShopIcon,
    ItemCard,
    ItemImage,
    ItemName,
    Info,
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

export const printButtons = (shop,item,additions,quantity,addToCart) => {
    return (
        <ViewCounter>
            <CounterButton onPress={() => decreaseQuantity(shop,item,additions,addToCart)}>
                <Icons name="remove" size={20} color='black' />
            </CounterButton>
            <Count>{quantity}</Count>
            <CounterButton onPress={() => increaseQuantity(shop,item,additions,addToCart)}>
                <Icons name="add" size={20} color='black' />
            </CounterButton>
        </ViewCounter>
    );
}

export const singleOrderPrice = (itemPrice,additions,quantity) => {
    additionsPrice =  Object.values(additions).reduce((sum, price) => sum + price, 0);
    return (itemPrice + additionsPrice) * quantity;
}
