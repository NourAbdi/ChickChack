// ShopsScreen.js
import React, { useContext } from "react";
import { TouchableOpacity, View, FlatList, Image } from "react-native";
import { Text } from "../../../components/typography/text.component";
import { SafeArea } from "../../../components/utility/safe-area.component";
import { Colors } from "react-native-paper";
import { FadeInView } from "../../../components/animations/fade.animation";

import { ShopsContext } from "../../../services/shops/shops.context";
import {
  Loading,
  LoadingContainer,
  ShopItemContainer,
  ShopImage,
  ShopNameContainer,
  ShopNameText,
} from "../components/ShopsScreen.styles";

export const ShopsScreen = ({ navigation }) => {
  const { isLoading, shops } = useContext(ShopsContext);

  if (isLoading) {
    return (
      <LoadingContainer>
        <Loading size={50} animating={true} color={Colors.blue300} />
      </LoadingContainer>
    );
  }

  if (!isLoading && (shops && shops.length === 0)) {
    return (
      <SafeArea>
        <Text>No shops available</Text>
      </SafeArea>
    );
  }

  const renderShopItem = ({ item }) => (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("ShopDetailsScreen", {
          shop: item,
        })
      }
    >
      <ShopItemContainer>
        <FadeInView>
          <ShopImage source={{ uri: item.headerBackground }} />
          <ShopNameContainer>
            <Image source={{ uri: item.icon }} style={{ width: 24, height: 24, marginRight: 8 }} />
            <ShopNameText>{item.name}</ShopNameText>
          </ShopNameContainer>
        </FadeInView>
      </ShopItemContainer>
    </TouchableOpacity>
  );

  const renderShopSubject = (subjectType) => {
    return (
      <View>
        <Text variant="caption" style={{ marginVertical: 8 }}>
          {subjectType}
        </Text>
        <View style={{ borderBottomWidth: 1, borderBottomColor: "lightgray" }} />
      </View>
    );
  };

  const groupShopsByType = (shops) => {
    const groupedShops = {};
    shops.forEach((shop) => {
      if (groupedShops[shop.type]) {
        groupedShops[shop.type].push(shop);
      } else {
        groupedShops[shop.type] = [shop];
      }
    });
    return groupedShops;
  };

  const groupedShops = groupShopsByType(shops);

  const renderItem = ({ item }) => {
    const [subjectType, shops] = item;
    return (
      <View>
        {renderShopSubject(subjectType)}
        <FlatList
          data={shops}
          keyExtractor={(item) => item.shopUid}
          numColumns={2}
          renderItem={renderShopItem}
          ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
          columnWrapperStyle={{
            justifyContent: "space-between",
            marginBottom: 8,
          }}
        />
      </View>
    );
  };

  return (
    <SafeArea>
      <FlatList
        data={Object.entries(groupedShops)}
        keyExtractor={(item) => item[0]}
        contentContainerStyle={{ padding: 8 }}
        renderItem={renderItem}
      />
    </SafeArea>
  );
};