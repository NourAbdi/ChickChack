import styled from "styled-components/native";
import { Card } from "react-native-paper";
import {Dimensions } from 'react-native';



const screenWidth = Dimensions.get('window').width;
const cardMargin = 4;
const width = (screenWidth - cardMargin * 8) / 3;
const cardWidth=Math.floor(width);

export const Icon = styled.Image`
  width: 15px;
  height: 15px;
`;

export const RestaurantCard = styled(Card)`
  
  background-color: ${(props) => props.theme.colors.bg.primary};
  width: ${cardWidth}px;
  height: 200px;
  margin: ${(props) => props.theme.space[1]};
`;

export const RestaurantCardCover = styled(Card.Cover)`
  // padding: ${(props) => props.theme.space[3]};
  width: ${cardWidth}px;
  height:120px;
  align-self: center;
  background-color: ${(props) => props.theme.colors.bg.primary};
`;

export const Address = styled.Text`
  font-family: ${(props) => props.theme.fonts.body};
  font-size: ${(props) => props.theme.fontSizes.caption};
`;

export const Info = styled.View`
  padding: ${(props) => props.theme.space[3]};
`;

export const Rating = styled.View`
  flex-direction: row;
  padding-top: ${(props) => props.theme.space[2]};
  padding-bottom: ${(props) => props.theme.space[2]};
`;

export const Section = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const SectionEnd = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: flex-end;
`;
