import styled from "styled-components/native";
import { ActivityIndicator, Colors } from "react-native-paper";
import { Dimensions } from "react-native";

export const Loading = styled(ActivityIndicator)`
  margin-left: -25px;
`;

export const LoadingContainer = styled.View`
  flex: 1;
  justify-content: center;
`;

export const ShopItemContainer = styled.View`
  flex: 1;
  padding: 16px;
  border-bottom-width: 1px;
  border-bottom-color: lightgray;
  margin: 8px;
  width: ${(Dimensions.get("window").width - 48) / 2}px;
`;

export const ShopImage = styled.Image`
  width: 100%;
  height: 150px;
  margin-bottom: 16px;
`;

export const ShopNameContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const ShopNameText = styled.Text`
  font-size: 16px;
`;

export const ShopsContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
`;