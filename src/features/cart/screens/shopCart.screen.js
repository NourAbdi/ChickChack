import React, { useContext, useState, useEffect } from "react";
import { View, Text, Button, Alert, ScrollView, TouchableOpacity } from "react-native";
import { SafeArea } from "../../../components/utility/safe-area.component";
import { useNavigation } from "@react-navigation/native";

import { CartContext } from "../../../services/cart/cart.context";
import {
  Title,
  Row,
  LeftIcon,
  ShopIcon,
  ItemCard,
  ItemImage,
  ItemName,
  Info,
  Price,
  CheckOutButton,
  CheckOutText,
  SummaryInfo,
  AvailableOptionsText,
  AvailableOptionsButton,
  Flex,
  TotalContainer,
  ShopOptionsContainer,
  Error,
} from "../components/shopCart.styles";

import {
  printButtons,
  singleOrderPrice,
  isOpenCheck,
} from "../components/shopCart.component";
import { useTranslation } from "react-i18next";

export const ShopCart = ({ route }) => {
  const { t } = useTranslation();
  const { order, addToCart, removeFromCart, clearCart, checkout, totalPrice, shopLengthCheck, calculateTotalPrice } = useContext(CartContext);
  const [availableOptions, setAvailableOptions] = useState([]);
  const navigation = useNavigation();
  const { desiredShopUid, shopWorkingHours, isTemporaryClose } = route.params;
  const shopOrder = order.find(order => order.shop.shopUid === desiredShopUid);
  useEffect(() => {
    getAvailableOptions();
  }, [order]);

  const getAvailableOptions = () => {
    const options = order.map((orderShop) => {
      const shop = orderShop.shop;
      const availableOptions = [];
      if (shop.takeOrder.Delivery) {
        availableOptions.push("Delivery");
      }
      if (shop.takeOrder.DineIn) {
        availableOptions.push("DineIn");
      }
      if (shop.takeOrder.TakeAway) {
        availableOptions.push("TakeAway");
      }
      return {
        shopUid: shop.shopUid,
        options: availableOptions,
        selectedOption: null,
      };
    });
    setAvailableOptions(options);
  };

  const selectOption = (shopUid, selectedOption) => {
    setAvailableOptions((prevOptions) =>
      prevOptions.map((option) => {
        if (option.shopUid === shopUid) {
          return {
            ...option,
            selectedOption: selectedOption,
          };
        }
        return option;
      })
    );
  };

  const takePaymentInstrument = () => {
    return "Cash";
  };

  const checkAvailability = (items) => {
    for (let i = 0; i < items.length; i++) {
      if (!items[i].item.itemAvailability) {
        return false;
      }
    }
    return true;
  }

  const handleCheckout = () => {
    // Check if any options are not selected for a shop
    const shopOption = availableOptions.find(item => item.shopUid === desiredShopUid);
    if (!shopOption || !shopOption.selectedOption) {
      Alert.alert(
        "Warning",
        "Please select an orderDeliveryOption.",
        [{ text: "OK" }]
      );
      return;
    }
    if (isOpenCheck(shopWorkingHours, isTemporaryClose)) {
      if(checkAvailability(shopOrder.cartItems)){
        console.log("selectedOption: ", availableOptions[0]?.selectedOption);
        if (availableOptions[0]?.selectedOption === "Delivery") {
          navigation.navigate("CartLocationScreen", { desiredShopUid: desiredShopUid, orderDeliveryOption: availableOptions[0]?.selectedOption });
        } else {
          checkout(availableOptions[0]?.selectedOption, desiredShopUid);
          console.log("checkout process finished successfully ...");
        }
        const paymentInstrument = takePaymentInstrument();
      }else{
        Alert.alert(
          "Error",
          "Sorry,some items not avilable!",
          [{ text: "OK" }]
        );
        return;
      }
    } else {
      Alert.alert(
        "Error",
        "The shop is closed.",
        [{ text: "OK" }]
      );
      return;
    }
  };

  useEffect(() => {
    if (!shopOrder) {
      navigation.navigate("CartScreen");
    }
  }, [shopOrder]);

  if (!shopOrder) {
    return null; // or any other component or message indicating no shopOrder
  }

  return (
    <SafeArea>
      <Flex>
        <Row>
          <TouchableOpacity onPress={() => navigation.navigate("CartScreen")}>
            <LeftIcon name="angle-left" size={40} color="black" />
          </TouchableOpacity>
          <ShopIcon source={{ uri: shopOrder.shop.icon }} />
          <Title>{shopOrder.shop.name}</Title>
        </Row>
        <ScrollView>
          {shopOrder.cartItems.map((cartItem, index) => (
            <ItemCard key={index}>
              <ItemImage source={{ uri: cartItem.item.itemPhoto }} />
              <View>
                <ItemName>{cartItem.item.itemName}</ItemName>
                {Object.entries(cartItem.additions).map(([additionName, additionPrice], index) => (
                  <Info key={index}>
                    {additionName}: {additionPrice}₪{''}
                  </Info>
                ))}
                  <Info>{t("price")}: {singleOrderPrice(cartItem.item.itemPrice, cartItem.additions, cartItem.quantity)}₪</Info>
                  <Price>{t("Price for unit")}: {cartItem.item.itemPrice}₪</Price>
                  {cartItem.item.itemAvailability ? (null):(<Error>{t("item not Avilable !")}</Error>)}
              </View>
              <Flex/>
              {printButtons(shopOrder.shop, cartItem.item, cartItem.additions, cartItem.quantity, addToCart, removeFromCart)}
            </ItemCard>
          ))}
        </ScrollView>
        
        <TotalContainer>
        <SummaryInfo>{t("Available Options")}:</SummaryInfo>
          <ShopOptionsContainer >
            {availableOptions.map((option) => {
              if (option.shopUid === shopOrder.shop.shopUid) {
                return option.options.map((opt) => (
                  <AvailableOptionsButton
                    key={opt}
                    onPress={() => selectOption(option.shopUid, opt)}
                    isSelected={ option.selectedOption === opt } >
                    <AvailableOptionsText >{t(opt)}</AvailableOptionsText>
                  </AvailableOptionsButton>
                ));
              }
              return null;
            })}
          </ShopOptionsContainer>
          <SummaryInfo>{t("Total price")}: {calculateTotalPrice(desiredShopUid)}₪</SummaryInfo>
          <CheckOutButton onPress={() => handleCheckout() }>
            <CheckOutText>{t("Checkout")}</CheckOutText>
          </CheckOutButton>
        </TotalContainer>
      </Flex>
    </SafeArea>
  );
};
