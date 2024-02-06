import React, { useContext, useState } from "react";
import { ScrollView, Alert } from "react-native";
import { List } from "react-native-paper";
import { useTranslation } from "react-i18next";
import { colors } from "../../../infrastructure/theme/colors";
import { AuthenticationContext } from "../../../services/authentication/authentication.context";

import {
  TransparentSafeArea,
  ListItem,
  ListTiltle,
  MarginTop,
} from "../components/settings.screen.style";
import {
  showProfileFunc,
  showLanguagesFunc,
} from "../components/settings.screen.component";

export const UserProfileScreen = () => {
  const { signOutUser, user, setUserName, removeUser } = useContext(AuthenticationContext);
  const [showProfileInputs, setShowProfileInputs] = useState(false);
  const [showLanguages, setShowLanguages] = useState(false);
  const { t, i18n } = useTranslation();
  const language = i18n.language;

  const handleProfileClick = () => {
    setShowProfileInputs(!showProfileInputs);
  };

  const handleLanguageClick = () => {
    setShowLanguages(!showLanguages);
  };

  const handledeleteClick = () => {
    // Show an alert to double-check the account deletion
    Alert.alert(
      t("delete account confirmation"),
      t("are you sure you want to delete your account?"),
      [
        {
          text: t("cancel"),
          style: "cancel",
        },
        {
          text: t("delete"),
          style: "destructive",
          onPress: async () => {
            // User confirmed, proceed with account deletion
            await removeUser(user.uid);

            // Show an alert to inform the user that the deletion is completed
            Alert.alert(
              t("account deleted"),
              t("your account has been successfully deleted.")
            );
          },
        },
      ],
      { cancelable: true }
    );
  };

  const handleLogOutClick = () => {
    // Show an alert to double-check the account deletion
    Alert.alert(
      t("Logout confirmation"),
      t("are you sure you want to logout?"),
      [
        {
          text: t("cancel"),
          style: "cancel",
        },
        {
          text: t("logout"),
          style: "destructive",
          onPress: async () => {
            // User confirmed, proceed with account deletion
            await signOutUser() ;
            // Show an alert to inform the user that the deletion is completed
            Alert.alert(
              t("logout success"),
              t("You have been successfully logged out.")
            );
          },
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <TransparentSafeArea>
      <ScrollView>
        <MarginTop />
        <List.Section>
          <ListItem
            title={<ListTiltle>{t("My profile")}</ListTiltle>}
            left={(props) => (
              <List.Icon {...props} color={colors.text.inverse} icon="account" />
            )}
            onPress={handleProfileClick}
          />
          {showProfileFunc(t, showProfileInputs, user.name, user.phoneNumber, user.role, user.uid, setUserName)}
          <ListItem
            title={<ListTiltle>{t("language")}</ListTiltle>}
            left={(props) => <List.Icon {...props} color={colors.text.inverse} icon="earth" />}
            onPress={handleLanguageClick}
          />
          {showLanguagesFunc(showLanguages, i18n, t, language)}
          <ListItem
            title={<ListTiltle>{t("delete my account")}</ListTiltle>}
            left={(props) => (
              <List.Icon {...props} color={colors.text.inverse} icon="delete" />
            )}
            onPress={handledeleteClick}
          />
          <ListItem
            title={<ListTiltle>{t("logout")}</ListTiltle>}
            left={(props) => (
              <List.Icon {...props} color={colors.text.inverse} icon="door" />
            )}
            onPress={handleLogOutClick}
          />
        </List.Section>
      </ScrollView>
    </TransparentSafeArea>
  );
};

