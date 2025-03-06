import React, { useState } from "react";
import { View, TouchableOpacity, StyleSheet, Platform } from "react-native";
import DateTimePicker, { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import { Text } from '@rneui/themed';

interface SelectInputFieldProps<T> {
    formik: any;
    formLabel: string;
    fieldName: string;
    placeholder?: string;
}

const DateInputField = <T,>({
                                formik,
                                formLabel,
                                fieldName,
                                placeholder = "Select Date",
                            }: SelectInputFieldProps<T>) => {
    const [show, setShow] = useState(false);

    // Convert field value from string to Date object if available
    const value = formik.values[fieldName]
        ? new Date(formik.values[fieldName]) // Convert string (ISO format) to Date
        : null;

    const handleChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
        setShow(false); // Hide the date picker
        if (selectedDate) {
            formik.setFieldValue(fieldName, selectedDate.toISOString()); // Save date back as ISO string
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>{formLabel}</Text>
            <TouchableOpacity
                style={styles.dateButton}
                onPress={() => setShow(!show)}
            >
                <Text style={styles.dateText}>
                    {value ? value.toDateString() : placeholder}
                </Text>
            </TouchableOpacity>
            {show && (
                <DateTimePicker
                    value={value || new Date()} // Use default date if no value
                    mode="date"
                    display={Platform.OS === "ios" ? "inline" : "default"}
                    onChange={handleChange}
                />
            )}
            {formik.errors[fieldName] && formik.touched[fieldName] && (
                <Text style={styles.errorText}>{formik.errors[fieldName]}</Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 6,
    },
    dateButton: {
        paddingVertical: 12,
        paddingHorizontal: 10,
        backgroundColor: "#f0f0f0",
        borderRadius: 5,
    },
    dateText: {
        fontSize: 16,
        color: "#333",
    },
    errorText: {
        fontSize: 14,
        color: "red",
        marginTop: 5,
    },
});

export default DateInputField;