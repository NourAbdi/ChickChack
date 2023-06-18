import React, { useContext, useState, useEffect } from "react";
import { View, Text, Button, Alert } from "react-native";
import styled from "styled-components/native";
import MapView, { Marker } from "react-native-maps";
import * as Location from 'expo-location';
import { useNavigation } from "@react-navigation/native";

import { CartContext } from "../../../services/cart/cart.context";

export const CartLocationScreen = () => {
    const navigation = useNavigation();
    const { location2Deliver, setLocation2Deliver } = useContext(CartContext);
    const [ currentLocation, setCurrentLocation ] = useState();
    const [hasPermission, setHasPermission] = useState(false);

    const Map = styled(MapView)`
        height: 75%;
        width: 100%;
        background-color: white;
    `;

    const handleLocationSelection = () => {
        if (location2Deliver?.location.latitude && location2Deliver?.location.longitude) {
            console.log("selectedLocation:", location2Deliver);
            navigation.navigate("CartScreen");
        } else {
            Alert.alert("No location selected", "Please select a location on the map.");
        }
    };

    const handleCurrentLocationSelection = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert(
                "Permission Denied",
                "Please grant location permissions in your device settings.",
                [
                    { text: "OK", onPress: () => console.log("OK Pressed") }
                ]
            );
            return;
        }

        const location = await Location.getCurrentPositionAsync({});
        setCurrentLocation(location);
        setHasPermission(true);
        // navigation.navigate("CartScreen");
    };

    const handleMapPress = (event) => {
        const { coordinate } = event.nativeEvent;
        setLocation2Deliver(coordinate);
    };

    useEffect(() => {
        if (currentLocation) {
            setLocation2Deliver(currentLocation);
        }
    }, [currentLocation]);

    // useEffect(() => {
    //       if (location2Deliver) {
    //         const { latitude, longitude } = location2Deliver.location;
    //         mapRef.current?.animateToRegion({
    //           latitude,
    //           longitude,
    //           latitudeDelta: 0.05,
    //           longitudeDelta: 0.05,
    //         });
    //       }
    //   }, [location2Deliver]);

    return (
        <View>
            <Map
            // ref={mapRef}
                initialRegion={console.log(currentLocation)&&{
                    latitude: currentLocation ? currentLocation.coords.latitude : 32.742873,
                    longitude: currentLocation ? currentLocation.coords.longitude : 35.337760,
                    latitudeDelta: 0.05,
                    longitudeDelta: 0.05,
                }}
                showsUserLocation={hasPermission}
                // onPress={handleMapPress}
            >
                {/* {location2Deliver && (
                    <Marker coordinate={location2Deliver} />
                )} */}
            </Map>

            {/* <Button title="Use My Current Location" onPress={handleCurrentLocationSelection} /> */}
            {/* <Button title="Select Location on the Map" onPress={handleLocationSelection} /> */}
            <Button title="Back" onPress={() => navigation.navigate("CartScreen")} />
        </View>
    );
};
