import styled from "styled-components/native";
import { Card } from "react-native-paper";
import {Dimensions } from 'react-native';



const screenWidth = Dimensions.get('window').width;
const cardMargin = 4;
const width = (screenWidth - cardMargin * 6) / 2;
const cardWidth=Math.floor(width);


export const MealCard = styled(Card)`
  
background-color: ${(props) => props.theme.colors.bg.primary};
width: ${cardWidth}px;
height: 180px;
margin: ${(props) => props.theme.space[1]};
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
//   padding: ${(props) => props.theme.space[3]};
    margin-top:${(props) => props.theme.space[2]};
`;