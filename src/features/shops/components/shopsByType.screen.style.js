import styled from "styled-components/native";


export const HeaderTitle = styled.Text`
    font-family: ${(props) => props.theme.fonts.heading};
    font-size: ${(props) => props.theme.fontSizes.h4};
    color:${(props) => props.theme.colors.text.inverse};
`;