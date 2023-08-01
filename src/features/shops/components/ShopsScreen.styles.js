import styled from "styled-components/native";
import { ActivityIndicator,Card } from "react-native-paper";
import { Dimensions,Animated } from "react-native";
import {FontAwesome } from "@expo/vector-icons";
import { theme } from "../../../infrastructure/theme";
import { Text } from "../../../components/typography/text.component";



const screenWidth = Dimensions.get('window').width;
const CARDMARGIN = 6;
const ShopsCardWidth=screenWidth-2*CARDMARGIN;
const ShopsCardHeigth=200;
const ShopCardWidth=(ShopsCardWidth-3*2*CARDMARGIN)/3;
const ShopCardHeigth=ShopsCardHeigth-2*CARDMARGIN-30;
const ShopTypeCardSize =60;
const HEADER_HEIGHT = theme.headerHeigth;

export const Loading = styled(ActivityIndicator)`
  margin-left: -25px;
`;

export const LoadingContainer = styled.View`
  flex: 1;
  justify-content: center;
`;

export const ShopsCard = styled(Card)`
  background-color: ${(props) => props.theme.colors.bg.primary};
  width: ${ShopsCardWidth}px;
  height: ${ShopsCardHeigth}px;
  align-self: center;
  border-radius:15px;
  margin-horizontal: ${CARDMARGIN}px;
  margin-top:${(props) => props.theme.space[3]};
  shadow-color: ${(props) => props.theme.colors.ui.primary};
  shadow-offset: 0px 5px;
  shadow-opacity: 0.35;
  shadow-radius: 6px;
  elevation: 13;
`;

export const ShopCard = styled(Card)`
  background-color: ${(props) => props.theme.colors.bg.primary};
  width: ${ShopCardWidth}px;
  height: ${ShopCardHeigth}px;
  align-self: center;
  margin: ${CARDMARGIN}px;
  border-radius:15px;
  overflow: hidden;
`;

export const TypeImage = styled.Image`
  width: ${ShopTypeCardSize}px;
  height: ${ShopTypeCardSize}px;
  border-radius:35px;
  border-width: 2px;
  border-color: ${(props) => props.theme.colors.mainblue};
`;

export const LogoImage = styled.Image`
  width: ${ShopCardWidth}px;
  height: ${ShopCardHeigth/2}px;
`;

export const MealShadow = styled.View`
  shadow-color: ${(props) => props.theme.colors.ui.secondary};
  shadow-offset: 0px 5px;
  shadow-opacity: 0.30;
  shadow-radius: 4px;
  elevation: 13;
`;

export const Info = styled.View`
  padding: ${(props) => props.theme.space[1]};
  margin-vertical: ${(props) => props.theme.space[1]};
  align-items: center;
  justify-content: center;
`;

export const CategoryView = styled.View`
  margin: ${(props) => props.theme.space[1]};
  align-items: center;
`;

export const CategoryName = styled(Text)`
  margin-left: ${(props) => props.theme.space[3]};
  font-family: ${(props) => props.theme.fonts.heading};
  font-size: ${(props) => props.theme.fontSizes.title};
  font-weight: ${(props) => props.theme.fontWeights.regular};
  border-color: ${(props) => props.theme.colors.bg.secondary};
`;

export const HeaderTitle = styled(Text)`
  font-family: ${(props) => props.theme.fonts.heading};
  font-size: ${(props) => props.theme.fontSizes.h4};
  color:${(props) => props.theme.colors.text.inverse};
  
`;

export const CategoryTitle = styled(Text)`
  font-family: ${(props) => props.theme.fonts.heading};
  font-size: ${(props) => props.theme.fontSizes.button};
  width:80px;
  text-align: center; 
  margin-top: ${(props) => props.theme.space[1]};

`;

export const AnimatedTitleView = styled(Animated.View).attrs(() =>({
}))`
  backgroundColor: transparent; 
  margin-top:${HEADER_HEIGHT/2}px; 
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
`;

export const AnimatedHeaderView = styled(Animated.View).attrs(({}) =>({
  pointerEvents:"none" ,
}))`
  position:absolute;
  top: 0;
  left: 0;
  right: 0;
  backgroundColor: ${(props) => props.theme.colors.mainblue};
  overflow: hidden;
  height:${HEADER_HEIGHT}px; 
`;

export const AnimatedHederIcon = styled(Animated.View).attrs({
    
})`
  backgroundColor: transparent;
  marginTop: ${Platform.select({ios: '28px',android: '38px'})};
  position: absolute;
  align-self: center;
  justifyContent:center;
  matgin-left:5px;
  top: 0;
  left: 0;
  right: 0;
`;

export const StyledIcon = styled(FontAwesome)`
  margin-left:10px;
  margin-top:20px;
  align-self: flex-start;
  justifyContent:center;

`;

