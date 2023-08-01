import React from "react";
import { StatusBar,TouchableOpacity,SafeAreaView,FlatList } from "react-native";
import Icons from "@expo/vector-icons/MaterialIcons";
import { useTranslation } from "react-i18next";

import { theme } from "../../../infrastructure/theme";
import { colors } from "../../../infrastructure/theme/colors";
import{ShopInfoCard} from "../components/ShopsScreen.compoent"
import{
    HeaderTitle,
    HeaderView,
    LeftHeaderButton,
    Flex,
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
    const { t } = useTranslation();
  
    return (
        <>
            <SafeAreaView style={{ backgroundColor: colors.mainblue, height: HEADER_HEIGHT }}>
                <StatusBar barStyle="light-content" />
            </SafeAreaView>
            <HeaderView>
                <LeftHeaderButton onPress={() => navigation.goBack()} >
                    <Icons name="arrow-back" color="white" size={25} />
                </LeftHeaderButton>
                <HeaderTitle>{t(headerTitle)}</HeaderTitle>
                <Flex />
            </HeaderView>
        </>
    );
  };
  