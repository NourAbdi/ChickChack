import React, { useContext, useState, useEffect } from "react";
import MapView, { Marker } from "react-native-maps";
import styled from "styled-components/native";
import { Button, Image } from 'react-native';
import { Spacer } from "../../../components/spacer/spacer.component";

import { LocationContext } from "../../../services/location/location.context";

const Map = styled(MapView)`
  height: 75%;
  width: 100%;
`;

export const MapScreen = ({ navigation }) => {
  const { city, setCityName } = useContext(LocationContext);
  

  const handleCityChange = (newCity) => {
    setCityName(newCity);
    navigation.navigate("Shops", { screen: "ShopsScreen" });
  };

  return (
    <>
      <Map
        region={{
          latitude: city.location._latitude,
          longitude: city.location._longitude,
          latitudeDelta: 0.025,
          longitudeDelta: 0.025,
        }}
      >
      </Map>

      <Button
        title="use my current location"
        onPress={() => {
          // Handle getting current location and updating the city
          // Example:
          // const currentLocation = getCurrentLocation();
          // setLocation(currentLocation);
        }}
      />

      <Spacer size="small">
        <Button
          title="Kafr Kanna"
          onPress={() => handleCityChange("kafr kanna")}
        />
      </Spacer>

      <Spacer size="small">
        <Button
          title="Mashhad"
          onPress={() => handleCityChange("mashhad")}
        />
      </Spacer>

      <Spacer size="small">
        <Button
          title="Reyne"
          onPress={() => handleCityChange("reyne")}
        />
      </Spacer>

      <Spacer size="small">
        <Button
          title="Turan"
          onPress={() => handleCityChange("turan")}
        />
      </Spacer>
    </>
  );
};
