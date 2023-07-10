import React, { useContext } from "react";
import { List } from "react-native-paper";
import { colors } from "../../../infrastructure/theme/colors";
import { AuthenticationContext } from "../../../services/authentication/authentication.context";

import {
  TransparentSafeArea,
  SettingsItem,
  AvatarContainer,
} from "../components/application.screen"

import { useTranslation } from "react-i18next";

export const UserProfileScreen = () => {
  const { onLogout, user } = useContext(AuthenticationContext);
  const { t } = useTranslation();
  
  return (
      <TransparentSafeArea>
        {/* <List.Section> */}
          
          <SettingsItem
            title={t("logout")}
            left={(props) => (
              <List.Icon {...props} color={colors.ui.secondary} icon="door" />
            )}
            onPress={onLogout}
          />
        {/* </List.Section> */}
      </TransparentSafeArea>
  );
};
