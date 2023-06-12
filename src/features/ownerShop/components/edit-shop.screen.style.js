import React from "react";
import styled from "styled-components/native";
import {Card,} from "react-native-paper";

const WorkingHoursCardHeight=80;
const TimeCardHeigth=30;
const TimeCradWidth=30;

export const WorkingHoursCard = styled(Card)`
    height: ${WorkingHoursCardHeight}px;
    margin-top: ${(props) => props.theme.space[2]};
`;

export const TimeCard = styled(Card)`
    height: ${TimeCardHeigth}px;
    width: ${TimeCradWidth}px;
    margin: ${(props) => props.theme.space[2]};
`;

export const Title = styled.Text`
  font-family: ${(props) => props.theme.fonts.heading};
  font-size: ${(props) => props.theme.fontSizes.title};
  margin-top:${(props) => props.theme.space[2]};
`;

export const Day = styled.Text`
  font-family: ${(props) => props.theme.fonts.heading};
  font-size: ${(props) => props.theme.fontSizes.body};
  margin:${(props) => props.theme.space[1]};
`;

export const Time = styled.Text`
  font-family: ${(props) => props.theme.fonts.body};
  font-size: ${(props) => props.theme.fontSizes.button};
  margin-top:${(props) => props.theme.space[1]};
  align-self: center;
`;

export const Center = styled.Text`
  align-self: center;
`;

export const Row = styled.View`
  flex-direction: row;
`;

export const ViewIsTemClose = styled.View`
  flex-direction: row;
  align-self: center;
  margin-vertical:${(props) => props.theme.space[2]};
`;

