import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Input, useTheme } from '@rneui/themed'; // React Native Elements Input component
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
    const { theme } = useTheme(); // Get theme for styling

    return (
        <View style={styles.container}>
            <Input
                label={formLabel}
                placeholder={placeholder || (fieldName as string)}
                placeholderTextColor={theme.colors.grey3} // Apply themed placeholder color
                onChangeText={formik.handleChange(fieldName as string)}
                onBlur={formik.handleBlur(fieldName as string)}
                value={formik.values[fieldName] as string}
                secureTextEntry={secureTextEntry}
                errorMessage={
                    formik.touched[fieldName] && formik.errors[fieldName]
                        ? (formik.errors[fieldName] as string)
                        : undefined
                }
                inputStyle={{ color: theme.colors.black }} // Themed text color for input
                labelStyle={{
                    color: theme.colors.primary, // Themed label color
                    fontWeight: 'bold',
                }}
                errorStyle={{
                    color: theme.colors.error, // Themed error color
                }}
                containerStyle={{
                    paddingHorizontal: 0, // To align with external spacing
                }}
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