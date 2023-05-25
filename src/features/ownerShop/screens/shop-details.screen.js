import React, { useContext, useState } from "react";
import { View, Text, ImageBackground, StyleSheet, TouchableOpacity, Image } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { SafeArea } from "../../../components/utility/safe-area.component";
import { ShopContext } from "../../../services/ownerShop/ownerShop.context";

export const ShopDetailsScreen = () => {
    const { shop } = useContext(ShopContext);
    const [showWorkingHours, setShowWorkingHours] = useState(false);

    if (!shop) {
        // If shop details are not yet fetched, you can show a loading indicator
        return <Text>Loading...</Text>;
    }

    const handleToggleWorkingHours = () => {
        setShowWorkingHours(!showWorkingHours);
    };

    return (
        <SafeArea>
            <ScrollView>
                <View>
                    <ImageBackground
                        source={{ uri: shop.headerBackground }}
                        style={styles.image}
                    ></ImageBackground>
                    <View style={styles.detailsContainer}>
                        <Image source={{ uri: shop.icon }} style={styles.shopIcon} />
                        {shop.name && <Text style={styles.name}>{shop.name}</Text>}
                        {shop.address && <Text style={styles.address}>{shop.address}</Text>}
                        {Object.entries(shop.workingHours).length > 0 && (
                            <TouchableOpacity style={styles.workingHoursContainer} onPress={handleToggleWorkingHours}>
                                <Text style={styles.workingHoursLabel}>Working Hours:</Text>
                                {showWorkingHours ? (
                                    <>
                                        {Object.entries(shop.workingHours).map(([day, hours]) => (
                                            <Text key={day} style={styles.workingHoursText}>
                                                {day}: {hours.start} - {hours.end}
                                            </Text>
                                        ))}
                                    </>
                                ) : (
                                    <Text style={styles.workingHoursText}>Tap to show</Text>
                                )}
                            </TouchableOpacity>
                        )}
                        {Object.entries(shop.menu).length > 0 && (
                            <View style={styles.menuContainer}>
                                <Text style={styles.sectionTitle}>Menu:</Text>
                                {Object.entries(shop.menu).map(([category, items]) => (
                                    <View key={category}>
                                        <Text style={styles.categoryTitle}>{category}</Text>
                                        {Object.entries(items).map(([item, details]) => (
                                            <View key={item} style={styles.menuItemContainer}>
                                                {details.photo && (
                                                    <Image source={{ uri: details.photo }} style={styles.menuItemImage} />
                                                )}
                                                <Text style={styles.menuItemTitle}>{item}</Text>
                                                <Text style={styles.menuItemPrice}>Price: {details.price}</Text>
                                            </View>
                                        ))}
                                    </View>
                                ))}
                            </View>
                        )}
                        {shop.type && <Text style={styles.sectionTitle}>Type: {shop.type}</Text>}
                        {shop.isOpen !== undefined && (
                            <Text style={styles.sectionTitle}>Status: {shop.isOpen ? "Open" : "Closed"}</Text>
                        )}
                        {shop.city && <Text style={styles.sectionTitle}>City: {shop.city}</Text>}
                        {shop.takeOrder && (
                            <View style={styles.takeOrderContainer}>
                                <Text style={styles.sectionTitle}>Take Order:</Text>
                                {shop.takeOrder.DineIn && <Text style={styles.takeOrderText}>- Dine In</Text>}
                                {shop.takeOrder.Takeaway && <Text style={styles.takeOrderText}>- Takeaway</Text>}
                                {shop.takeOrder.Delivery && <Text style={styles.takeOrderText}>- Delivery</Text>}
                            </View>
                        )}
                    </View>
                </View>
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
    shopIcon: {
        width: 100,
        height: 100,
        alignSelf: "center",
        resizeMode: "contain",
    },
    detailsContainer: {
        padding: 16,
    },
    name: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 8,
    },
    address: {
        fontSize: 18,
        marginBottom: 8,
    },
    workingHoursContainer: {
        marginBottom: 16,
    },
    workingHoursLabel: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 4,
    },
    workingHoursText: {
        fontSize: 16,
    },
    takeOrderContainer: {
        marginLeft: 16,
    },
    takeOrderText: {
        fontSize: 16,
    },
    menuContainer: {
        marginTop: 16,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 8,
    },
    categoryTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginTop: 16,
        marginBottom: 8,
    },
    menuItemContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 8,
    },
    menuItemImage: {
        width: 40,
        height: 40,
        marginRight: 8,
        borderRadius: 20,
    },
    menuItemTitle: {
        fontSize: 16,
    },
});
