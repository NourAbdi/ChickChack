import styled from "styled-components/native";
import { Image } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { Text } from "../../../components/typography/text.component";


export const Title = styled(Text)`
  font-family: ${(props) => props.theme.fonts.heading};
  font-size: ${(props) => props.theme.fontSizes.title};
  margin:${(props) => props.theme.space[2]};
`;

export const ShopName = styled(Text)`
  font-family: ${(props) => props.theme.fonts.body};
  font-size: ${(props) => props.theme.fontSizes.body};
  margin:${(props) => props.theme.space[2]};
`;

export const ViewShop = styled.View`
  flex-direction: row;
  width:100%; 
  marginBottom:5px;
  align-items: center;
  background-color: rgba(200, 200, 200, 0.5);
`;

export const ShopIcon = styled(Image)`
  width:50px;
  height:50px;
  margin:${(props) => props.theme.space[2]};
  border-radius: 34px;
  border-width: 1px;
  border-color:  ${(props) => props.theme.colors.ui.secondary};
`;

export const RightIcon = styled(Icon)`
  margin:${(props) => props.theme.space[2]};
`;


