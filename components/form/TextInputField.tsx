import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Input } from '@rneui/themed'; // React Native Elements Input component
import { FormikProps } from 'formik';

type TextInputFieldProps<T> = {
    formik: FormikProps<T>;
    fieldName: keyof T;
    formLabel?: string;
    required?: boolean;
    placeholder?: string;
    secureTextEntry?: boolean;
};

const TextInputField = <T,>({
                                formik,
                                fieldName,
                                formLabel,
                                placeholder,
                                secureTextEntry = false,
                            }: TextInputFieldProps<T>) => {
    return (
        <View style={styles.container}>
            <Input
                label={formLabel}
                placeholder={placeholder || (fieldName as string)}
                onChangeText={formik.handleChange(fieldName as string)}
                onBlur={formik.handleBlur(fieldName as string)}
                value={formik.values[fieldName] as string}
                secureTextEntry={secureTextEntry}
                errorMessage={
                    formik.touched[fieldName] && formik.errors[fieldName]
                        ? (formik.errors[fieldName] as string)
                        : undefined
                }
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 16, // Space between inputs
    },
});

export default TextInputField;