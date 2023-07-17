import styled from "styled-components/native";
import { View,TouchableOpacity } from "react-native";
import MapView from "react-native-maps";
import { Text } from "../../../components/typography/text.component";


export const Map = styled(MapView)`
height: 75%;
width: 100%;
background-color: white;
`;

export const LoadingContainer = styled(View)`
position: absolute;
top: 0;
left: 0;
right: 0;
bottom: 0;
align-items: center;
justify-content: center;
background-color: rgba(0, 0, 0, 0);
`;

export const Row = styled.View`
  flex-direction:row;
  align-items:center;
  align-self:center;
  margin-top: ${(props) => props.theme.space[3]};
`;

export const Loction2DeleivreyButton = styled(TouchableOpacity)`
  margin-bottom: ${(props) => props.theme.space[1]};
  margin-right: ${(props) => props.theme.space[2]};
  background-color: ${(props) => props.theme.colors.mainblue};
  align-items: center;
  justify-content: center;
  border-radius:5px;
  padding:10px;
  width:40%;
  opacity: ${(props) => (props.isSelected ? 1 : 0.5)};
  align-self:center;
`;

export const CheckOutButton = styled(TouchableOpacity)`
  margin-bottom: ${(props) => props.theme.space[2]};
  background-color: ${(props) => props.theme.colors.mainblue};
  align-items: center;
  justify-content: center;
  border-radius:10px;
  align-self:center;
  width:90%;
  height:50px;
`;

export const CheckOutText = styled(Text)`
  font-family: ${(props) => props.theme.fonts.body};
  fontSize:  ${(props) => props.theme.fontSizes.h5};
  color: ${(props) => props.theme.colors.text.inverse};
`;

export const Loction2DeleivreyText = styled(Text)`
  font-family: ${(props) => props.theme.fonts.body};
  font-size: ${(props) => props.theme.fontSizes.body};
  margin-bottom:${(props) => props.theme.space[1]};
  color: ${(props) => props.theme.colors.text.inverse};
`;

export const HeaderView = styled.View`
  flex-direction:row;
  width: 100%;
`;

export const LeftHeaderButton = styled(TouchableOpacity)`
  width: 52px;
  aspect-ratio: 1;
  align-items: center;
  justify-content: center;
  border-radius: 52px;
  border-width: 2px;
  border-color:  ${(props) => props.color};
  margin:${(props) => props.theme.space[2]};
  margin-right: auto;
  background-color: rgba(150, 150, 150, 0.5);
`;