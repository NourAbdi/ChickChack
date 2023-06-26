import React, { useContext, useState, useEffect } from "react";
import { View, Text, Button, Image, ScrollView, TouchableOpacity } from "react-native";
import { SafeArea } from "../../../components/utility/safe-area.component";
import { useNavigation } from "@react-navigation/native";
import Icons from "@expo/vector-icons/MaterialIcons";

import { CartContext } from "../../../services/cart/cart.context";
import { 
  styles,
  Title, 
  Row,
  LeftIcon,
  ShopIcon,
  ItemCard,
  ItemImage,
  ItemName,
  Info,
  Price,
} from "../components/shopCart.styles";

import { 
  printButtons,
  singleOrderPrice,
} from "../components/shopCart.component";

export const ShopCart = ({route}) => {
  const { order, addToCart, removeFromCart, clearCart, checkout, totalPrice, shopLengthCheck } = useContext(CartContext);
  const [availableOptions, setAvailableOptions] = useState([]);
  const navigation = useNavigation();
  const desiredShopUid=route.params.shopUid;
  const shopOrder = order.find(order => order.shop.shopUid === desiredShopUid);
  console.log("CCCCCCCCCCCCCCCCCCCCCCCCC",shopOrder)
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

  const handleCheckout = () => {
    if (!shopLengthCheck()) {
      console.log("CAN'T CHECKOUT WITH ORDER FROM MULTIPLE SHOPS!");
      return;
    }
    console.log("selectedOption", availableOptions);
    // Check if any options are not selected for a shop
    for (const option of availableOptions) {
      if (!option || !option.selectedOption) {
        console.log("Please select an option for the shop");
        return;
      }
    }
    console.log("selectedOption: ", availableOptions[0]?.selectedOption);
    if (availableOptions[0]?.selectedOption == "Delivery") {
      
    }
    
    const paymentInstrument = takePaymentInstrument();

    // All options are selected, proceed with the checkout
    checkout(availableOptions[0]?.selectedOption);

    console.log("checkout process finished successfully ...");
  };

  const handleLocationSelection = () => {
    navigation.navigate("CartLocationScreen");
  };
  if(!shopOrder){
    navigation.navigate("CartScreen");
    return;
  }
  return (
    <SafeArea>
      <View style={{ flex: 1}}>
        <Row>
          <TouchableOpacity onPress={() => navigation.navigate("CartScreen")} >
            <LeftIcon name="angle-left" size={40} color="black" />
          </TouchableOpacity>
            <ShopIcon source={{uri:shopOrder.shop.icon}} />
          <Title>{shopOrder.shop.name}</Title>
        </Row>
        <ScrollView>
            {shopOrder.cartItems.map((cartItem,index) => (
              <ItemCard key={index} >
                <ItemImage source={{ uri: cartItem.item.itemPhoto }} />
                <View >
                  <ItemName>{cartItem.item.itemName}</ItemName>
                  {Object.entries(cartItem.additions).map(([additionName, additionPrice],index) => (
                    <Info key={index}>
                      {additionName}: {additionPrice}₪{''}
                    </Info>
                  ))}
                  <Row>
                    <View>
                    <Info>Price: {singleOrderPrice(cartItem.item.itemPrice,cartItem.additions,cartItem.quantity)}₪</Info>
                  <Price>Price for unite: {cartItem.item.itemPrice}₪</Price>
                    </View>
                  </Row>

                </View>
                <View style={{flex:1}}/>
                {printButtons(shopOrder.shop, cartItem.item,cartItem.additions,cartItem.quantity,addToCart)}
              </ItemCard>
            ))}
            <Text style={styles.availableOptions}>Available Options:</Text>
            <View style={styles.shopOptionsContainer}>
              {availableOptions.map((option) => {
                if (option.shopUid === shopOrder.shop.shopUid) {
                  return option.options.map((opt) => (
                    <TouchableOpacity
                      key={opt}
                      onPress={() => selectOption(option.shopUid, opt)}
                      style={[
                        styles.optionButton,
                        option.selectedOption === opt ? styles.selectedOption : null,
                      ]}
                    >
                      <Text style={styles.optionText}>{opt}</Text>
                    </TouchableOpacity>
                  ));
                }
                return null;
              })}
            </View>
    </ScrollView>
    <View style={styles.totalContainer}>
      <Text style={styles.totalPrice}>Total Price: {totalPrice.toFixed(2)}₪</Text>
      <Button title="Checkout" onPress={() => handleCheckout()} />
      <Button title="Clear" onPress={clearCart} />
      <TouchableOpacity onPress={handleLocationSelection} style={styles.locationButton}>
        <Text style={styles.locationButtonText}>Select Location</Text>
      </TouchableOpacity>
    </View>
  </View>
</SafeArea>
);
};
