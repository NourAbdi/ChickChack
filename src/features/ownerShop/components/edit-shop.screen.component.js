import React, {useState} from "react";
import { View,Text,Switch } from "react-native";
import ModalSelector from 'react-native-modal-selector';

import{
    WorkingHoursCard,
    Title,
    Day,
    Row,
    TimeCard,
    Time,
    Center,
    ViewIsTemClose,
} from "./edit-shop.screen.style"




export const PrintWorkingHours = (workingHours,isTemporaryClose,setTemporaryClose) => {

    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const hours = Array.from({ length: 24 }, (_, index) => String(index).padStart(2, '0'));
    const minutes = Array.from({ length: 60 }, (_, index) => String(index).padStart(2, '0'));
    const IsOpenData = ["Yes", "No"];
    const [selectedHour, setSelectedHour] = useState("");
    const [selectedMinute, setSelectedMinute] = useState("");
    const [selectedIsOpen, setSelectedIsOpen] = useState("");
    

    return(
        <View>
            <Title>Working Hours:</Title>
            
            {daysOfWeek.map(day => (
                <WorkingHoursCard key={day}>
                    <Day>{day}:</Day>
                    <Row>
                        <Center> Start:</Center>
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
                        
                        <Center> : </Center>
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

                        <Center> ,End:</Center>
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
                        
                        <Center> : </Center>
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
                       
                        
                        <Center> ,Is Open:</Center>
                        {/* print Is Open */}   
                        <ModalSelector
                            data={IsOpenData.map(open => ({ key: open, label: open }))}
                            initValue={workingHours[day].IsOpen}
                            onChange={(option) => {
                            const updatedWorkingHours = { ...workingHours };
                            updatedWorkingHours[day].IsOpen = option.label;
                            setSelectedIsOpen(option.label);
                            }}
                        >
                            <TimeCard>   
                                <Time>{workingHours[day].IsOpen}</Time>
                            </TimeCard>
                        </ModalSelector>
                    </Row>
                </WorkingHoursCard>
            ))}
            {/* print Is Temporary Close */} 

            <ViewIsTemClose>
                <Center>
                    <Title>Is Temporary Close: </Title>
                </Center>
                <Switch
                    value={isTemporaryClose}
                    onValueChange={(value) => setTemporaryClose(value)}
                />
            </ViewIsTemClose>
        </View>
    );
    };