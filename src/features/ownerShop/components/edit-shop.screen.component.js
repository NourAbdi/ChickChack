import React, { useState } from "react";
import { View, Text } from "react-native";
import { CheckBox } from "react-native-elements";
import ModalSelector from "react-native-modal-selector";
import { useTranslation } from "react-i18next";

import {
  WorkingHoursCard,
  Title,
  Day,
  Row,
  TimeCard,
  Time,
  Center,
  ViewIsTemClose,
} from "./edit-shop.screen.style";

export const isWorkingHoursValid = (workingHours) => {
  let isValid = true;
  let invalidDay = null;

  for (const day in workingHours) {
    const { start, end } = workingHours[day];
    const startTime = start.split(":");
    const endTime = end.split(":");
    const startHour = parseInt(startTime[0]);
    const startMinute = parseInt(startTime[1]);
    const endHour = parseInt(endTime[0]);
    const endMinute = parseInt(endTime[1]);

    if (startHour > endHour || (startHour === endHour && startMinute >= endMinute)) {
      isValid = false;
      invalidDay = day;
      break;
    }
  }

  return { isValid, invalidDay };
};

export const PrintWorkingHours = (workingHours, isTemporaryClose, setTemporaryClose) => {
  const { t } = useTranslation();
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const translatedDaysOfWeek = daysOfWeek.map(day => t(day));
  const hours = Array.from({ length: 24 }, (_, index) => String(index).padStart(2, '0'));
  const minutes = Array.from({ length: 60 }, (_, index) => String(index).padStart(2, '0'));
  const [selectedHour, setSelectedHour] = useState("");
  const [selectedMinute, setSelectedMinute] = useState("");
  const [selectedIsOpen, setSelectedIsOpen] = useState("");

  return (
    <View>
      <Title>{t("workingHours")}</Title>

      {daysOfWeek.map((day, index) => (
        <WorkingHoursCard key={day}>
          <Day>{translatedDaysOfWeek[index]}:</Day>
          <Row>
            <Center>{t("Start")}:</Center>
            {/* print start working hour */}
            <ModalSelector
              data={hours.map(hour => ({ key: hour, label: hour }))}
              initValue={workingHours[day].start.split(":")[0]}
              onChange={(option) => {
                const updatedWorkingHours = { ...workingHours };
                updatedWorkingHours[day].start = `${option.label}:${updatedWorkingHours[day].start.split(":")[1]}`;
                setSelectedHour(option.label);
              }}
              optionContainerStyle={{ height: 500 }}
            >
              <TimeCard>
                <Time>{workingHours[day].start.split(":")[0]}</Time>
              </TimeCard>
            </ModalSelector>

            <Center>:</Center>
            {/* print start working minute */}
            <ModalSelector
              data={minutes.map(minute => ({ key: minute, label: minute }))}
              initValue={workingHours[day].start.split(":")[1]}
              onChange={(option) => {
                const updatedWorkingHours = { ...workingHours };
                updatedWorkingHours[day].start = `${updatedWorkingHours[day].start.split(":")[0]}:${option.label}`;
                setSelectedMinute(option.label);
              }}
              optionContainerStyle={{ height: 500 }}
            >
              <TimeCard>
                <Time>{workingHours[day].start.split(":")[1]}</Time>
              </TimeCard>
            </ModalSelector>

            <Center>, {t("End")}:</Center>
            {/* print End working hour */}
            <ModalSelector
              data={hours.map(hour => ({ key: hour, label: hour }))}
              initValue={workingHours[day].end.split(":")[0]}
              onChange={(option) => {
                const updatedWorkingHours = { ...workingHours };
                updatedWorkingHours[day].end = `${option.label}:${updatedWorkingHours[day].end.split(":")[1]}`;
                setSelectedHour(option.label);
              }}
              optionContainerStyle={{ height: 500 }}
            >
              <TimeCard>
                <Time>{workingHours[day].end.split(":")[0]}</Time>
              </TimeCard>
            </ModalSelector>

            <Center>:</Center>
            {/* print End working minute */}
            <ModalSelector
              data={minutes.map(minute => ({ key: minute, label: minute }))}
              initValue={workingHours[day].end.split(":")[1]}
              onChange={(option) => {
                const updatedWorkingHours = { ...workingHours };
                updatedWorkingHours[day].end = `${updatedWorkingHours[day].end.split(":")[0]}:${option.label}`;
                setSelectedMinute(option.label);
              }}
              optionContainerStyle={{ height: 500 }}
            >
              <TimeCard>
                <Time>{workingHours[day].end.split(":")[1]}</Time>
              </TimeCard>
            </ModalSelector>

            {/* <Center>, {t("Is Open")}:</Center> */}
            {/* print Is Open */}
            <CheckBox
              title={t("Is Open")}
              checked={workingHours[day].isOpen === "Yes"}
              onPress={() => {
                const updatedWorkingHours = { ...workingHours };
                updatedWorkingHours[day].isOpen = workingHours[day].isOpen === "Yes" ? "No" : "Yes";
                setSelectedIsOpen(updatedWorkingHours[day].isOpen);
              }}
            />
          </Row>
        </WorkingHoursCard>
      ))}
      {/* print Is Temporary Close */}
      <ViewIsTemClose>
        {/* <Center>
          <Title>{t("Is Temporary Close")}</Title>
        </Center> */}
        <CheckBox
          title={t("Is Temporary Close")}
          checked={isTemporaryClose}
          onPress={() => setTemporaryClose(!isTemporaryClose)}
        />
      </ViewIsTemClose>
    </View>
  );
};
