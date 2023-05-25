import styled from "styled-components/native";
import { Text } from "../../../components/typography/text.component";
import { View, Image } from "react-native";

export const ShopDetailsContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: flex-start;
  background-color: #ffffff;
  padding: 16px;
`;

export const ShopHeaderBackground = styled.ImageBackground`
  width: 100%;
  height: 200px;
  resize-mode: cover;
  border-bottom-left-radius: 16px;
  border-bottom-right-radius: 16px;
`;

export const ShopName = styled(Text)`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 16px;
  color: #333333;
`;

export const ShopInfoContainer = styled(View)`
  margin-bottom: 16px;
`;

export const InfoLabel = styled(Text)`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 8px;
  color: #555555;
`;

export const InfoText = styled(Text)`
  font-size: 16px;
  color: #777777;
`;

export const MenuContainer = styled(View)`
  margin-bottom: 16px;
`;

export const CategoryText = styled(Text)`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 8px;
  color: #333333;
`;

export const MenuItemContainer = styled(View)`
  flex-direction: row;
  align-items: center;
  margin-bottom: 8px;
`;

export const MenuItemImage = styled(Image)`
  width: 80px;
  height: 80px;
  margin-right: 16px;
  border-radius: 8px;
`;

export const MenuItemText = styled(Text)`
  font-size: 16px;
  color: #555555;
`;
