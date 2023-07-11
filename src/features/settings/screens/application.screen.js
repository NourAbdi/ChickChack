import React, { useContext } from "react";
import { StyleSheet, View } from "react-native";
import { List, Avatar } from "react-native-paper";
import { Text } from "../../../components/typography/text.component";
import { Spacer } from "../../../components/spacer/spacer.component";
import { SafeArea } from "../../../components/utility/safe-area.component";
import { colors } from "../../../infrastructure/theme/colors";
import { AuthenticationContext } from "../../../services/authentication/authentication.context";

import {
  TransparentSafeArea,
  SettingsItem,
  AvatarContainer,
} from "../components/application.screen"

import { useTranslation } from "react-i18next";

export const ApplicationScreen = ({ navigation }) => {
  const { onLogout, user } = useContext(AuthenticationContext);
  const { t, i18n } = useTranslation();
  const language = i18n.language;

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang, () => {
    });
  };

  return (
      <TransparentSafeArea>
        <AvatarContainer>
          <Avatar.Icon
            size={180}
            icon="human"
            backgroundColor={colors.brand.primary}
          />
          <Spacer position="top" size="large">
          </Spacer>
        </AvatarContainer>

        <List.Section>
          <View style={containerStyle.languageSwitcher}>
            <Text style={containerStyle.languageText}>{t("language")}</Text>
            <View style={containerStyle.languageButtons}>
              <Text
                style={[
                  containerStyle.languageButton,
                  language === "en" && containerStyle.activeLanguageButton,
                ]}
                onPress={() => changeLanguage("en")}
              >
                English
              </Text>
              <Text
                style={[
                  containerStyle.languageButton,
                  language === "ar" && containerStyle.activeLanguageButton,
                ]}
                onPress={() => changeLanguage("ar")}
              >
                العربية
              </Text>
              <Text
                style={[
                  containerStyle.languageButton,
                  language === "he" && containerStyle.activeLanguageButton,
                ]}
                onPress={() => changeLanguage("he")}
              >
                עברית
              </Text>
            </View>
          </View>
          <SettingsItem
            title={t("logout")}
            left={(props) => (
              <List.Icon {...props} color={colors.ui.secondary} icon="door" />
            )}
            onPress={onLogout}
          />
        </List.Section>
      </TransparentSafeArea>
  );
};

const containerStyle = StyleSheet.create({
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  languageSwitcher: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
  },
  languageText: {
    fontSize: 16,
    marginRight: 5,
  },
  languageButtons: {
    flexDirection: "row",
  },
  languageButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    fontSize: 16,
    color: "#2683C0",
    marginRight: 5,
    borderWidth: 1,
    borderColor: "#2683C0",
    borderRadius: 5,
  },
  activeLanguageButton: {
    backgroundColor: "#2683C0",
    color: "#FFF",
  },
});
