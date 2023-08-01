import styled from "styled-components/native";
import { TouchableOpacity } from "react-native";
import { Text } from "../../../components/typography/text.component";
import { theme } from "../../../infrastructure/theme";

const HEADER_HEIGHT = theme.headerHeigth;

export const HeaderTitle = styled(Text)`
    font-family: ${(props) => props.theme.fonts.heading};
    font-size: ${(props) => props.theme.fontSizes.title};
    color:${(props) => props.theme.colors.text.inverse};
`;

export const HeaderView = styled.View`
    flex-direction: row;
    align-items: center;
    position:absolute;
    margin-top:${HEADER_HEIGHT/3}PX;
    padding:${(props) => props.theme.space[2]};
`;

export const LeftHeaderButton = styled(TouchableOpacity)`
    flex: 1;
    margin-top:10px;
`;

export const Flex =  styled.View`
    flex: 1;
`;