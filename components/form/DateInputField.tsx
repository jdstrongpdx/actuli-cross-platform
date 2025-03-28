import React, { useState } from "react";
import { View, TouchableOpacity, StyleSheet, Platform } from "react-native";
import DateTimePicker, { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Text, useTheme } from "@rneui/themed";

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
    const { theme } = useTheme(); // Get theme for styling
    const [show, setShow] = useState(false);

    // Convert field value from string to Date object if available
    const value = formik.values[fieldName] ? new Date(formik.values[fieldName]) : null;

    const handleChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
        setShow(false);
        if (selectedDate) {
            formik.setFieldValue(fieldName, selectedDate.toISOString());
        }
    };

    return (
        <View style={styles.container}>
            <Text style={[styles.label, { color: theme.colors.primary }]}>
                {formLabel}
            </Text>
            {Platform.OS === "web" ? (
                <ReactDatePicker
                    selected={value}
                    onChange={(date) => formik.setFieldValue(fieldName, date ? date.toISOString() : "")}
                    placeholderText={placeholder}
                    dateFormat="yyyy-MM-dd"
                    className="react-datepicker"
                />
            ) : (
                <>
                    <TouchableOpacity
                        style={[
                            styles.dateButton,
                            { backgroundColor: theme.colors.background, borderColor: theme.colors.grey5 },
                        ]}
                        onPress={() => setShow(!show)}
                    >
                        <Text style={[styles.dateText, { color: theme.colors.grey1 }]}>
                            {value ? value.toDateString() : placeholder}
                        </Text>
                    </TouchableOpacity>
                    {show && (
                        <DateTimePicker
                            value={value || new Date()}
                            mode="date"
                            display={Platform.OS === "ios" ? "inline" : "default"}
                            onChange={handleChange}
                        />
                    )}
                </>
            )}
            {formik.errors[fieldName] && formik.touched[fieldName] && (
                <Text style={[styles.errorText, { color: theme.colors.error }]}>
                    {formik.errors[fieldName]}
                </Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 20,
    },
    label: {
        fontSize: 16, // Adjust as needed
        fontWeight: "bold",
        marginBottom: 6,
    },
    dateButton: {
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderRadius: 5,
    },
    dateText: {
        fontSize: 16, // Adjust as needed
    },
    errorText: {
        fontSize: 14, // Adjust as needed
        marginTop: 5,
    },
});

export default DateInputField;