import React, { useContext, useEffect, useRef, useState } from "react";
import { ScrollView, ActivityIndicator, Alert, View, SafeAreaView, StatusBar } from "react-native";
import { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import * as Location from 'expo-location';
import { useTranslation } from "react-i18next";
import { LocationContext } from "../../../services/location/location.context";
import { colors } from "../../../infrastructure/theme/colors";
import { mapJson,LoadingContainer,Loading,Map,CityButton,ButtonText } from "../components/map.styles";


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
      {isLoading ? (<LoadingContainer><Loading/></LoadingContainer>) : (
      <View>
        <SafeAreaView style={{ backgroundColor: colors.mainblue }}>
          <StatusBar barStyle="light-content" />
        </SafeAreaView>

        <Map
          provider={PROVIDER_GOOGLE}
          ref={mapRef}
          initialRegion={{
            latitude: selectedCity ? Number(selectedCity.location.latitude) : 0,
            longitude: selectedCity ? Number(selectedCity.location.longitude) : 0,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
          }}
          showsUserLocation={isLocationGranted}
          showsMyLocationButton={false}
          customMapStyle={mapJson}
        >
          {cities.map((city) => (
            <Marker
              key={city.cityUid}
              coordinate={{
                latitude: Number(city.location.latitude),
                longitude: Number(city.location.longitude),
              }}
              title={city.cityName}
              onPress={() => {
                setSelectedCity(city);
                navigation.navigate("Shops");
              }}
            />
          ))}
        </Map>

        <CityButton onPress={getPermissions} >
          <ButtonText>{t("CurrentLocation")}</ButtonText>
        </CityButton>
        {isLoading ? (
          <LoadingContainer><Loading/></LoadingContainer>
        ) : (
          <ScrollView>
            {cities.map((city) => (
              <CityButton key={city.cityUid} onPress={() => { setSelectedCity(city); navigation.navigate("Shops"); }}>
                <ButtonText>{t(city.cityName)}</ButtonText>
              </CityButton>
            ))}
          </ScrollView>
        )}
      </View>)}
    </>
  );
};
