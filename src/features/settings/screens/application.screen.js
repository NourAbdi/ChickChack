import React, { useContext,useState } from "react";
import { List } from "react-native-paper";
import { useTranslation } from "react-i18next";

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
import{
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
         <MarginTop/>
      <List.Section>
        <ListItem
          title={<ListTiltle>Working hours</ListTiltle>}
          left={(props) => (
            <List.Icon {...props} color={colors.text.inverse} icon="clock" />
          )}
          onPress={handleWorkingHoursClick}
        />
        {showWorkingHoursFunc(showWorkingHours,applicationData.workingHours)}
        <ListItem
          title={<ListTiltle>Delivery hours</ListTiltle>}
          left={(props) => (
            <List.Icon {...props} color={colors.text.inverse} icon="truck" />
          )}
          onPress={handleDeliveryHoursClick}
        />
        {showWorkingHoursFunc(showDeliveryHours,applicationData.deliveryHours)}
        <ListItem
          title={<ListTiltle>Terms of us</ListTiltle>}
          left={(props) => (
            <List.Icon {...props} color={colors.text.inverse} icon="file-document" />
          )}
          onPress={handleTermsClick}
        />
        {showTermsFunc(showTerms,applicationData.terms)}
        <ListItem
          title={<ListTiltle>Contact us</ListTiltle>}
          left={(props) => (
            <List.Icon {...props} color={colors.text.inverse} icon="phone" />
          )}
          onPress={handleContactClick}
        />
        {showContactFunc(showContact,applicationData.phone)}
      </List.Section>
    </TransparentSafeArea>
  );
};

