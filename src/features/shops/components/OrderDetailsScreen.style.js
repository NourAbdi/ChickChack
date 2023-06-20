import styled from "styled-components/native";
import { ImageBackground,Dimensions,TouchableOpacity } from "react-native";
import { Card } from "react-native-paper";

import { theme } from "../../../infrastructure/theme";

const HEADER_HEIGHT = theme.headerHeigth;
const OrderImageHeight = 300;
const screenWidth = Dimensions.get('window').width;
const screenHeigth = Dimensions.get('window').height;
const MARGIN = 5;

export const OrderImage = styled(ImageBackground)`
  width: 100%;
  height: ${OrderImageHeight}px;
  
`;

export const InfoCard = styled(Card)`
  background-color: ${(props) => props.theme.colors.bg.primary};
  width: ${screenWidth-2*MARGIN}px;
  height: auto;
  margin: ${MARGIN}px;
  margin-top:${-50}px;
  align-self: center;
  border-radius:40px;
  overflow: hidden;
  border-width: 2px;
  border-color:  ${(props) => props.theme.colors.mainblue};
  position: absolute;
`;

export const InfoCardShadow = styled.View`
  shadow-color: ${(props) => props.theme.colors.ui.secondary};
  shadow-offset: 0px 3px;
  shadow-opacity: 0.20;
  shadow-radius: 4px;
  elevation: 13;
`;

export const Center = styled.View`
  align-self: center;
`;

export const Row = styled.View`
  flex-direction: row;
`;

export const ViewCounter = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 6px;
  background-color: ${(props) => props.theme.colors.mainblue};
  padding: 6px;
  border-radius: 100px;
  flex-wrap: wrap; 
  align-self:center;
  margin:${(props) => props.theme.space[2]};
`;

export const OrderName = styled.Text`
  font-family: ${(props) => props.theme.fonts.heading};
  font-size: ${(props) => props.theme.fontSizes.h5};
  align-self: center;
`;

export const Count = styled.Text`
  fontSize:  ${(props) => props.theme.fontSizes.body};
  fontWeight: ${(props) => props.theme.fontWeights.medium};
  color: ${(props) => props.theme.colors.text.inverse};
`;

export const Description = styled.Text`
  fontSize:  ${(props) => props.theme.fontSizes.body};
  font-family: ${(props) => props.theme.fonts.body};
  color: ${(props) => props.theme.colors.text.secondary};
  align-self: center;

`;

export const CounterButton = styled(TouchableOpacity)`
  background-color: white;
  width: 34px;
  aspect-ratio: 1;
  align-items: center;
  justify-content: center;
  border-radius: 34px;
`;

export const HeaderView = styled.View`
  flex-direction:row;
  align-items: center;
  padding: 20px;
`;

export const HeaderButton = styled(TouchableOpacity)`
  width: 52px;
  aspect-ratio: 1;
  align-items: center;
  justify-content: center;
  border-radius: 52px;
  border-width: 2px;
  border-color:  ${(props) => props.color};
  margin:${(props) => props.theme.space[2]};

`;

// export const AnimatedScrollView = styled(Animated.ScrollView).attrs(({ scrollY }) =>({
//   scrollEventThrottle:16,
//   onScroll:Animated.event(
//     [{ nativeEvent: { contentOffset: { y:scrollY } } }],
//     { useNativeDriver: true },
//   ),
// }))``;

// export const AnimatedHeaderView = styled(Animated.View).attrs(({}) =>({
//   pointerEvents:"none" ,
// }))`
//   position:absolute;
//   top: 0;
//   left: 0;
//   right: 0;
//   backgroundColor: ${(props) => props.theme.colors.mainblue};
//   overflow: hidden;
//   height:${HEADER_HEIGHT}px;  
// `;

// export const AnimatedIconView = styled(Animated.View).attrs(({ photo }) =>({
//   source: {uri: photo },
// }))`
//   backgroundColor: transparent;
//   marginTop:${HEADER_HEIGHT}px; 
//   alignItems: center;
//   justifyContent: center;
//   position: absolute;
//   top: 0;
//   left: 0;
//   right: 0;
// `;

// export const AnimatedBackView = styled(Animated.View).attrs({
    
// })`
//   backgroundColor: transparent;
//   marginTop: ${Platform.select({ios: '28px',android: '38px'})};
//   height: 90px;
//   position: absolute;
//   align-self: center;
//   justifyContent:center;
//   top: 0;
//   left: 0;
//   right: 0;
// `;
 
// export const ShopIcon = styled(Image)`
//   width: 100px;
//   height: 100px;
//   align-self: center;
//   position:absolute;
//   border-radius:50px;
//   border-Width:4px;
//   border-color:${(props) => props.theme.colors.mainblue};
// `;



// export const Row = styled.View`
//   flex-direction: row;
// `;

// export const ViewMenu = styled.View`
//   margin-start: ${(props) => props.theme.space[2]};
//   margin-end: ${(props) => props.theme.space[2]};
//   shadow-color: ${(props) => props.theme.colors.ui.primary};
//   shadow-offset: 0px 5px;
//   shadow-opacity: 0.35;
//   shadow-radius: 6px;
//   elevation: 13;
//   // background-color: ${(props) => props.theme.colors.ui.tertiary};
// `;

