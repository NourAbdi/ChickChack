// ShopDetailsScreen.js
import React, { useContext, useEffect } from "react";
import { ScrollView, View, Image } from "react-native";
import { Text } from "../../../components/typography/text.component";
import { SafeArea } from "../../../components/utility/safe-area.component";

import { ShopContext } from "../../../services/shop/shop.context";
import { CartContext } from "../../../services/cart/cart.context";
import { getShopMenuByShopUid } from "../../../services/shop/shop.service";
import { ShopDetailsContainer, ShopHeaderBackground, ShopName } from "../components/shopDetails.styles";

export const ShopDetailsScreen = ({ route }) => {
  const { shop } = route.params;
  const { menu, setMenu } = useContext(ShopContext);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    console.log("ShopDetailsScreen, shop changed:", shop);
    getShopMenuByShopUid(shop.shopUid); // Fetch menu data when the shop changes
  }, [shop]);

  return (
    <ScrollView style={{ flex: 1 }}>
      <ShopHeaderBackground source={{ uri: shop.headerBackground }}></ShopHeaderBackground>
      <SafeArea>
        <ShopDetailsContainer>
          <View>
            <ShopName>{shop.name}</ShopName>
            <Image
              source={{ uri: shop.icon }}
              style={{ width: 100, height: 100, borderRadius: 8, marginBottom: 16 }}
            />
          </View>
          {/* Render the menu */}
          <View>
            {menu.map((menuItem) => (
              <Text key={menuItem.itemId}>{menuItem.name}</Text>
              // Add other menu item details here
            ))}
          </View>
        </ShopDetailsContainer>
      </SafeArea>
    </ScrollView>
  );
};