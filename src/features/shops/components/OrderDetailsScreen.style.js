import styled from "styled-components/native";
import { ImageBackground,Dimensions,TouchableOpacity,Image } from "react-native";
import { Card } from "react-native-paper";
import { Text } from "../../../components/typography/text.component";

const OrderImageHeight = 300;
const screenWidth = Dimensions.get('window').width;
const MARGIN = 5;

export const InfoCard = styled(Card)`
  background-color: ${(props) => props.theme.colors.bg.primary};
  width: ${screenWidth-2*MARGIN}px;
  height: ${(props) => props.safeAreaViewHeight-OrderImageHeight+45}px;
  margin: ${MARGIN}px;
  margin-top:${-50}px;
  align-self: center;
  border-radius:40px;
  overflow: hidden;
  border-width: 2px;
  border-color:  ${(props) => props.theme.colors.mainblue};
  position: absolute;
`;

export const AdditionImage = styled(Image)`
  width:40px;
  height:40px;
  margin:5px;
`;

export const OrderImage = styled(ImageBackground)`
  width: 100%;
  height: ${OrderImageHeight}px;
  
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

export const ViewAddition = styled.View`
  flex-direction: row;
  background-color:${(props) => props.theme.colors.ui.tertiary};
  height:auto;
  border-color: ${(props) => props.theme.colors.ui.secondary};
  border-top-width: 1px;
  border-bottom-width: 1px;
  align-items:center;
`;

export const ViewCounter = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 6px;
  background-color: ${(props) => props.theme.colors.mainblue};
  padding: 6px;
  border-radius: 100px;
  flex-wrap: wrap; 
  margin:${(props) => props.theme.space[2]};
`;

export const AdditionOverlay = styled.View`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color:rgba(150,150,150,0.7);
`;

export const UnavailableText = styled(Text)`
  align-self: center;
  font-family: ${(props) => props.theme.fonts.body};
  font-size: ${(props) => props.theme.fontSizes.button};
  background-color:${(props) => props.theme.colors.bg.primary};
  top:20%;
  border-width: 1px;
  border-color: ${(props) => props.theme.colors.mainblue};
  border-radius:15px;
  overflow: hidden;
  padding:4px;
`;

export const OrderName = styled(Text)`
  font-family: ${(props) => props.theme.fonts.heading};
  font-size: ${(props) => props.theme.fontSizes.h5};
  align-self: center;
`;

export const CategoryName = styled(Text)`
  font-family: ${(props) => props.theme.fonts.heading};
  font-size: ${(props) => props.theme.fontSizes.title};
  margin-left:${(props) => props.theme.space[1]};
`;

export const AdditionInfo = styled(Text)`
  font-family: ${(props) => props.theme.fonts.body};
  font-size: ${(props) => props.theme.fontSizes.body};
  align-self: center;
  margin:5px;
`;

export const Count = styled.Text`
  font-size:${(props) => props.theme.fontSizes.body};
  font-family: ${(props) => props.theme.fonts.body};
  color: ${(props) => props.theme.colors.text.inverse};
`;

export const Description = styled(Text)`
  fontSize:  ${(props) => props.theme.fontSizes.body};
  font-family: ${(props) => props.theme.fonts.body};
  color: ${(props) => props.theme.colors.text.secondary};
  align-self: center;

`;

export const Price = styled(Text)`
  fontSize:  ${(props) => props.theme.fontSizes.caption};
  fontWeight: ${(props) => props.theme.fontWeights.medium};
  color: ${(props) => props.theme.colors.text.secondary};
  align-self: center;
`;

export const TotalPrice = styled(Text)`
  font-family: ${(props) => props.theme.fonts.body};
  font-size: ${(props) => props.theme.fontSizes.body};
  color: ${(props) => props.theme.colors.text.inverse};
  align-self: center;
  margin:5px;
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
  width: 100%;
`;

export const BlueBackGround = styled.View`
  width: 100%;
  background-color: ${(props) => props.theme.colors.mainblue};
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

export const LeftHeaderButton = styled(TouchableOpacity)`
  width: 52px;
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
  width: 52px;
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


