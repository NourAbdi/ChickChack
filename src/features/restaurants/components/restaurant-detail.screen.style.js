import styled from "styled-components/native";
import { Card,IconButton } from "react-native-paper";
import {Dimensions,ImageBackground,Platform } from 'react-native';
import {FontAwesome } from "@expo/vector-icons";
import { theme } from "../../../infrastructure/theme";


const screenWidth = Dimensions.get('window').width;
const cardHeight=parseInt(theme.mealCardSize)+40;
const MARGIN=200;


export const MealsCard = styled(Card)`
background-color: ${(props) => props.theme.colors.bg.primary};
width: ${(props) => props.theme.mealsCardSize}px;
height: ${cardHeight}px;
align-self: center;
margin: ${(props) => props.theme.space[2]};
border-radius:15px;
overflow: hidden;
`;

export const CategoryName = styled.Text`
  margin-left: ${(props) => props.theme.space[3]};
  font-family: ${(props) => props.theme.fonts.heading};
  font-size: ${(props) => props.theme.fontSizes.title};
  font-weight: ${(props) => props.theme.fontWeights.regular};
  border-color: ${(props) => props.theme.colors.bg.secondary};

`;

export const InfoRestaurantCard = styled(Card)`
background-color: ${(props) => props.theme.colors.bg.primary};
width: ${screenWidth-20}px;
height:  ${MARGIN+20}px;
align-self: center;
margin: ${(props) => props.theme.space[2]};
border-radius:40px;
overflow: hidden;
border-width: 4px;
border-color: ${(props) => props.theme.colors.mainblue};
`;

export const RestaurantInfo = styled.Text`
  font-family: ${(props) => props.theme.fonts.monospace};
  font-size: ${(props) => props.theme.fontSizes.body};
  padding: ${(props) => props.theme.space[1]};
  align-self: center;
`;

export const IsOpenCard = styled(Card)`
background-color: ${(props) => props.backgroundColor};
border-color: ${(props) => props.backgroundColor};
width: 70px;
height:  30px;
align-self: center;
border-radius:20px;
overflow: hidden;
border-width: 4px;
`;

export const IsOpenWord = styled.Text`
  font-family: ${(props) => props.theme.fonts.monospace};
  font-size: ${(props) => props.theme.fontSizes.button};
  color:${(props) => props.theme.colors.bg.primary};
  align-self: center;
`;

export const Row = styled.View`
  flex-direction: row;
`;
export const Center = styled.View`
  align-self: center;
`;

export const IconCard = styled(Card)`
padding: ${(props) => props.theme.space[1]}; 
margin: ${(props) => props.theme.space[1]};
background-color: ${props => props.theme.colors.ui.tertiary};
border-color: ${props => props.theme.colors.mainblue};
border-width: 2px;
width: 35px;
height:  35px;
border-radius:20px;
overflow: hidden;
`;

export const StyledIcon = styled(FontAwesome)`
  name:${(props) => props.name};
  margin-top: 4px;
  align-self: center;
  color:${(props) => props.theme.colors.ui.secondary};
  font-size: 15px;
`;

export const CheckIcon = styled(FontAwesome)`
  name=${(props) => props.name};
  font-size: 20px;
  marginTop:20px;
  marginLeft:27px;
  position:absolute;
`;

export const HeaderImage = styled(ImageBackground)`
  width: 100%;
  height: 250px;
  shadow-color: "#000";
  shadow-offset: 0px 12px;
  shadow-opacity: 0.58;
  shadow-radius: 16px;
  elevation: 24;
`;

export const ViewAbove = styled.View`
  position: absolute; 
  bottom: -${MARGIN}px;
`;

export const ViewMenu = styled.View`
  margin-top:${MARGIN}px;
  margin-start: ${(props) => props.theme.space[2]};
  margin-end: ${(props) => props.theme.space[2]};
  shadow-color: ${(props) => props.theme.colors.ui.secondary};
  shadow-offset: 0px 5px;
  shadow-opacity: 0.35;
  shadow-radius: 6px;
  elevation: 13;
`;

export const StyledScrollView = styled.ScrollView`
  background-color: ${(props) => props.theme.colors.bg.primary};
`;

export const CardView = styled.View`
  flex-direction: row;
  margin-start: ${(props) => props.theme.space[2]};
  margin-end: ${(props) => props.theme.space[2]};
`;

export const StyledIconButton = styled(IconButton)`
  position: absolute;
  top: 40px;
  left: 10px;
  padding: 10px;
`;


