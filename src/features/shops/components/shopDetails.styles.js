import styled from "styled-components/native";
import { Animated,Platform,Image,Dimensions,ImageBackground,TouchableOpacity } from "react-native";
import { Card,IconButton,ActivityIndicator } from "react-native-paper";
import {FontAwesome } from "@expo/vector-icons";
import { theme } from "../../../infrastructure/theme";
 
const screenWidth = Dimensions.get('window').width;
const cardHeight=parseInt(theme.mealCardSize)+40;
const MARGIN=200;
const HeaderImageHeight=300;
//The same as shop-details.screen.components
const HEADER_HEIGHT = theme.headerHeigth;



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

export const AnimatedIconView = styled(Animated.View).attrs(({ photo }) =>({
  source: {uri: photo },
}))`
  backgroundColor: transparent;
  marginTop:${HEADER_HEIGHT}px; 
  alignItems: center;
  justifyContent: center;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
`;

export const AnimatedBackView = styled(Animated.View).attrs({
    
})`
  backgroundColor: transparent;
  marginTop: ${Platform.select({ios: '28px',android: '38px'})};
  height: 90px;
  position: absolute;
  align-self: center;
  justifyContent:center;
  top: 0;
  left: 0;
  right: 0;
`;

export const AnimatedScrollView = styled(Animated.ScrollView).attrs(({ scrollY }) =>({
  scrollEventThrottle:16,
  onScroll:Animated.event(
    [{ nativeEvent: { contentOffset: { y:scrollY } } }],
    { useNativeDriver: true },
  ),
}))``;

export const LoadingContainer = styled.View`
  position: absolute;
  top: 50%;
  left: 50%;
`;

export const Loading = styled(ActivityIndicator)`
  margin-left: -25px;
`;

export const ShopIcon = styled(Image)`
  width: 100px;
  height: 100px;
  align-self: center;
  position:absolute;
  border-radius:50px;
  border-Width:4px;
  border-color:${(props) => props.theme.colors.mainblue};
`;

export const MealsCard = styled(Card)`
  background-color: ${(props) => props.theme.colors.bg.primary};
  width: ${(props) => props.theme.mealsCardSize}px;
  height:  ${cardHeight}px;
  align-self: center;
  margin: ${(props) => props.theme.space[2]};
  border-radius:15px;
  overflow: hidden;
`;

export const RestaurantInfoCard = styled(Card)`
  background-color: ${(props) => props.theme.colors.bg.primary};
  width: ${screenWidth-16}px;
  margin: ${(props) => props.theme.space[2]};
  height:  ${MARGIN+20}px;
  align-self: center;
  border-radius:40px;
  overflow: hidden;
  border-width: 4px;
  border-color: ${(props) => props.theme.colors.mainblue};
`;

export const IsOpenCard = styled(Card)`
  background-color: ${(props) => props.backgroundColor};
  border-color: ${(props) => props.backgroundColor};
  margin-top: ${(props) => props.theme.space[1]};
  width: 115px;
  height:  30px;
  align-self: center;
  border-radius:20px;
  overflow: hidden;
  border-width: 4px;
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

export const CategoryName = styled.Text`
  margin-left: ${(props) => props.theme.space[3]};
  font-family: ${(props) => props.theme.fonts.heading};
  font-size: ${(props) => props.theme.fontSizes.title};
  font-weight: ${(props) => props.theme.fontWeights.regular};
  border-color: ${(props) => props.theme.colors.bg.secondary};

`;

export const RestaurantInfo = styled.Text`
  font-family: ${(props) => props.theme.fonts.monospace};
  font-size: ${(props) => props.theme.fontSizes.body};
  padding: ${(props) => props.theme.space[1]};
  align-self: center;
`;
export const RestaurantName = styled.Text`
  font-family: ${(props) => props.theme.fonts.heading};
  font-size: ${(props) => props.theme.fontSizes.title};
  padding: ${(props) => props.theme.space[1]};
  align-self: center;
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

export const StyledIcon = styled(FontAwesome)`
  name=${(props) => props.name};
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
  height: ${HeaderImageHeight}px;
`;

export const ViewAbove = styled.View`
  bottom: ${HeaderImageHeight/5}px;
`;

export const ViewMenu = styled.View`
  margin-top:${-HeaderImageHeight/5}px;
  margin-start: ${(props) => props.theme.space[2]};
  margin-end: ${(props) => props.theme.space[2]};
  shadow-color: ${(props) => props.theme.colors.ui.primary};
  shadow-offset: 0px 5px;
  shadow-opacity: 0.35;
  shadow-radius: 6px;
  elevation: 13;
  // background-color: ${(props) => props.theme.colors.ui.tertiary};
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

export const HeaderView = styled.View`
  flex-direction:row;
  width: 100%;
`;

export const LeftHeaderButton = styled(TouchableOpacity)`
  width: 40px;
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

export const RightHeaderButton = styled(TouchableOpacity)`
  width: 40px;
  aspect-ratio: 1;
  align-items: center;
  justify-content: center;
  border-radius: 52px;
  border-width: 2px;
  border-color:  ${(props) => props.color};
  margin:${(props) => props.theme.space[2]};
  margin-left: auto;
  background-color: rgba(150, 150, 150, 0.5);
`;