import React, { useContext, useState, useEffect } from 'react';
import { View, Button, ScrollView, ActivityIndicator, TextInput, Switch, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text } from "../../../components/typography/text.component";

import { TransporterContext } from "../../../services/transporter/transporter.context";

export const TransporterEditScreen = () => {
    const { editIsLoading, transporter, updateTransporter } = useContext(TransporterContext);
    const [workingHours, setWorkingHours] = useState({});
    const [openStatus, setOpenStatus] = useState(false);
  
    useEffect(() => {
      if (transporter) {
        setWorkingHours(transporter.workingHours || {});
        setOpenStatus(transporter.openStatus || false);
      }
    }, [transporter]);

    const handleSaveWorkingHours = () => {
        // Save the updated working hours and open status
        updateTransporter(workingHours, openStatus);
    };

    const handleResetData = () => {
        // Reset the transporter data to the initial values
        const updatedFields = {
            workingHours: {
                "Friday": { "end": "24:00", "isOpen": true, "start": "08:00" },
                "Monday": { "end": "24:00", "isOpen": true, "start": "08:00" },
                "Saturday": { "end": "24:00", "isOpen": true, "start": "08:00" },
                "Sunday": { "end": "24:00", "isOpen": true, "start": "08:00" },
                "Thursday": { "end": "24:00", "isOpen": true, "start": "08:00" },
                "Tuesday": { "end": "24:00", "isOpen": true, "start": "08:00" },
                "Wednesday": { "end": "24:00", "isOpen": true, "start": "08:00" }
            },
            openStatus: true
        };

        updateTransporter(updatedFields.workingHours, updatedFields.openStatus);
        setWorkingHours(updatedFields.workingHours);
        setOpenStatus(updatedFields.openStatus);
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                {editIsLoading ? (
                    // Display the loading indicator while editIsLoading is true
                    <View style={styles.loaderContainer}>
                        <ActivityIndicator size="large" />
                    </View>
                ) : (
                    // Render your actual content when editIsLoading is false
                    <View>
                        {/* Display the transporter details */}
                        <Text style={styles.text}>Transporter Name: {transporter?.name}</Text>
                        <Text style={styles.text}>Transporter UID: {transporter?.transporterUid}</Text>
                        {/* Display and edit the working hours */}
                        <Text style={styles.text}>Working Hours:</Text>
                        {Object.entries(workingHours).map(([day, dayDetails]) => (
                            <View key={day} style={styles.hoursContainer}>
                                <Text style={styles.day}>{day}</Text>
                                <Text>Start:</Text>
                                <TextInput
                                    style={styles.input}
                                    value={dayDetails?.start}
                                    onChangeText={(value) => {
                                        setWorkingHours((prevWorkingHours) => ({
                                            ...prevWorkingHours,
                                            [day]: {
                                                ...prevWorkingHours[day],
                                                start: value,
                                            },
                                        }));
                                    }}
                                />
                                <Text>End:</Text>
                                <TextInput
                                    style={styles.input}
                                    value={dayDetails?.end}
                                    onChangeText={(value) => {
                                        setWorkingHours((prevWorkingHours) => ({
                                            ...prevWorkingHours,
                                            [day]: {
                                                ...prevWorkingHours[day],
                                                end: value,
                                            },
                                        }));
                                    }}
                                />
                                <Text>Is Open:</Text>
                                <Switch
                                    value={dayDetails?.isOpen}
                                    onValueChange={(value) => {
                                        setWorkingHours((prevWorkingHours) => ({
                                            ...prevWorkingHours,
                                            [day]: {
                                                ...prevWorkingHours[day],
                                                isOpen: value,
                                            },
                                        }));
                                    }}
                                />
                            </View>
                        ))}
                        <Text style={styles.text}>Open Status:</Text>
                        <Switch
                            value={openStatus}
                            onValueChange={(value) => {
                                setOpenStatus(value);
                            }}
                        />
                        {/* Save button */}
                        <Button title="Save Working Hours" onPress={handleSaveWorkingHours} />
                        {/* Reset button */}
                        <Button title="Reset Transporter Data" onPress={handleResetData} />
                    </View>
                )}
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    loaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 16,
        marginBottom: 8,
    },
    hoursContainer: {
        marginBottom: 16,
    },
    day: {
        fontWeight: 'bold',
        marginBottom: 8,
    },
    input: {
        borderWidth: 1,
        borderRadius: 4,
        padding: 8,
        marginBottom: 8,
    },
});
