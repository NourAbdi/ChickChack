import React, { useContext, useState, useEffect, useRef } from "react";
import { View,SafeAreaView, Alert, ActivityIndicator } from "react-native";
import { Marker } from "react-native-maps";
import * as Location from 'expo-location';
import { useNavigation } from "@react-navigation/native";
import Icons from "@expo/vector-icons/MaterialIcons";

import { CartContext } from "../../../services/cart/cart.context";
import{colors} from "../../../infrastructure/theme/colors";
import {
    Map,
    LoadingContainer,
    Row,
    Loction2DeleivreyButton,
    Loction2DeleivreyText,
    CheckOutButton,
    CheckOutText,
    HeaderView,
    LeftHeaderButton,
} from "../components/cartLocation.screen.style"

export const CartLocationScreen = ({route}) => {
    const navigation = useNavigation();
    const { location2Deliver, setLocation2Deliver,checkout } = useContext(CartContext);
    const [currentLocation, setCurrentLocation] = useState();
    const [hasPermission, setHasPermission] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isCurrentLocationSelected, setIsCurrentLocationSelected] = useState(false);
    const [isMapLocationSelected, setIsMapLocationSelected] = useState(false);
    const mapRef = useRef();
    const {desiredShopUid,orderDeliveryOption} = route.params;

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
        setIsCurrentLocationSelected(true);
        setIsMapLocationSelected(false);
        setIsLoading(true); 
        console.log("setIsCurrentLocationSelected",isCurrentLocationSelected)
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
        if(!isLoading){
            setIsCurrentLocationSelected(false);
            setIsMapLocationSelected(true);
            if (location2Deliver) {
                console.log("Selected Location:", location2Deliver);
            } else {
                Alert.alert("No location selected", "Please select a location on the map.");
            }
        }else 
            return;
    };

    const handleConfirmPress= () => {
        if(!isLoading){
            checkout(orderDeliveryOption,desiredShopUid);
            console.log("checkout process finished successfully ...");
            navigation.navigate("CartScreen");
        }else
            return;
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
            <SafeAreaView style={{ position: 'absolute' }}>
                <HeaderView>
                <LeftHeaderButton onPress={() => navigation.goBack()} color={colors.text.inverse}>
                    <Icons name="arrow-back" size={25} color={colors.text.inverse} />
                </LeftHeaderButton>
                </HeaderView>
            </SafeAreaView>
            <Row>
                <Loction2DeleivreyButton  onPress={() =>handleCurrentLocationSelection() } isSelected={isCurrentLocationSelected}>
                    <Loction2DeleivreyText>Use My Current Location</Loction2DeleivreyText>
                </Loction2DeleivreyButton>
                <Loction2DeleivreyButton  onPress={() =>handleUseLocationOnMap() } isSelected={isMapLocationSelected}>
                    <Loction2DeleivreyText>Use Location On Map</Loction2DeleivreyText>
                </Loction2DeleivreyButton>
            </Row>
            <View style={{flex:1}}/>
            <CheckOutButton  onPress={() =>handleConfirmPress() } isSelected={isCurrentLocationSelected}>
                <CheckOutText>Checkout</CheckOutText>
            </CheckOutButton>
        </View>
    );
};
