import React, { useContext, useEffect, useRef, useState } from "react";
import { ScrollView, Button, ActivityIndicator, Alert } from "react-native";
import MapView, { Marker } from "react-native-maps";
import styled from "styled-components/native";
import * as Location from 'expo-location';
import { useTranslation } from "react-i18next";

import { LocationContext } from "../../../services/location/location.context";

const Map = styled(MapView)`
  height: 75%;
  width: 100%;
  background-color: white;
`;

export const MapScreen = ({ navigation }) => {
  const mapRef = useRef(null);
  const { t } = useTranslation();
  const { selectedCity, setSelectedCity, cities, setCurrentLocation } = useContext(LocationContext);
  const [isLocationGranted, setLocationGranted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const getPermissions = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert(
        t("permissionDeniedTitle"),
        t("permissionDeniedMessage"),
        [
          { text: t("OK"), onPress: () => console.log("OK Pressed") }
        ]
      );
      return;
    }

    setIsLoading(true);

    let location = await Location.getCurrentPositionAsync({});
    setCurrentLocation({ location, focused: false });
    setLocationGranted(true);

    // Reverse geocoding to get the city name
    const { latitude, longitude } = location.coords;
    const address = await Location.reverseGeocodeAsync({ latitude, longitude });
    if (address && address.length > 0) {
      const city = address[0].city.toLowerCase();
      const translatedCity = t(city, { lng: 'en' });
      // Update the selected city based on the current location
      const matchingCity = cities.find((c) => c.cityName.toLowerCase() === translatedCity.toLowerCase());
      if (matchingCity) {
        setSelectedCity(matchingCity);
        navigation.navigate("Shops");
      } else {
        console.log("The city is not available yet.");
      }
    }
    setIsLoading(false);
  };

  useEffect(() => {
    // console.log("selectedCity: ", selectedCity);
    if (cities && selectedCity) {
      const city = cities.find((city) => city.cityUid === selectedCity.cityUid);
      if (city) {
        const { latitude, longitude } = city.location;
        mapRef.current?.animateToRegion({
          latitude,
          longitude,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        });
      }
    }
  }, [cities, selectedCity]);

  useEffect(() => {
    if (cities) {
      const kafrKannaCity = cities.find((city) => city.cityName === "kafr kanna");
      if (kafrKannaCity) {
        setSelectedCity(kafrKannaCity);
      }
    }
  }, [cities]);

  return (
    <>
      <Map
        ref={mapRef}
        initialRegion={{
          latitude: selectedCity ? selectedCity.location.latitude : 0,
          longitude: selectedCity ? selectedCity.location.longitude : 0,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
        showsUserLocation={isLocationGranted}
        showsMyLocationButton={false}
      >
        {cities.map((city) => (
          <Marker
            key={city.cityUid}
            coordinate={{
              latitude: city.location.latitude,
              longitude: city.location.longitude,
            }}
            title={city.cityName}
            onPress={() => {
              setSelectedCity(city);
              navigation.navigate("Shops");
            }}
          />
        ))}
      </Map>

      <Button
        title={t("useCurrentLocation")}
        onPress={getPermissions}
      />

      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <ScrollView>
          {cities.map((city) => (
            <Button
              key={city.cityUid}
              title={t(city.cityName)}
              onPress={() => {
                setSelectedCity(city);
                navigation.navigate("Shops");
              }}
            />
          ))}
        </ScrollView>
      )}
    </>
  );
};
