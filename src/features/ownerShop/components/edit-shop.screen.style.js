import styled from "styled-components/native";
import {Card,} from "react-native-paper";
import { CheckBox } from "react-native-elements";

import { Text } from "../../../components/typography/text.component";

const WorkingHoursCardHeight=80;
const TimeCardHeigth=30;
const TimeCradWidth=30;

export const WorkingHoursCard = styled(Card)`
  height: ${WorkingHoursCardHeight}px;
  margin-top: ${(props) => props.theme.space[2]};
  padding: ${(props) => props.theme.space[1]};
`;

export const TimeCard = styled(Card)`
  height: ${TimeCardHeigth}px;
  width: ${TimeCradWidth}px;
  margin: ${(props) => props.theme.space[2]};
`;

export const Title = styled(Text)`
  font-family: ${(props) => props.theme.fonts.heading};
  font-size: ${(props) => props.theme.fontSizes.title};
  margin-top:${(props) => props.theme.space[2]};
`;

export const Day = styled(Text)`
  font-family: ${(props) => props.theme.fonts.heading};
  font-size: ${(props) => props.theme.fontSizes.body};
`;

export const Time = styled(Text)`
  font-family: ${(props) => props.theme.fonts.body};
  font-size: ${(props) => props.theme.fontSizes.button};
  margin-top:${(props) => props.theme.space[1]};
  align-self: center;
`;

export const Center = styled(Text)`
  align-self: center;
  font-family: ${(props) => props.theme.fonts.body};
  font-size: ${(props) => props.theme.fontSizes.body};
`;

export const Row = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const ViewIsTemClose = styled.View`
  flex-direction: row;
  align-self: center;
  margin-vertical:${(props) => props.theme.space[2]};
`;

export const SaveButton = styled.View`
  border-width: 1px;
  borderColor:  ${(props) => props.theme.colors.mainblue};
  borderRadius: 5px;
  background-color: ${(props) => props.theme.colors.mainblue}; 
`;

export const StyledCheckBox = styled(CheckBox)`
  color: red;
`;

