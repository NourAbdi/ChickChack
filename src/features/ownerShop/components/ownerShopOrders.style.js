import { Image,Dimensions } from "react-native";
import styled from "styled-components/native";
import { Card,ActivityIndicator } from "react-native-paper";

//Cards sizes
const margin =7;
const screenWidth = Dimensions.get('window').width;
const bigCardWidth = screenWidth - 2*margin; 
const bigCardHeight = 360; 
const iteamCardHeight = 200; 
const iteamCardWidth = bigCardWidth-2*margin; 
const TimeCardHeigth=30;
const TimeCradWidth=30;

export const Title = styled.Text`
  margin: ${(props) => props.theme.space[1]};
  font-family: ${(props) => props.theme.fonts.heading};
  font-size: ${(props) => props.theme.fontSizes.h5};
  font-weight: ${(props) => props.theme.fontWeights.bold};
  color:${(props) => props.theme.colors.mainblue};
`;

export const Field = styled.Text`
  margin-left: ${(props) => props.theme.space[2]};
  font-family: ${(props) => props.theme.fonts.heading};
  font-size: ${(props) => props.theme.fontSizes.body};
  font-weight: ${(props) => props.theme.fontWeights.bold};
`;

export const Heading = styled.Text`
  margin-left: ${(props) => props.theme.space[2]};
  font-family: ${(props) => props.theme.fonts.monospace};
  font-size: ${(props) => props.theme.fontSizes.title};
  font-weight: ${(props) => props.theme.fontWeights.bold};
`;

export const Category = styled.Text`
  margin-left: ${(props) => props.theme.space[2]};
  font-family: ${(props) => props.theme.fonts.heading};
  font-size: ${(props) => props.theme.fontSizes.title};
  font-weight: ${(props) => props.theme.fontWeights.bold};
`;

export const Row = styled.View`
  flex-direction: row;
`;

export const ButtonView = styled.View`

`;

export const Shadow = styled.View`
  shadow-color: ${(props) => props.theme.colors.ui.secondary};
  shadow-offset: 0px 5px;
  shadow-opacity: 0.40;
  shadow-radius: 8px;
  elevation: 13;
`;

export const Center = styled.Text`
  align-self: center;
`;

export const ConfirmingQus = styled.Text`
  align-self: center;
  font-family: ${(props) => props.theme.fonts.heading};
  font-size: ${(props) => props.theme.fontSizes.body};
  font-weight: ${(props) => props.theme.fontWeights.bold};
  margin-left: ${(props) => props.theme.space[2]};

`;

export const OrderCard = styled(Card)`
  background-color: ${(props) => props.theme.colors.bg.primary};
  width: ${bigCardWidth}px;
  height: auto;
  margin: ${margin}px;
  margin-bottom:${2*margin}px;
  align-self: center;
  // align-items:center;
  // justify-content:center;
  border-radius:10px;
  overflow: hidden;
  // border-width: 2px;
  // border-color: ${(props) => props.theme.colors.mainblue};
`;

export const OrderInfoCard = styled(Card)`
  background-color: ${(props) => props.theme.colors.bg.primary};
  width: ${bigCardWidth-2*margin}px;
  height: 100px;
  margin: ${margin}px;
  align-self: center;
  align-items:center;
  justify-content:center;
  border-radius:10px;
  // overflow: hidden;
  shadow-color: ${(props) => props.theme.colors.ui.secondary};
  shadow-offset: 0px 5px;
  shadow-opacity: 0.20;
  shadow-radius: 8px;
  elevation: 13;
`;

export const ButtonCard = styled(Card)`
  background-color: ${(props) => props.color};
  width: ${100}px;
  height:auto;
  margin: ${margin}px;
  align-self: center;
  align-items:center;
  justify-content:center;
  border-radius:20px;
  shadow-color: ${(props) => props.theme.colors.ui.secondary};
  shadow-offset: 0px 5px;
  shadow-opacity: 0.20;
  shadow-radius: 8px;
  elevation: 13;
`;

export const IteamCard = styled(Card)`
  background-color: ${(props) => props.theme.colors.bg.primary};
  width: ${iteamCardWidth}px;
  height auto;
  margin: ${margin}px;
  align-self: center;
  align-items:center;
  justify-content:center;
  border-radius:10px;
  overflow: hidden;
`;

export const TimeCard = styled(Card)`
  height: ${TimeCardHeigth}px;
  width: ${TimeCradWidth}px;
  margin-left: ${(props) => props.theme.space[1]};
`;

export const Time = styled.Text`
  font-family: ${(props) => props.theme.fonts.body};
  font-size: ${(props) => props.theme.fontSizes.button};
  margin-top:${(props) => props.theme.space[1]};
  align-self: center;
`;

export const LoadingContainer = styled.View`
  position: absolute;
  top: 50%;
  left: 50%;
`;

export const Loading = styled(ActivityIndicator)`
  margin-left: -25px;
`;

export const HeaderImage = styled(Image)`
  width: ${iteamCardWidth}px;
  height: ${100}px;
`;
