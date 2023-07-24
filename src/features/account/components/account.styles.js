import styled from "styled-components/native";
import { Text } from "../../../components/typography/text.component";
import { TextInput,TouchableOpacity} from "react-native";

export const Header = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: ${(props) => props.theme.space[2]};
`;

export const LeftTitle = styled(Text)`
  font-family: ${(props) => props.theme.fonts.heading};
  font-size: ${(props) => props.theme.fontSizes.h2};
  color:${(props) => props.theme.colors.mainblue};
  margin-right:-15px;
  align-self: center;
`;

export const RightTitle = styled(Text)`
  font-family: ${(props) => props.theme.fonts.heading};
  font-size: ${(props) => props.theme.fontSizes.h2};
  color:${(props) => props.theme.colors.mainblue};
  margin-left:-25px;
  align-self: center;
`;

export const AnimationLightning = styled.View`
  width:100px;
  height: 100px;
  align-items: center;
  align-self: center;
  justify-content: center;
`;

export const VerificationInput = styled(TextInput)`
  border-color:${(props) => props.theme.colors.mainblue};
  background-color: ${(props) => props.theme.colors.ui.tertiary};
  border-width:1px;
  border-radius: 10px;
  padding: ${(props) => props.theme.space[3]};
`;

export const BodyText = styled(Text)`
  font-family: ${(props) => props.theme.fonts.body};
  font-size: ${(props) => props.theme.fontSizes.title};
  margin: ${(props) => props.theme.space[2]};
`;

export const ButtonText = styled(Text)`
  font-family: ${(props) => props.theme.fonts.heading};
  font-size: ${(props) => props.theme.fontSizes.button};
  font-weight: ${(props) => props.theme.fontWeights.regular};
  color:${props => props.theme.colors.text.inverse};
`;

export const ButtonView = styled(TouchableOpacity)`
  margin-bottom: ${(props) => props.theme.space[1]};
  margin-top: ${(props) => props.theme.space[1]};
  background-color: ${(props) => props.theme.colors.mainblue};
  align-items: center;
  justify-content: center;
  border-radius:10px;
  width:auto;
  padding: ${(props) => props.theme.space[3]};
  opacity: ${(props) => (props.isSelected ? 0.5 : 1)};
`;




