import React, { useContext, useState } from "react";
import { List } from "react-native-paper";
import { useTranslation } from "react-i18next";
import { View, StyleSheet, Text } from "react-native";

import { colors } from "../../../infrastructure/theme/colors";
import { AuthenticationContext } from "../../../services/authentication/authentication.context";

import { 
  TransparentSafeArea,
  ListItem,
  ListTiltle,
  Info,
  InfoContainer,
  NameButton,
  ButtonText,
  Row,
  Flex,
  LangButton,
  MarginTop,
} from "../components/settings.screen.style";

 import{
  showProfileFunc,
  showLanguagesFunc,
} from "../components/settings.screen.component";
 

export const UserProfileScreen = () => {
  const { onLogout,signOutUser, user } = useContext(AuthenticationContext);
  const [showProfileInputs, setShowProfileInputs] = useState(false);
  const [showLanguages, setShowLanguages] = useState(false);
  const { t, i18n } = useTranslation();
  const language = i18n.language;
  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang, () => {
    });
  };

  const handleProfileClick = () => {
    setShowProfileInputs(!showProfileInputs);
    // setIsChangeName(false);
  };

  const handleLanguageClick = () => {
    setShowLanguages(!showLanguages);
  };

  return (
    <TransparentSafeArea>
      <MarginTop/>
      <List.Section>
        <ListItem
          title={<ListTiltle>My profile</ListTiltle>}
          left={(props) => (
            <List.Icon {...props} color={colors.text.inverse} icon="account" />
          )}
          onPress={handleProfileClick}
        />
        {showProfileFunc(showProfileInputs,user.name,user.phoneNumber,user.role)}
        <ListItem
          title={<ListTiltle>Language</ListTiltle>}
          left={(props) => <List.Icon {...props}  color={colors.text.inverse} icon="earth" />}
          onPress={handleLanguageClick}
        />
        {showLanguagesFunc(showLanguages,i18n,language)}
        <ListItem
          title={<ListTiltle>{t("logout")}</ListTiltle>}
          left={(props) => (
            <List.Icon {...props} color={colors.text.inverse} icon="door" />
          )}
          onPress={signOutUser}
        />
      </List.Section>
    </TransparentSafeArea>
  );
};

