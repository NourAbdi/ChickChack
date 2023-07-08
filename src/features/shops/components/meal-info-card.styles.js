import styled from "styled-components/native";
import { Image,View,Text } from "react-native";
import { Card } from "react-native-paper";

const borderRadius = 20;

export const MealCard = styled(Card)`
  background-color: ${(props) => props.theme.colors.bg.primary};
  width: ${(props) => props.theme.mealCardSize}px;
  height:  ${(props) => props.theme.mealCardSize}px;
  margin: ${(props) => props.theme.space[1]};
  margin-bottom: ${(props) => props.theme.space[2]};
  border-radius:${borderRadius}px;
  overflow: hidden;
  position: relative;
`;

export const MealCardCover = styled(Image)`
  width:${(props) => props.theme.mealCardSize}px;
  height:120px;
  background-color: ${(props) => props.theme.colors.bg.secondary};
`;

export const Price = styled.Text`
  font-family: ${(props) => props.theme.fonts.body};
  font-size: ${(props) => props.theme.fontSizes.button};
`;

export const Info = styled.View`
  padding: ${(props) => props.theme.space[1]};
`;

export const MealShadow = styled.View`
  shadow-color: ${(props) => props.theme.colors.ui.secondary};
  shadow-offset: 0px 3px;
  shadow-opacity: 0.20;
  shadow-radius: 4px;
  elevation: 13;
`;

export const MealCardOverlay = styled(View)`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color:rgba(230,230,230,0.5);
`;

export const UnavailableContainer = styled(View)`
  align-items: center;
  background-color: white;
  top: 40%;
  left:10%;
  right:10%;
  position: absolute;
  border-width: 1px;
  border-color: ${(props) => props.theme.colors.mainblue};
  padding: 5px;
  border-radius:${borderRadius}px;

`;

export const UnavailableText = styled(Text)`
  align-self: center;
  font-family: ${(props) => props.theme.fonts.body};
  font-size: ${(props) => props.theme.fontSizes.button};
`;
