import { StatusBar,SafeAreaView } from "react-native";
import { colors } from "../../../infrastructure/theme/colors";

export const isOpenCheck = (workingHours,isTemporaryClose) => {
  const options = { weekday: 'long' };
  const currentDay = new Intl.DateTimeFormat('en-US', options).format(new Date());
  // Get the working hours for the current day
  const todayWorkingHours = workingHours[currentDay];
  // Check if the restaurant is open based on the working hours
  if (todayWorkingHours.start && todayWorkingHours.end) {
    const currentTime = new Date();
    const startTime = new Date();
    const endTime = new Date();
    // Set the start and end time for today's working hours
    const [startHour, startMinute] = todayWorkingHours.start.split(":");
    const [endHour, endMinute] = todayWorkingHours.end.split(":");
    const isOpen=todayWorkingHours.isOpen;
    startTime.setHours(startHour, startMinute);
    endTime.setHours(endHour, endMinute);
    // Compare the current time with the start and end time
    if (isOpen==="Yes" && currentTime >= startTime && currentTime <= endTime) {
      if(isTemporaryClose)
        return false;
      else
      return true;
    } else {
      return false;
  }
  } else {
      return false;
  }
};

export const StatusBarPlaceHolder = () => {
  return (
    <SafeAreaView style={{ backgroundColor: colors.mainblue }}>
      <StatusBar
        barStyle="dark-content"
      />
    </SafeAreaView>
  );
}