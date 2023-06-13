import React from "react";
import { Animated,Platform,Image,Dimensions,ImageBackground } from "react-native";
import styled from "styled-components/native";
import { Card,IconButton,ActivityIndicator } from "react-native-paper";
import {FontAwesome } from "@expo/vector-icons";
import { theme } from "../../../infrastructure/theme";

//Cards sizes
const margin = 5;
const screenWidth = Dimensions.get('window').width;
const BigCardWidth = screenWidth - 2*margin; 
const BigCardHeight = 300; 

export const Title = styled.Text`
  margin: ${(props) => props.theme.space[3]};
  font-family: ${(props) => props.theme.fonts.heading};
  font-size: ${(props) => props.theme.fontSizes.title};
  font-weight: ${(props) => props.theme.fontWeights.regular};
`;

export const Row = styled.View`
  flex-direction: row;
`;

export const OrderCard = styled(Card)`
  background-color: ${(props) => props.theme.colors.bg.primary};
  width: ${BigCardWidth}px;
  height: ${(props) => (props.isExpanded ? "auto" : `${BigCardHeight}px`)};
  margin: ${margin}px;
  align-self: center;
  align-items:center;
  justify-content:center;
  border-radius:20px;
  overflow: hidden;
  border-width: 2px;
  border-color: ${(props) => props.theme.colors.mainblue};
`;

export const OrderInfoCard = styled(Card)`
  background-color: ${(props) => props.theme.colors.bg.primary};
  width: ${BigCardWidth/2}px;
  height: ${BigCardHeight/2}px;
  margin: ${margin}px;
  align-self: center;
  align-items:center;
  justify-content:center;
  border-radius:20px;
  overflow: hidden;
  border-width: 2px;
  border-color: ${(props) => props.theme.colors.mainblue};
`;

export const ButtonCard = styled(Card)`
  background-color: ${(props) => props.theme.colors.bg.primary};
  width: ${BigCardWidth/4-4*margin}px;
  height: ${BigCardHeight/4}px;
  margin: ${margin}px;
  align-self: center;
  align-items:center;
  justify-content:center;
  border-radius:20px;
  overflow: hidden;
  border-width: 2px;
  border-color: ${(props) => props.theme.colors.mainblue};
`;


