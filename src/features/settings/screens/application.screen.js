import React, { useContext, useState } from "react";
import { List } from "react-native-paper";
import { useTranslation } from "react-i18next";
import { ScrollView } from "react-native";

import { colors } from "../../../infrastructure/theme/colors";
import { ApplicationContext } from "../../../services/application/application.context";
import {
  TransparentSafeArea,
  ListItem,
  ListTiltle,
  Info,
  InfoContainer,
  MarginTop,
} from "../components/settings.screen.style";
import {
  showWorkingHoursFunc,
  showTermsFunc,
  showContactFunc,
} from "../components/settings.screen.component";

export const ApplicationScreen = ({ navigation }) => {
  const { applicationData } = useContext(ApplicationContext);
  const { t, i18n } = useTranslation();
  const [showWorkingHours, setshowWorkingHours] = useState(false);
  const [showDeliveryHours, setshowDeliveryHours] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const [showContact, setShowContact] = useState(false);

  const handleWorkingHoursClick = () => {
    setshowWorkingHours(!showWorkingHours);
  };

  const handleDeliveryHoursClick = () => {
    setshowDeliveryHours(!showDeliveryHours);
  };

  const handleTermsClick = () => {
    setShowTerms(!showTerms);
  };

  const handleContactClick = () => {
    setShowContact(!showContact);
  };

  return (
    <TransparentSafeArea>
<ScrollView>
      <MarginTop />
      <List.Section>
        <ListItem
          title={<ListTiltle>{t("workingHours")}</ListTiltle>}
          left={(props) => (
            <List.Icon {...props} color={colors.text.inverse} icon="clock" />
          )}
          onPress={handleWorkingHoursClick}
        />
        {showWorkingHoursFunc(t, showWorkingHours, applicationData.workingHours)}
        <ListItem
          title={<ListTiltle>{t("Delivery hours")}</ListTiltle>}
          left={(props) => (
            <List.Icon {...props} color={colors.text.inverse} icon="truck" />
          )}
          onPress={handleDeliveryHoursClick}
        />
        {showWorkingHoursFunc(t, showDeliveryHours, applicationData.deliveryHours)}
        <ListItem
          title={<ListTiltle>{t("Terms of use")}</ListTiltle>}
          left={(props) => (
            <List.Icon {...props} color={colors.text.inverse} icon="file-document" />
          )}
          onPress={handleTermsClick}
        />
        {showTermsFunc(showTerms, applicationData.terms)}
        <ListItem
          title={<ListTiltle>{t("Contact us")}</ListTiltle>}
          left={(props) => (
            <List.Icon {...props} color={colors.text.inverse} icon="phone" />
          )}
          onPress={handleContactClick}
        />
        {showContactFunc(t, showContact, applicationData.phone)}
      </List.Section>
      </ScrollView>
    </TransparentSafeArea>
  );
};

