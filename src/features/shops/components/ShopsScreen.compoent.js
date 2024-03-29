import React from "react";
import { View, StatusBar, Image, TouchableOpacity, ScrollView, SafeAreaView } from "react-native";
import Swiper from 'react-native-swiper';
import { groupBy } from 'lodash';
import { useTranslation } from "react-i18next";
import { Text } from "../../../components/typography/text.component";

import { colors } from "../../../infrastructure/theme/colors";

import {
  titleOpacity,
  titleScale,
  titleTranslate,
  headerTranslate,
  isOpenCheck,
} from "./shopDetails.component"

import {
  ShopTypeCard,
  TypeImage,
  ShopsCard,
  ShopCard,
  LogoImage,
  MealShadow,
  CategoryName,
  Info,
  AnimatedTitleView,
  AnimatedHeaderView,
  HeaderTitle,
  AnimatedHederIcon,
  StyledIcon,
} from './ShopsScreen.styles'

const shopsTypeImage = [
  { id: "grocery", image: require('../../../../assets/grocery.png') },
  { id: "restaurant", image: require('../../../../assets/restaurant.png') },
  { id: "pharmacy", image: require('../../../../assets/pharmacy.png') },
];

export const StatusBarPlaceHolder = () => {
  return (
    <SafeAreaView style={{ backgroundColor: colors.mainblue }}>
      <StatusBar
        barStyle="light-content"
      />
    </SafeAreaView>
  );
}

export const PrintHeader = (scrollY, headerTitle) => {
  return (
    <>
      <AnimatedHeaderView style={{ opacity: titleOpacity(scrollY), transform: [{ translateY: headerTranslate(scrollY) }] }} />
      <AnimatedTitleView style={[{ opacity: titleOpacity(scrollY), transform: [{ scale: titleScale(scrollY) }, { translateY: titleTranslate(scrollY) }] }]}>
        <HeaderTitle>{headerTitle}</HeaderTitle>
      </AnimatedTitleView>
      {/* <AnimatedHederIcon>
        <StyledIcon
          name={"search"}
          size={30}
          color="white"
          onPress={() => navigation.goBack()}
        />
      </AnimatedHederIcon> */}
    </>
  );
};

export const PrintSwiper = (photos) => {
  return (
    <View style={{ height: 250 }}>
      <Swiper autoplay={true}>
        {photos.map((photo, index) => (
          <View key={index}>
            <Image source={{ uri: photo }} style={{ width: '100%', height: '100%' }} />
          </View>
        ))}
      </Swiper>
    </View>
  );
};

export const ShopTypeSelector = ({ shops,shopsCategories, navigation }) => {
  const { t } = useTranslation();
  const shopCategoryId = [...new Set(shops ? shops.flatMap(shop => shop.shopCategory) : [])];
  const groupedShops = groupBy(shops, 'shopCategory');
  const handleCategoryPress = (category, shops) => {
    navigation.navigate("ShopsByTypeScreen", { category, shops });
  };

  const renderCategoryButton = (categoryId) => {
    const shopCategory = shopsCategories.find((category) => category.categoryId === categoryId);
    return (
      <TouchableOpacity
        key={shopCategory.categoryId}
        onPress={() => handleCategoryPress(shopCategory.categoryName, groupedShops[categoryId])}
      >
        <ShopTypeCard>
          <View style={{ alignItems: 'center' }}>
            <TypeImage source={{uri:shopCategory.categoryPhoto}} />
            <Text>{t(shopCategory.categoryName)}</Text>
          </View>
        </ShopTypeCard>
      </TouchableOpacity>
    );
  };

  return (
    <View>
      <ScrollView horizontal={true}>
        {shopCategoryId.map((categoryId) => renderCategoryButton(categoryId))}
      </ScrollView>
    </View>
  );
};

export const PrintShops = (shops, navigation, t) => {
  const groupedItems = groupBy(shops, 'type');
  return (
    <>
      {Object.entries(groupedItems).map(([shopCategory, shops]) => {
        return (
          <ShopsCard key={shopCategory}>
            <CategoryName>{t(shopCategory)}</CategoryName>
            <ScrollView horizontal={true}>
              {shops.map((shop) => (
                <View key={shop.shopUid}>
                  <TouchableOpacity onPress={() => navigation.navigate("ShopDetailsScreen", { shop: shop, })}>
                    <ShopInfoCard shop={shop} />
                  </TouchableOpacity>
                </View>
              ))}
            </ScrollView>
          </ShopsCard>
        );
      })}
    </>
  );
};

export const ShopInfoCard = ({ shop }) => {
  const { t } = useTranslation();
  return (
    <MealShadow>
      <ShopCard elevation={2} >
        <View>
          <LogoImage source={{ uri: shop.icon }} />
        </View>
        <Info>
          <Text>{shop.name}</Text>
          {isOpenCheck(shop.workingHours, shop.isTemporaryClose, t)}
        </Info>
      </ShopCard>
    </MealShadow>
  );
};