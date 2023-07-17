import React, { useContext, useEffect, useRef, useState } from "react";
import { View, Button, ActivityIndicator, Alert } from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";
import styled from "styled-components/native";
import * as Location from 'expo-location';

import { colors } from "../../../infrastructure/theme/colors";

import { TransporterContext } from '../../../services/transporter/transporter.context';

const Map = styled(MapView)`
  height: 94%;
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

    const renderRoute = (order) => {
        const { shopLocation, locationToDeliver } = order;
        const routeCoordinates = [
            { latitude: shopLocation.latitude, longitude: shopLocation.longitude },
            { latitude: locationToDeliver.latitude, longitude: locationToDeliver.longitude },
        ];

        return <Polyline coordinates={routeCoordinates} strokeColor="blue" strokeWidth={2} />;
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
                    <React.Fragment key={order.orderId}>
                    <Marker
                        coordinate={{
                            latitude: order.shopLocation.latitude,
                            longitude: order.shopLocation.longitude
                        }}
                        title="Shop Location"
                        description={order.orderStage}
                        pinColor="red"
                        onPress={() => teleportToCoordinate(order.shopLocation.latitude, order.shopLocation.longitude)}
                    />
                    <Marker
                        coordinate={{
                            latitude: order.locationToDeliver.latitude,
                            longitude: order.locationToDeliver.longitude
                        }}
                        title="locationToDeliver"
                        description={order.orderStage}
                        pinColor="yellow"
                        onPress={() => teleportToCoordinate(order.locationToDeliver.latitude, order.locationToDeliver.longitude)}
                    />
                    {renderRoute(order)}
                </React.Fragment>
                ))}

                {/* Markers and routes for currentOrders */}
                {currentOrders && currentOrders.map(order => (
                    <React.Fragment key={order.orderId}>
                        <Marker
                            coordinate={{
                                latitude: order.shopLocation.latitude,
                                longitude: order.shopLocation.longitude
                            }}
                            title="Shop Location"
                            description={order.orderStage}
                            pinColor="red"
                            onPress={() => teleportToCoordinate(order.shopLocation.latitude, order.shopLocation.longitude)}
                        />
                        <Marker
                            coordinate={{
                                latitude: order.locationToDeliver.latitude,
                                longitude: order.locationToDeliver.longitude
                            }}
                            title="locationToDeliver"
                            description={order.orderStage}
                            pinColor="green"
                            onPress={() => teleportToCoordinate(order.locationToDeliver.latitude, order.locationToDeliver.longitude)}
                        />
                        {renderRoute(order)}
                    </React.Fragment>
                ))}
            </Map>

            <Button
                title="Use my current location"
                onPress={getCurrentLocation}
            />
        </>
    );
};
