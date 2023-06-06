import React from "react";
import { StatusBar,TouchableOpacity,SafeAreaView,FlatList } from "react-native";
import { IconButton } from "react-native-paper";

import { theme } from "../../../infrastructure/theme";
import { colors } from "../../../infrastructure/theme/colors";
import{ShopInfoCard} from "../components/ShopsScreen.compoent"
import{
    HeaderTitle,
} from './shopsByType.screen.style'


const HEADER_HEIGHT = theme.headerHeigth;

export const printShops= (shops,navigation) => {

    const renderShopCard = ({ item }) => (
        <TouchableOpacity onPress={() => navigation.navigate("ShopDetailsScreen", { shop: item })}>
          <ShopInfoCard shop={item} />
        </TouchableOpacity>
    );

    return (
        <FlatList
                data={shops}
                keyExtractor={(item) => item.shopUid}
                renderItem={renderShopCard}
                numColumns={3} // Set the number of columns to 3
                columnWrapperStyle={{ justifyContent: "space-between" }} // Adjust the spacing between columns
            />
    );
}

export const PrintHeader = (navigation, headerTitle) => {
    return (
        <SafeAreaView style={{ backgroundColor: colors.mainblue,height:HEADER_HEIGHT,justifyContent:'center',alignItems:'center' }}>
            <StatusBar
            barStyle="light-content"
            />
            <HeaderTitle>{headerTitle}</HeaderTitle>
            <IconButton
                icon="arrow-left"
                color="white"
                size={30}
                onPress={() => navigation.goBack()} 
                style={{position:'absolute',justifyContent:'center',alignSelf:'center',marginTop:HEADER_HEIGHT/2}}
                // onPress={() => navigation.navigate(city.cityName)} 
            />
        </SafeAreaView> 
    );
};