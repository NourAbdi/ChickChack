import React from "react";
import { StatusBar,TouchableOpacity,SafeAreaView,FlatList,View } from "react-native";
import Icons from "@expo/vector-icons/MaterialIcons";

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
        <SafeAreaView style={{ backgroundColor: colors.mainblue,height:HEADER_HEIGHT }}>
            <StatusBar
            barStyle="light-content"
            />
            <View style={{ flexDirection: 'row',alignItems:'center' }}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Icons
                        name="chevron-left"
                        color="white"
                        size={40}
                    />
                </TouchableOpacity>  
                <HeaderTitle style={{  textAlign: 'center' }}>{headerTitle}</HeaderTitle>
            </View>
            
        </SafeAreaView> 
    );
};