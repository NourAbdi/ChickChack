import React, { useContext, useState } from "react";
import { List } from "react-native-paper";
import { colors } from "../../../infrastructure/theme/colors";
import { AuthenticationContext } from "../../../services/authentication/authentication.context";
import { TransparentSafeArea, SettingsItem, AvatarContainer } from "../components/application.screen";
import { useTranslation } from "react-i18next";
import { View, TextInput, StyleSheet, Text } from "react-native";

export const UserProfileScreen = () => {
  const { onLogout, user } = useContext(AuthenticationContext);
  const { t } = useTranslation();
  const [showProfileInputs, setShowProfileInputs] = useState(false);
  const [showRole, setShowRole] = useState(false);
  const [selectedRole, setSelectedRole] = useState("");
  const [showLanguages, setShowLanguages] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  
  const handleProfileClick = () => {
    setShowProfileInputs(!showProfileInputs);
  };

  const handleRoleClick = () => {
    setShowRole(!showRole);
  };

  const handleLanguageClick = () => {
    setShowLanguages(!showLanguages);
  };

  const handleFirstNameChange = (text) => {
    setFirstName(text);
  };

  const handleLastNameChange = (text) => {
    setLastName(text);
  };
  
  return (
    <TransparentSafeArea>
      <List.Section>
        <SettingsItem
          title={"myProfile"}
          left={(props) => (
            <List.Icon {...props} color={colors.ui.secondary} icon="account" />
          )}
          onPress={handleProfileClick}
        />
        {showProfileInputs && (
          <View style={styles.profileContainer}>
            <Text>Name:</Text>
            <TextInput
              style={styles.input}
              placeholder="First Name"
              value={firstName}
              onChangeText={handleFirstNameChange}
            />
            <Text>Email:</Text>
            <TextInput
              style={styles.input}
              placeholder="Last Name"
              value={lastName}
              onChangeText={handleLastNameChange}
            />
          </View>
        )}
        {/* Role */}
         <SettingsItem
          title={"role"}
          left={(props) => 
            <List.Icon {...props} color={colors.ui.secondary} icon="account-group" />}
          onPress={handleRoleClick}
        />
         {showRole && (
          <>
            <List.Item
              title="Client"
              onPress={() => setSelectedRole("Client")}
              style={selectedRole === "Client" ? styles.selectedRole : null}
            />
            <List.Item
              title="Shopkeeper"
              onPress={() => setSelectedRole("Shopkeeper")}
              style={selectedRole === "Shopkeeper" ? styles.selectedRole : null}
            />
            <List.Item
              title="Transporter"
              onPress={() => setSelectedRole("Transporter")}
              style={selectedRole === "Transporter" ? styles.selectedRole : null}
            />
          </>
        )}
        {/* language */}
        <SettingsItem
          title={"language"}
          left={(props) => <List.Icon {...props} color={colors.ui.secondary} icon="earth" />}
          onPress={handleLanguageClick}
        />
        {showLanguages && (
          <>
            <List.Item
              title="English"
              onPress={() => setSelectedLanguage("English")}
              style={selectedLanguage === "English" ? styles.selectedRole : null}
            />
            <List.Item
              title="עברית"
              onPress={() => setSelectedLanguage("עברית")}
              style={selectedLanguage === "עברית" ? styles.selectedRole : null}
            />
            <List.Item
              title="العربية"
              onPress={() => setSelectedLanguage("العربية")}
              style={selectedLanguage === "العربية" ? styles.selectedRole : null}
            />
          </>
        )}
      </List.Section>
    </TransparentSafeArea>
  );
};

const styles = StyleSheet.create({
  profileContainer: {
    marginVertical: 20,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  selectedRole: {
    backgroundColor: colors.brand.primary,
  },
});
