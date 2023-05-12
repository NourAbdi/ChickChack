import styled from "styled-components/native";
import { Card } from "react-native-paper";
import {Dimensions } from 'react-native';



const screenWidth = Dimensions.get('window').width;
const cardMargin = 4;
const width = (screenWidth - cardMargin * 6) / 2;
const cardWidth=Math.floor(width);
const cardHeight=190;
const borderRadius = 20;


export const MealCard = styled(Card)`
  
background-color: ${(props) => props.theme.colors.bg.primary};
width: ${cardWidth}px;
height: ${cardHeight}px;
margin: ${(props) => props.theme.space[1]};
// padding: ${(props) => props.theme.space[3]};
border-radius:${borderRadius}px;
overflow: hidden;
border-width: 2px;
border-color: ${(props) => props.theme.colors.bg.secondary};
`;

export const MealCardCover = styled(Card.Cover)`
// padding: ${(props) => props.theme.space[3]};
width: ${cardWidth}px;
height:120px;
align-self: center;
background-color: ${(props) => props.theme.colors.bg.primary};

`;

export const Price = styled.Text`
  font-family: ${(props) => props.theme.fonts.body};
  font-size: ${(props) => props.theme.fontSizes.caption};
`;

export const Info = styled.View`
    padding: ${(props) => props.theme.space[1]};
`;


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

export const MealName = styled.Text`
  margin-left: ${(props) => props.theme.space[3]};
  font-family: ${(props) => props.theme.fonts.heading};
  font-size: ${(props) => props.theme.fontSizes.title};
  font-weight: ${(props) => props.theme.fontWeights.regular};
  border-color: ${(props) => props.theme.colors.bg.secondary};

`;
//--------------------------------------------------------------------
export const InfoRestaurantCard = styled(Card)`
  
background-color: ${(props) => props.theme.colors.bg.primary};
width: ${screenWidth-20}px;
height:  100px;
align-self: center;
margin: ${(props) => props.theme.space[2]};
border-radius:40px;
overflow: hidden;
border-width: 4px;
border-color: ${(props) => props.theme.colors.mainblue};
`;

export const RestaurantInfo = styled.Text`
  font-family: ${(props) => props.theme.fonts.monospace};
  font-size: ${(props) => props.theme.fontSizes.button};
  padding: ${(props) => props.theme.space[1]};
  align-self: center;
`;

export const IsOpenCard = styled(Card)`
  
background-color: ${props => props.backgroundColor};
border-color: ${props => props.backgroundColor};
width: 70px;
height:  30px;
align-self: center;
// margin: ${(props) => props.theme.space[2]};
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