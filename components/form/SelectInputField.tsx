import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Picker } from '@react-native-picker/picker';
import {ThemedView} from "@/components/ThemedView";
import {ThemedText} from "@/components/ThemedText";

interface Option<T> {
    label: string;
    value: T;
}

interface SelectInputFieldProps<T> {
    formik: any;
    formLabel: string;
    fieldName: string;
    placeholder?: string;
    dataList: Option<T>[];
}

const SelectInputField = <T,>({
                                  formik,
                                  formLabel,
                                  fieldName,
                                  placeholder,
                                  dataList,
                              }: SelectInputFieldProps<T>) => {
    return (
        <ThemedView style={styles.inputContainer}>
            <ThemedText>{formLabel}</ThemedText>
            <ThemedView
                style={[
                    styles.input,
                    formik.touched[fieldName] && formik.errors[fieldName] ? styles.errorInput : null,
                ]}
            >
                <Picker
                    selectedValue={formik.values[fieldName] as T}
                    onValueChange={(itemValue: T) => formik.setFieldValue(fieldName, itemValue)}
                    onBlur={() => formik.setFieldTouched(fieldName, true)}
                >
                    <Picker.Item label={`Select ${placeholder ? placeholder : formLabel}`} value={undefined} />
                    {dataList.map((option, index) => (
                        <Picker.Item key={index} label={option.label} value={option.value} />
                    ))}
                </Picker>
            </ThemedView>
            {formik.touched[fieldName] && formik.errors[fieldName] && (
                <ThemedText style={styles.errorText}>{formik.errors[fieldName]}</ThemedText>
            )}
        </ThemedView>
    );
};

const styles = StyleSheet.create({
    inputContainer: {
        marginBottom: 15,
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        padding: 10,
        borderRadius: 5,
        marginTop: 5,
    },
    errorInput: {
        borderColor: "red",
    },
    errorText: {
        color: "red",
        marginTop: 5,
    },
});

export default SelectInputField;