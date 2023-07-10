import styled from "styled-components/native";
import { List } from "react-native-paper";
import { Text } from "../../../components/typography/text.component";
import { SafeArea } from "../../../components/utility/safe-area.component";

export const TransparentSafeArea = styled(SafeArea)`
  background-color: transparent;
`;
export const SettingsItem = styled(List.Item)`
  padding: ${(props) => props.theme.space[3]};
  background-color: rgba(255, 255, 255, 0.4);
`;
export const AvatarContainer = styled.View`
  align-items: center;
`;