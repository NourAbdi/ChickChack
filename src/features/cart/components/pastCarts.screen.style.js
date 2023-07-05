import styled from "styled-components/native";
import { Image,TouchableOpacity } from "react-native";

export const ViewOrder = styled.View`
  background-color: ${(props) => props.theme.colors.ui.tertiary};
  padding: 4px;
  margin-bottom:${(props) => props.theme.space[3]};
`;

export const TitleRow = styled.View`
  padding: 10px;
  flex-direction: row;
  border-bottom-width: 1px;
  border-bottom-color: ${(props) => props.theme.colors.ui.secondary};
`;
export const Flex = styled.View`
  flex:1;
`;

export const Line = styled.View`
  border-bottom-width: 1px;
  border-bottom-color: ${(props) => props.theme.colors.ui.secondary};
  margin-top:2px;
`;

export const Row = styled.View`
  flex-direction: row;
`;

export const CartItem = styled.View`
  flex-direction: row;
  margin-bottom:${(props) => props.theme.space[3]};
`;

export const Center = styled.View`
    align-self:center;
`;

export const ShopIcon = styled(Image)`
  width:60px;
  height:60px;
  margin:${(props) => props.theme.space[2]};
  border-radius: 34px;
  border-width: 1px;
  border-color:  ${(props) => props.theme.colors.ui.secondary};
`;


export const CartItemImage = styled(Image)`
  width:50px;
  height:50px;
  align-self:center;
`;

export const ShopName = styled.Text`
  font-family: ${(props) => props.theme.fonts.body};
  font-size: ${(props) => props.theme.fontSizes.body};
  margin:${(props) => props.theme.space[2]};
`;

export const Caption = styled.Text`
  fontSize:  ${(props) => props.theme.fontSizes.caption};
  fontWeight: ${(props) => props.theme.fontWeights.medium};
  color: ${(props) => props.theme.colors.text.secondary};
`;

export const Info = styled.Text`
  fontSize:  ${(props) => props.theme.fontSizes.button};
  font-family: ${(props) => props.theme.fonts.body};
`;
