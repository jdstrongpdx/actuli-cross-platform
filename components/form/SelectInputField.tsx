import React from "react";
import { StyleSheet, View } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { TypeGroup } from "@/interfaces/TypeData";
import { Text, useTheme } from "@rneui/themed";

interface SelectInputFieldProps<T> {
    formik: any;
    formLabel: string;
    fieldName: string;
    placeholder?: string;
    dataList: TypeGroup;
}

const SelectInputField = <T,>({
                                  formik,
                                  formLabel,
                                  fieldName,
                                  placeholder,
                                  dataList,
                              }: SelectInputFieldProps<T>) => {
    const { theme } = useTheme(); // Get theme for styling

    return (
        <View style={styles.inputContainer}>
            <Text style={[styles.label, { color: theme.colors.primary }]}>
                {formLabel}
            </Text>
            <View
                style={[
                    styles.input,
                    { borderColor: theme.colors.grey5, backgroundColor: theme.colors.background },
                    formik.touched[fieldName] && formik.errors[fieldName]
                        ? { borderColor: theme.colors.error }
                        : null,
                ]}
            >
                <Picker
                    selectedValue={formik.values[fieldName] as T}
                    onValueChange={(itemValue: T) => formik.setFieldValue(fieldName, itemValue)}
                    onBlur={() => formik.setFieldTouched(fieldName, true)}
                >
                    <Picker.Item
                        label={`Select ${placeholder ? placeholder : formLabel}`}
                        value={undefined}
                    />
                    {dataList.data.map((option, id) => (
                        <Picker.Item key={id} label={option.value} value={option.value} />
                    ))}
                </Picker>
            </View>
            {formik.touched[fieldName] && formik.errors[fieldName] && (
                <Text style={[styles.errorText, { color: theme.colors.error }]}>
                    {formik.errors[fieldName]}
                </Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    inputContainer: {
        marginBottom: 15,
    },
    label: {
        fontSize: 16, // Adjust as needed
        fontWeight: "bold",
        marginBottom: 6,
    },
    input: {
        borderWidth: 1,
        padding: 10,
        borderRadius: 5,
        marginTop: 5,
    },
    errorText: {
        fontSize: 14, // Adjust as needed
        marginTop: 5,
    },
});

export default SelectInputField;