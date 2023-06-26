import styled from "styled-components/native";
import { Card } from "react-native-paper";
import { TouchableOpacity } from "react-native";

const borderRadius = 20;

export const MealCard = styled(Card)`
background-color: ${(props) => props.theme.colors.bg.primary};
width: ${(props) => props.theme.mealCardSize}px;
height: auto;
margin: ${(props) => props.theme.space[1]};
margin-bottom: ${(props) => props.theme.space[3]};
border-radius:${borderRadius}px;
overflow: hidden;

`;

export const MealCardCover = styled(Card.Cover)`
width:${(props) => props.theme.mealCardSize}px;
height:120px;
align-self: center;
overflow: hidden;
background-color: ${(props) => props.theme.colors.bg.primary};
`;

export const Price = styled.Text`
  font-family: ${(props) => props.theme.fonts.body};
  font-size: ${(props) => props.theme.fontSizes.button};
  margin-left: ${(props) => props.theme.space[1]};
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

export const CounterButton = styled(TouchableOpacity)`
  background-color: 'rgba(150, 50, 50, 0.8)';
  width: 30px;
  aspect-ratio: 1;
  align-items: center;
  justify-content: center;
  border-radius: 34px;
  position:absolute;
  Right:15px;
`;

