import React, { useContext, useState } from "react";
import { View, Text, TextInput, Button, ImageBackground, StyleSheet, Switch } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { SafeArea } from "../../../components/utility/safe-area.component";
import { ShopContext } from "../../../services/ownerShop/ownerShop.context";

const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export const EditShopScreen = () => {
  const { shop, updateShop } = useContext(ShopContext);
  const [workingHours, setWorkingHours] = useState(shop.workingHours);
  const [isOpen, setIsOpen] = useState(shop.isOpen);

  const handleUpdateShop = () => {
    // Update the shop information
    console.log(workingHours, isOpen);
    updateShop( workingHours, isOpen ).then(console.log(workingHours, isOpen));
  };

  const handleWorkingHoursChange = (day, field, value) => {
    setWorkingHours((prevWorkingHours) => ({
      ...prevWorkingHours,
      [day]: {
        ...prevWorkingHours[day],
        [field]: value,
      },
    }));
  };

  const handleIsOpenChange = (value) => {
    setIsOpen(value);
  };

  const renderWorkingHours = () => {
    return (
      <>
        <Text style={styles.sectionTitle}>Working Hours:</Text>
        {daysOfWeek.map((day) => (
          <View key={day} style={styles.dayContainer}>
            <Text style={styles.dayText}>{day}:</Text>
            <View style={styles.timeContainer}>
              <TextInput
                style={styles.input}
                value={workingHours?.[day]?.start || ""}
                placeholder="08:00"
                onChangeText={(value) => handleWorkingHoursChange(day, "start", value)}
              />
              <Text>-</Text>
              <TextInput
                style={styles.input}
                value={workingHours?.[day]?.end || ""}
                placeholder="16:00"
                onChangeText={(value) => handleWorkingHoursChange(day, "end", value)}
              />
            </View>
          </View>
        ))}
      </>
    );
  };

  return (
    <SafeArea>
      <ScrollView>
        <View>
          <ImageBackground
            source={{ uri: shop.headerBackground }}
            style={styles.image}
          />
          <View style={styles.detailsContainer}>
            {renderWorkingHours()}
            <View style={styles.checkboxContainer}>
              <Text style={styles.checkboxLabel}>{isOpen ? "Is Open" : "Closed"}</Text>
              <Switch value={isOpen} onValueChange={handleIsOpenChange} />
            </View>

          </View>
        </View>
        <Button title="Update Shop" onPress={handleUpdateShop} />
      </ScrollView>
    </SafeArea>
  );
};

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
  },
  detailsContainer: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  dayContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
    marginRight: 16,
  },
  dayText: {
    marginRight: 8,
  },
  timeContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  checkboxLabel: {
    marginRight: 8,
  },
});
