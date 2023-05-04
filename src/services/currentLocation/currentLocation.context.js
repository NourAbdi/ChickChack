import React, { useState, createContext } from "react";
import * as Location from 'expo-location';
import { Alert } from "react-native";

export const currentLocationContext = createContext();

export const CurrentLocationContextProvider = ({ children }) => {

    const [location, setLocation] = useState(null);
    const [city, setCity] = useState(null);

    const getPermissions = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            console.log("Please grant location permissions");
            return;
        }
        let location = await Location.getCurrentPositionAsync({});
        setLocation(location);
    };

    const onLocation = () => {
        getPermissions();
        if (!location) {
            Alert.alert('current location', 'Please grant location permissions', [
                {
                    text: 'OK', onPress: () => {
                        console.log('OK Pressed')
                        while(location);
                    }
                },
            ])
        }
        reverseGeocode(location);
    };

    const onCity = (city) => {
        setCity(city);
    };

    const reverseGeocode = async (location) => {
        const reverseGeocodedAddress = await Location.reverseGeocodeAsync({
            longitude: location.coords.longitude,
            latitude: location.coords.latitude
        });
        setCity(reverseGeocodedAddress[0]["city"])
    };

    return (
        <currentLocationContext.Provider
            value={{
                isLocatedWithLocation: !!location,
                isLocatedWithCity: !!city,
                location,
                onLocation,
                onCity,
                city,
            }}
        >
            {children}
        </currentLocationContext.Provider>
    );
};
