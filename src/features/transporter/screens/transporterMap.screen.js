import React, { useContext, useEffect, useRef, useState } from "react";
import { ScrollView, View, Button, ActivityIndicator, Alert } from "react-native";
import MapView, { Marker } from "react-native-maps";
import styled from "styled-components/native";
import * as Location from 'expo-location';

import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from "../../../infrastructure/theme/colors";

import { TransporterContext } from '../../../services/transporter/transporter.context';

const Map = styled(MapView)`
  height: 92%;
  width: 100%;
  background-color: white;
`;

export const TransporterMapScreen = () => {
    const mapRef = useRef(null);
    const { newOrders, currentOrders } = useContext(TransporterContext);
    const [currentLocation, setCurrentLocation] = useState(null);
    const [isLocationGranted, setLocationGranted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const getCurrentLocation = async () => {
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
        setIsLoading(true);
        try {
            let location = await Location.getCurrentPositionAsync({});
            setCurrentLocation(location);
            setLocationGranted(true);
        } catch (error) {
            console.log("Error getting current location:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getCurrentLocation();
    }, []);

    const teleportToCoordinate = (latitude, longitude) => {
        mapRef.current.animateToRegion(
            {
                latitude,
                longitude,
                latitudeDelta: 0.05,
                longitudeDelta: 0.05,
            },
            500
        );
    };

    if (isLoading || !currentOrders || !newOrders) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color={colors.primary} />
            </View>
        );
    }

    return (
        <>
            <Map
                ref={mapRef}
                initialRegion={{
                    latitude: currentLocation ? currentLocation.coords.latitude : 0,
                    longitude: currentLocation ? currentLocation.coords.longitude : 0,
                    latitudeDelta: 0.05,
                    longitudeDelta: 0.05,
                }}
                showsUserLocation={isLocationGranted}
                showsMyLocationButton={false}
            >
                {newOrders && newOrders.map(order => (
                    <Marker
                        key={order.orderId}
                        coordinate={{
                            latitude: order.locationToDeliver.latitude,
                            longitude: order.locationToDeliver.longitude
                        }}
                        title="locationToDeliver"
                        description={order.orderStage}
                        pinColor="red"
                        onPress={() => teleportToCoordinate(order.locationToDeliver.latitude, order.locationToDeliver.longitude)}
                    />
                ))}

                {/* Markers for currentOrders */}
                {/* {currentOrders.map(order => (
                    <Marker
                        key={order.orderId}
                        coordinate={{
                            latitude: order.shopLocation.latitude,
                            longitude: order.shopLocation.longitude
                        }}
                        title="Current Order"
                        description={order.orderStage}
                        pinColor="yellow"
                        onPress={() => handleMarkerPress(order.shopLocation)}
                    />
                ))} */}

                {/* Markers for currentOrders */}
                {currentOrders && currentOrders.map(order => (

                    <Marker
                        key={order.orderId}
                        coordinate={{
                            latitude: order.locationToDeliver.latitude,
                            longitude: order.locationToDeliver.longitude
                        }}
                        title="locationToDeliver"
                        description={order.orderStage}
                        pinColor="green"
                        onPress={() => teleportToCoordinate(order.locationToDeliver.latitude, order.locationToDeliver.longitude)}
                    />
                ))}
            </Map>

            <Button
                title="Use my current location"
                onPress={getCurrentLocation}
            />
        </>
    );
};
