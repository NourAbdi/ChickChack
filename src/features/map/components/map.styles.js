import styled from "styled-components/native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { ScrollView, Button, ActivityIndicator, Alert, TouchableOpacity, View, SafeAreaView, StatusBar } from "react-native";
import { Text } from "../../../components/typography/text.component";

export const LoadingContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`; 

export const Loading = styled(ActivityIndicator).attrs((props) => ({
  color: props.theme.colors.mainblue,
  size: 'large',
}))`
  height: 2000px; /* Set the desired height */
  width: 200px; /* Set the desired width */
`; 

export const Map = styled(MapView)`
  height: 60%;
  width: 100%;
`;
export const CityButton = styled(TouchableOpacity)`
  margin: ${(props) => props.theme.space[1]};
  background-color: ${(props) => props.theme.colors.mainblue};
  align-items: center;
  align-self: center;
  justify-content: center;
  border-radius:10px;
  width: ${(props) => props.theme.sizesDim.screenWidth /3}px;
  padding: ${(props) => props.theme.space[2]};
`;

export const ButtonText = styled(Text)`
  font-family: ${(props) => props.theme.fonts.heading};
  font-size: ${(props) => props.theme.fontSizes.body};
  color:${props => props.theme.colors.text.inverse};
`;
//------------------------------------------------------------------------------------------------
export const mapJson = [
  {
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#f5f5f5"
      }
    ]
  },
  {
    "elementType": "labels.icon",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#616161"
      }
    ]
  },
  {
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#f5f5f5"
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#bdbdbd"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#eeeeee"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#e5e5e5"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#9e9e9e"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#98b4fb"
      },
      {
        "saturation": 5
      },
      {
        "lightness": 65
      }
    ]
  },
  {
    "featureType": "road.arterial",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "stylers": [
      {
        "color": "#5f5cff"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#2662fd"
      },
      {
        "saturation": 5
      },
      {
        "lightness": 60
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#616161"
      }
    ]
  },
  {
    "featureType": "road.local",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#2662fd"
      },
      {
        "lightness": 75
      }
    ]
  },
  {
    "featureType": "road.local",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#9e9e9e"
      }
    ]
  },
  {
    "featureType": "transit.line",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#e5e5e5"
      }
    ]
  },
  {
    "featureType": "transit.station",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#eeeeee"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#2662fd"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#9e9e9e"
      }
    ]
  }
]