import React from "react";
import { StyleSheet, View } from "react-native";
import { Picker } from '@react-native-picker/picker';
import {TypeGroup} from "@/interfaces/TypeData";
import { Text } from '@rneui/themed';

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
    return (
        <View style={styles.inputContainer}>
            <Text>{formLabel}</Text>
            <View
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
                    {dataList.data.map((option, id) => (
                        <Picker.Item key={id} label={option.value} value={option.value} />
                    ))}
                </Picker>
            </View>
            {formik.touched[fieldName] && formik.errors[fieldName] && (
                <Text style={styles.errorText}>{formik.errors[fieldName]}</Text>
            )}
        </View>
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