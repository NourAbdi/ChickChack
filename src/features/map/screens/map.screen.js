import React, { useContext, useState, useEffect } from "react";
import MapView, { Callout, Marker } from "react-native-maps";
import styled from "styled-components/native";

import { LocationContext } from "../../../services/location/location.context";
import { RestaurantsContext } from "../../../services/restaurants/restaurants.context";

import { Button } from 'react-native';
import { Spacer } from "../../../components/spacer/spacer.component";
import {
  AccountBackground1,
  AccountContainer1,
  AccountCover1,
  AuthButton,
  Title1,
  AnimationWrapper1,
  AnimationWrapper2,
} from "../../account/components/account.styles";

import { Search } from "../components/search.component";
import { MapCallout } from "../components/map-callout.component";

const Map = styled(MapView)`
  height: 75%;
  width: 100%;
`;

export const MapScreen = ({ navigation }) => {
  const { location } = useContext(LocationContext);
  const { restaurants = [] } = useContext(RestaurantsContext);

  const [latDelta, setLatDelta] = useState(0);
  console.log(location);
  const { lat, lng, viewport } = location;

  useEffect(() => {
    const northeastLat = viewport.northeast.lat;
    const southwestLat = viewport.southwest.lat;

    setLatDelta(northeastLat - southwestLat);
  }, [location, viewport]);

  return (
    <>
      <Search />
      <Map
        region={{
          latitude: lat,
          longitude: lng,
          latitudeDelta: latDelta,
          longitudeDelta: 0.01,
        }}
      >
        {restaurants.map((restaurant) => {
          return (
            <Marker
              key={restaurant.name}
              title={restaurant.name}
              coordinate={{
                latitude: restaurant.geometry.location.lat,
                longitude: restaurant.geometry.location.lng,
              }}
            >
              <Callout
                onPress={() =>
                  navigation.navigate("RestaurantDetail", {
                    restaurant,
                  })
                }
              >
                <MapCallout restaurant={restaurant} />
              </Callout>
            </Marker>
          );
        })}
      </Map>

      <Button
        title="use my current location"
      // onPress={() => onLocation()}
      >
      </Button>
      <Spacer size="small">
        <Button
          title="Kafr Kanna"
          onPress={() =>
            navigation.navigate("Restaurant", {
              // "restaurant",
            })
          }
        >
        </Button>
      </Spacer>
      <Spacer size="small">
        <Button
          title="Mashhad"
        // onPress={() => onCity("Mashhad")}
        >
        </Button>
      </Spacer>
      <Spacer size="small">
        <Button
          title="Reineh"
        // onPress={() => onCity("Rainy")}
        >
        </Button>
      </Spacer>
      <Spacer size="small">
        <Button
          title="Turan"
        // onPress={() => onCity("Touraan")}
        >
        </Button>
      </Spacer>
    </>
  );
};
