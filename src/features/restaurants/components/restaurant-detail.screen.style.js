import styled from "styled-components/native";
import { Card } from "react-native-paper";
import {Dimensions } from 'react-native';
import {FontAwesome } from "@expo/vector-icons";


const screenWidth = Dimensions.get('window').width;
const cardMargin = 4;
const width = (screenWidth - cardMargin * 6) / 2;
const cardWidth=Math.floor(width);
const borderRadius = 20;

export const MealsCard = styled(Card)`
background-color: ${(props) => props.theme.colors.bg.primary};
width: ${screenWidth}px;
height:  ${cardWidth+30}px;
align-self: center;
margin: ${(props) => props.theme.space[2]};
border-radius:${borderRadius}px;
overflow: hidden;
border-width: 5px;
border-color: ${(props) => props.theme.colors.ui.disabled};

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
height:  ${(props) => props.height}px;
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