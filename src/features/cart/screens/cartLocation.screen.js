import React, { useContext, useState, useEffect, useRef } from "react";
import { View, Button, Alert, ActivityIndicator,SafeAreaView,StatusBar } from "react-native";
import MapView, { Marker } from "react-native-maps";
import styled from "styled-components/native";
import * as Location from 'expo-location';
import { useNavigation } from "@react-navigation/native";
import { CartContext } from "../../../services/cart/cart.context";
import{colors} from "../../../infrastructure/theme/colors";



export const CartLocationScreen = ({route}) => {
    const navigation = useNavigation();
    const { location2Deliver, setLocation2Deliver,checkout } = useContext(CartContext);
    const [currentLocation, setCurrentLocation] = useState();
    const [hasPermission, setHasPermission] = useState(false);
    const [isLoading, setIsLoading] = useState(false); // Loading state
    const mapRef = useRef();
    const {desiredShopUid,orderDeliveryOption} = route.params;


    const Map = styled(MapView)`
        height: 75%;
        width: 100%;
        background-color: white;
    `;

    const LoadingContainer = styled(View)`
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        align-items: center;
        justify-content: center;
        background-color: rgba(0, 0, 0, 0);
    `;

    const handleCurrentLocationSelection = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert(
                "Permission Denied",
                "Please grant location permissions in your device settings.",
                [{ text: "OK", onPress: () => console.log("OK Pressed") }]
            );
            return;
        }

        setIsLoading(true); 

        const location = await Location.getCurrentPositionAsync({});
        setCurrentLocation(location);
        setLocation2Deliver(location.coords);
        setHasPermission(true);
        setIsLoading(false); 
    };

    const handleMapPress = (event) => {
        const { coordinate } = event.nativeEvent;
        setLocation2Deliver(coordinate);
    };

    const handleUseLocationOnMap = () => {
        if (location2Deliver) {
            console.log("Selected Location:", location2Deliver);
        } else {
            Alert.alert("No location selected", "Please select a location on the map.");
        }
    };

    const handleConfirmPress= () => {
        checkout(orderDeliveryOption,desiredShopUid);
        console.log("checkout process finished successfully ...");
        navigation.navigate("CartScreen");
    };


    useEffect(() => {
        if (location2Deliver) {
            mapRef.current?.animateToRegion({
                latitude: location2Deliver.latitude,
                longitude: location2Deliver.longitude,
                latitudeDelta: 0.05,
                longitudeDelta: 0.05,
            });
        }
    }, [location2Deliver]);

    useEffect(() => {
        Alert.alert(
          "Note",
          "Please select your desired location",
          [{ text: "OK" }]
        );
      }, []);

    return (
        <View style={{ flex: 1 }}>
        <StatusBar barStyle="dark-content" />     
            <Map
                ref={mapRef}
                initialRegion={{
                    latitude: location2Deliver ? location2Deliver.latitude : 0,
                    longitude: location2Deliver ? location2Deliver.longitude : 0,
                    latitudeDelta: 0.05,
                    longitudeDelta: 0.05,
                }}
                showsUserLocation={hasPermission}
                onPress={handleMapPress}
            >
                {location2Deliver && (
                    <Marker
                        coordinate={{
                            latitude: location2Deliver.latitude,
                            longitude: location2Deliver.longitude,
                        }}
                    />
                )}
            </Map>

            {isLoading && (
                <LoadingContainer>
                    <ActivityIndicator size="large" color="blue" />
                </LoadingContainer>
            )}

            <View>
                <Button title="Use My Current Location" onPress={handleCurrentLocationSelection} />
                <Button title="Use Location On Map" onPress={handleUseLocationOnMap} />
                <Button title="Confirm" onPress={() => handleConfirmPress() } />
            </View>
        </View>
    );
};
