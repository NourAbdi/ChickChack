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

export const ButtonText = styled(Text)`
  font-size: 16px;
  color: #ffffff;
  text-align: center;
  padding: 8px 16px;
  background-color: #333333;
  border-radius: 8px;
  margin-top: 8px;
`;

export const QuantityContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 8px;
`;

export const QuantityButton = styled.Text`
  font-size: 20px;
  padding-horizontal: 10px;
`;

export const ItemQuantity = styled.Text`
  font-size: 16px;
  margin-horizontal: 10px;
`;

export const MenuItemImage = styled(Image)`
  width: 100px;
  height: 100px;
  border-radius: 8px;
`;

export const styles = {
  shopIcon: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginBottom: 16,
  },
  menuItemImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
};
