import React, { useContext,useState } from "react";
import { Linking } from 'react-native';

import {
    Info,
    InfoContainer,
    Row,
    NameButton,
    ButtonText,
    Flex,
    TextInputStyle,
    LangButton,
} from "./settings.screen.style";

export const sortDaysHours = (workingHours) => {
    const sortedDays = Object.keys(workingHours).sort((a, b) => {
        const daysOrder = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        return daysOrder.indexOf(a) - daysOrder.indexOf(b);
    });
    return sortedDays.map((day) => ({
        day,
        hours: workingHours[day],
    }));
};

export const showWorkingHoursFunc = (showWorkingHours,workingHours) => {
    return(
        showWorkingHours && (
            <InfoContainer>
                {sortDaysHours(workingHours).map(({ day, hours }) => (
                    <Info key={day}>
                        {`${day}: ${hours.start} - ${hours.end}`}
                    </Info>
                ))}
            </InfoContainer>
        )
    );
};

export const showTermsFunc = (showTerms,terms) => {
    return(
        showTerms && (
            <InfoContainer>
                <Info>{terms}</Info>
            </InfoContainer>
        )
    );
};


export const showContactFunc = (showContact, phone) => {
  const handleCall = () => {
    Linking.openURL(`tel:${phone}`);
  };
  return (
    showContact && (
      <InfoContainer>
         <Info onPress={handleCall}>phone: {phone}</Info>
      </InfoContainer>
    )
  );
};

export const showProfileFunc = (showProfileInputs, name, phoneNumber, role, uid, setUserName) => {
    const [isChangeName, setIsChangeName] = useState(false);
    const [NewName, setNewName] = useState(name);

    const handleChangeNameClick = () => {
        setIsChangeName(!isChangeName);
    };
    const handleNewNameChange = (name) => {
        setNewName(name);
    };

    const handleSaveNewName = async () => {
        setNewName(NewName);
        setIsChangeName(!isChangeName);
        await setUserName(uid, NewName);
    };
    return(
        showProfileInputs && (
            <InfoContainer>
              <Info>Name: {name}</Info>
              <Info>Phone Number: {phoneNumber}</Info>
              <Info>Role: {role}</Info>
              <Row>
                <NameButton onPress={() => handleChangeNameClick()}>
                <ButtonText>Change name</ButtonText>
                </NameButton>
                {isChangeName &&
                  <>
                    <Flex/>
                    <NameButton onPress={() => handleSaveNewName()}>
                      <ButtonText>Save</ButtonText>
                    </NameButton>
                  </>
                }
              </Row>
              {isChangeName && 
              <TextInputStyle
                  placeholder="New name"
                  value={NewName}
                  onChangeText={handleNewNameChange} 
                />
              }
            </InfoContainer>
        )
    );
};

export const showLanguagesFunc = (showLanguages,i18n ,language) => {
    const changeLanguage = (lang) => {
      i18n.changeLanguage(lang, () => {
      });
    };
    return (
        showLanguages && (
            <InfoContainer> 
              <Info>Select your preferred language:</Info>
              <Row>
                <LangButton onPress={() => changeLanguage("en")} isSelected={language === "en"}>
                  <ButtonText>English</ButtonText>
                </LangButton>
                <Flex />
                <LangButton onPress={() => changeLanguage("he")} isSelected={language === "he"}>
                  <ButtonText>עברית</ButtonText>
                </LangButton>
                <Flex />
                <LangButton onPress={() => changeLanguage("ar")} isSelected={language === "ar"}>
                  <ButtonText>العربية</ButtonText>
                </LangButton>
              </Row>
            </InfoContainer>          
        )
    );
};
