

import styled from "styled-components/native";
import { Image,TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";


export const Title = styled.Text`
  font-family: ${(props) => props.theme.fonts.heading};
  font-size: ${(props) => props.theme.fontSizes.h4};
  margin:${(props) => props.theme.space[2]};
  align-self:center;
`;

export const ItemName = styled.Text`
  font-family: ${(props) => props.theme.fonts.body};
  font-size: ${(props) => props.theme.fontSizes.title};
  margin-bottom:${(props) => props.theme.space[1]};
`;

export const AvailableOptionsText = styled.Text`
  font-family: ${(props) => props.theme.fonts.body};
  font-size: ${(props) => props.theme.fontSizes.button};
  margin-bottom:${(props) => props.theme.space[1]};
  color: ${(props) => props.theme.colors.text.inverse};
`;

export const AvailableOptionsButton = styled(TouchableOpacity)`
  margin-bottom: ${(props) => props.theme.space[1]};
  margin-right: ${(props) => props.theme.space[2]};
  background-color: ${(props) => props.theme.colors.mainblue};
  align-items: center;
  justify-content: center;
  border-radius:5px;
  padding:5px;
  opacity: ${(props) => (props.isSelected ? 1 : 0.5)};
`;

export const SummaryInfo = styled.Text`
  font-family: ${(props) => props.theme.fonts.body};
  font-size: ${(props) => props.theme.fontSizes.title};
`;

export const Info = styled.Text`
  font-family: ${(props) => props.theme.fonts.body};
  font-size: ${(props) => props.theme.fontSizes.body};
`;

export const Price = styled.Text`
  font-family: ${(props) => props.theme.fonts.body};
  font-size: ${(props) => props.theme.fontSizes.caption};
`;

export const ViewItem = styled.View`
  width:100%; 
  marginBottom:50px;
  borderColor:${(props) => props.theme.colors.mainblue};
  borderWidth:0px;
`;

export const Flex = styled.View`
  flex:1;
`;

export const Row = styled.View`
  flex-direction:row;
  align-items:center;
  margin-bottom: ${(props) => props.theme.space[1]};
`;

export const ItemCard = styled.View`
  flex-direction:row;
  align-items:center;
  margin-bottom: ${(props) => props.theme.space[2]};
  background-color: rgba(200, 200, 200, 0.2);
`;

export const TotalContainer = styled.View`
  borderTopWidth: 1px;
  borderColor: #ccc;
  paddingTop: 16px;
  alignItems:center;
`;

export const ShopOptionsContainer = styled.View`
  flexDirection: row;
  marginBottom: 8px;
  alignItems:center;
  alignSelf:center;
`;

export const ViewCounter = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 6px;
  background-color:black;
  padding: 6px;
  border-radius: 10px;
  margin:${(props) => props.theme.space[1]};
  margin-left:${(props) => props.theme.space[4]};
  align-self: flex-end;
`;

export const CounterButton = styled(TouchableOpacity)`
  background-color: white;
  width: 30px;
  aspect-ratio:1;
  align-items: center;
  justify-content: center;
  border-radius: 34px;
`;

export const CheckOutButton = styled(TouchableOpacity)`
  margin-bottom: ${(props) => props.theme.space[2]};
  background-color: ${(props) => props.theme.colors.mainblue};
  align-items: center;
  justify-content: center;
  border-radius:10px;
  align-self:center;
  width:90%;
  height:50px;
`;

export const CheckOutText = styled.Text`
  font-family: ${(props) => props.theme.fonts.body};
  fontSize:  ${(props) => props.theme.fontSizes.h5};
  color: ${(props) => props.theme.colors.text.inverse};
`;

export const Count = styled.Text`
  fontSize:  ${(props) => props.theme.fontSizes.button};
  fontWeight: ${(props) => props.theme.fontWeights.medium};
  color: ${(props) => props.theme.colors.text.inverse};
`;

export const LeftIcon = styled(Icon)`
  margin:${(props) => props.theme.space[2]};
  align-self:center;
`;

export const ShopIcon = styled(Image)`
  width:50px;
  height:50px;
  margin:${(props) => props.theme.space[2]};
  border-radius: 34px;
  border-width: 1px;
  border-color:  ${(props) => props.theme.colors.ui.secondary};
  
`;
export const ItemImage = styled(Image)`
  width: 80px;
  height: 80px;
  borderRadius: 8px;
  marginRight: 8px;
  align-self:center;

`;

