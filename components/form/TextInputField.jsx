import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import {ThemedText} from "@/components/ThemedText";
import {ThemedView} from "@/components/ThemedView";

const TextInputField = ({ formik, formLabel, fieldName, placeholder = null }) => {
    return (
        <ThemedView style={styles.inputContainer}>
            <ThemedText>{formLabel}</ThemedText>
            <TextInput
                style={[styles.input, formik.touched[fieldName] && formik.errors[fieldName] ? styles.errorInput : null]}
                placeholder={placeholder ? placeholder : fieldName}
                onChangeText={formik.handleChange(fieldName)}
                onBlur={formik.handleBlur(fieldName)}
                value={formik.values[fieldName]}
            />
            {formik.touched[fieldName] && formik.errors[fieldName] && (
                <ThemedText style={styles.errorText}>{formik.errors[fieldName]}</ThemedText>
            )}
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    inputContainer: {
        marginBottom: 15,
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        padding: 10,
        marginTop: 5,
        borderRadius: 5,
    },
    errorInput: {
        borderColor: "red",
    },
    errorText: {
        color: "red",
        marginTop: 5,
    },
});

export default TextInputField;