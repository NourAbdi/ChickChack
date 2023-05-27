import React, { useContext, useState } from "react";
import { View, Text, ImageBackground, StyleSheet, TouchableOpacity, Image } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { SafeArea } from "../../../components/utility/safe-area.component";

import { OwnerShopContext } from "../../../services/ownerShop/ownerShop.context";

export const ShopDetailsScreen = () => {
    const { shop, menu, isLoading } = useContext(OwnerShopContext);

    if (isLoading) {
        // If shop details are not yet fetched, you can show a loading indicator
        return <Text>Loading...</Text>;
    }
    
    console.log("shopshopshopshopshopshopshopshopshopshopshopshop:", shop);
    console.log("menumenumenumenumenumenumenumenumenumenumenumenu:", menu);

    return (
        // <ImageBackground source={{ uri: shop.headerBackground }}style={styles.image}></ImageBackground>
        <SafeArea>
            <ScrollView>
                <View>
                    
                </View>
            </ScrollView>
        </SafeArea>
    );
};
