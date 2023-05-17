import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import acreFishShop from "../../../../assets/acre_fish_shop.jpg";

export const ShopDetailsScreen = () => {
  // Example shop details
  const shop = {
    name: "Delicious Restaurant",
    location: "123 Main Street",
    cuisine: "Italian",
    rating: 4.5,
    image: acreFishShop,
  };

  return (
    <View style={styles.container}>
      <Image source={shop.image} style={styles.image} />
      <View style={styles.detailsContainer}>
        <Text style={styles.name}>{shop.name}</Text>
        <Text style={styles.location}>{shop.location}</Text>
        <Text style={styles.cuisine}>{shop.cuisine}</Text>
        <Text style={styles.rating}>Rating: {shop.rating}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  detailsContainer: {
    alignItems: "center",
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 5,
  },
  location: {
    fontSize: 18,
    marginBottom: 5,
  },
  cuisine: {
    fontSize: 18,
    marginBottom: 5,
  },
  rating: {
    fontSize: 16,
    color: "#888",
  },
});
