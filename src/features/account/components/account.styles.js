import styled from "styled-components/native";
import { Button, TextInput } from "react-native-paper";
import { colors } from "../../../infrastructure/theme/colors";
import { Text } from "../../../components/typography/text.component";

export const AccountBackground2 = styled.ImageBackground.attrs({
  source: require("../../../../assets/food2.jpg"),
})`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const AccountBackground1 = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const AccountCover = styled.View`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.1);
`;

export const AccountContainer = styled.View`
  background-color: rgba(255, 255, 255, 0.8);
  padding: ${(props) => props.theme.space[4]};
  margin-top: ${(props) => props.theme.space[2]};
`;

export const AccountCover1 = styled.View`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 1);
`;

export const AccountContainer1 = styled.View`
  background-color: rgba(255, 255, 255, 0.7);
  padding: ${(props) => props.theme.space[4]};
  margin-top: ${(props) => props.theme.space[2]};
`;

export const AuthButton = styled(Button).attrs({
  // color: colors.brand.primary,
  // color: "#2785C4",
  color: "#2683C0",
  higth:60,
  width:300,
})`
  padding: ${(props) => props.theme.space[2]};
`;

export const AuthInput = styled(TextInput)`
  width: 300px;
`;

export const Title1 = styled(Text)`
  font-size: 60px;
  color:#2683C0;
  align-items: center;
  
`;

export const Title = styled(Text)`
  font-size: 60px;
  color:#2683C0;
`;

export const ErrorContainer = styled.View`
  max-width: 300px;
  align-items: center;
  align-self: center;
  margin-top: ${(props) => props.theme.space[2]};
  margin-bottom: ${(props) => props.theme.space[2]};
`;

export const AnimationWrapper1 = styled.View`
  width: 40%;
  height: 100%;
  margin-left: 85px;
  position: absolute;
  // position: flex-end;
  // alignitema: flex-end;
  // justifycontent: flex-end;
  // alignitema: center;
  // justifycontent: center;
  // padding: ${(props) => props.theme.space[2]};
`;

export const AnimationWrapper2 = styled.View`
  width: 100%;
  height: 40%;
  alignitema: center;
  justifycontent: center;
  top: 50px;
  padding: ${(props) => props.theme.space[2]};
  // position: absolute;
`;
