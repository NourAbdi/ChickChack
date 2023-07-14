import styled from "styled-components/native";
import { List } from "react-native-paper";
import { Text } from "../../../components/typography/text.component";
import { SafeArea } from "../../../components/utility/safe-area.component";
import {TouchableOpacity,TextInput } from "react-native";

export const TransparentSafeArea = styled(SafeArea)`
  background-color: transparent;
`;
export const ListItem = styled(List.Item)`
  padding: ${(props) => props.theme.space[3]};
  background-color: ${props => props.theme.colors.mainblue};
  margin-top: ${(props) => props.theme.space[1]};
`;

export const AvatarContainer = styled.View`
  align-items: center;
`;

export const Row = styled.View`
  flex-direction: row;
`;

export const Flex = styled.View`
  flex:1;
`;

export const InfoContainer = styled.View`
  margin: ${(props) => props.theme.space[1]};
  margin-top: ${(props) => props.theme.space[2]};
  border-width:2px;
  border-color:${props => props.theme.colors.mainblue};
  border-radius:10px;
  padding: ${(props) => props.theme.space[2]};
`;

export const MarginTop = styled.View`
  margin-top:50px;
`;

export const ListTiltle = styled.Text`
  font-family: ${(props) => props.theme.fonts.heading};
  font-size: ${(props) => props.theme.fontSizes.title};
  font-weight: ${(props) => props.theme.fontWeights.regular};
  color:${props => props.theme.colors.text.inverse};
`;

export const Info = styled.Text`
  font-family: ${(props) => props.theme.fonts.body};
  font-size: ${(props) => props.theme.fontSizes.body};
  font-weight: ${(props) => props.theme.fontWeights.regular};
`;

export const ButtonText = styled.Text`
  font-family: ${(props) => props.theme.fonts.heading};
  font-size: ${(props) => props.theme.fontSizes.button};
  font-weight: ${(props) => props.theme.fontWeights.regular};
  color:${props => props.theme.colors.text.inverse};
`;

export const NameButton = styled(TouchableOpacity)`
  margin-bottom: ${(props) => props.theme.space[1]};
  margin-top: ${(props) => props.theme.space[1]};
  background-color: ${(props) => props.theme.colors.mainblue};
  align-items: center;
  justify-content: center;
  border-radius:10px;
  width:100px;
  padding: ${(props) => props.theme.space[1]};
`;

export const LangButton = styled(TouchableOpacity)`
  margin: ${(props) => props.theme.space[2]};
  background-color: ${(props) => props.theme.colors.mainblue};
  align-items: center;
  justify-content: center;
  border-radius:10px;
  width:100px;
  padding: ${(props) => props.theme.space[1]};
  opacity: ${(props) => (props.isSelected ? 1 : 0.5)};
`;

export const TextInputStyle = styled(TextInput)`
  height: 40px;
  border-color: gray;
  border-width: 1px;
  margin-bottom: 10px;
  padding-horizontal: 10px;
`;