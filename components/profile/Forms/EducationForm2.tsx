import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View, Alert } from "react-native";
import { useFormik } from "formik";
import * as Yup from "yup";
import AppUser, { Education } from "@/interfaces/AppUser";
import { useAppUser } from "@/contexts/AppUserContext";
import { produce } from "immer";
import TextInputField from "@/components/form/TextInputField";
import DateInputField from "@/components/form/DateInputField";
import { Button, Text } from "@rneui/themed";
import SelectInputField from "@/components/form/SelectInputField";
import {useTypeData} from "@/contexts/TypeDataContext";
import {replaceEmptyStringWithNull} from "@/utils/normalizationUtils";
import apiRequest from "@/utils/apiRequest";
import {ApiMethods, ApiRoutes} from "@/enums/ApiEnums";
import {useSession} from "@/contexts/AuthContext";

interface EducationForm2Props {
    userData: AppUser | null;
    onComplete: () => void;
}

const initialValues: Education = {
    school: "",
    degreeType: "",
    degreeName: "",
    city: "",
    state: "",
    country: "",
    location: "",
    status: "",
    completionDate: "",
    grade: "",
    gradeScale: "",
    description: "",
    importance: "",
};

const EducationForm2: React.FC<EducationForm2Props> = ({ userData, onComplete }) => {
    const { saveUser } = useAppUser();
    const { typeData } = useTypeData();
    const { educationList } = userData?.profile || {};
    const [editingIndex, setEditingIndex] = useState<number | null>(null);
    const { token } = useSession();

    const ValidationSchema = () =>
        Yup.object().shape({
            school: Yup.string().required("School name is required."),
            degreeType: Yup.string().required("Degree type is required."),
            degreeName: Yup.string().optional(),
            city: Yup.string().optional(),
            state: Yup.string().optional(),
            country: Yup.string().optional(),
            location: Yup.string().optional(),
            status: Yup.string().optional(),
            completionDate: Yup.date()
                .optional()
                .nullable()
                .max(new Date(), "Completion date cannot be in the future."),
            grade: Yup.string().optional(),
            gradeScale: Yup.string().optional(),
            description: Yup.string().optional(),
            importance: Yup.string().optional(),
        });

    const formik = useFormik({
        initialValues,
        validationSchema: ValidationSchema,
        onSubmit: async (values, { setSubmitting }) => {
            formik.setSubmitting(true);
            await handleSave(values).then(() => {
                formik.setSubmitting(false);
            });
        },
    });

    const handleSave = async (values: Education) => {
        try {
            const sanitizedData = replaceEmptyStringWithNull(values);

            let updatedEducationList: Education[];
            if (educationList && editingIndex !== null) {
                updatedEducationList = educationList.map((item, index) =>
                    index === editingIndex ? { ...item, ...sanitizedData } : item
                );
            } else {
                updatedEducationList = [...educationList, { ...sanitizedData, id: Date.now().toString() }]; // Temporary ID
            }

            const updatedUser: AppUser = await apiRequest<AppUser>(
                ApiMethods.Put,
                ApiRoutes.UpdateUserEducationList,
                updatedEducationList,
                {},
                token
            );

            if (updatedUser) {
                saveUser(updatedUser);
                Alert.alert("Education updated successfully.");
                onComplete();
            }
        } catch (error) {
            console.error("Error updating education:", error);
            Alert.alert("An error occurred while updating education.");
        }
    };

    const handleEdit = (index: number) => {
        if (userData?.profile?.educationList) {
            const educationItem = userData.profile.educationList[index];
            formik.setValues(educationItem);
            setEditingIndex(index);
        }
    };

    const handleDelete = (index: number) => {
        Alert.alert(
            "Confirm Deletion",
            "Are you sure you want to delete this education entry?",
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "Delete",
                    style: "destructive",
                    onPress: () => {
                        const updatedUser = produce(userData, (draft: AppUser) => {
                            if (draft?.profile?.educationList) {
                                draft.profile.educationList.splice(index, 1);
                            }
                        });

                        if (updatedUser) {
                            saveUser(updatedUser);
                            Alert.alert("Education entry deleted successfully.");
                            onComplete();
                        }
                    },
                },
            ]
        );
    };

    useEffect(() => {
        if (userData?.profile?.educationList) {
            formik.setValues(initialValues); // Reset the form when userData changes
        }
    }, [userData]);

    if (!typeData) {
        return (
            <>
                <Text>Loading...</Text>
            </>
        );
    }

    return (
        <View style={styles.container}>
            <ScrollView>
                {userData?.profile?.educationList?.map((item, index) => (
                    <View key={index} style={styles.listItem}>
                        <Text>{item.school}</Text>
                        <Button title="Edit" onPress={() => handleEdit(index)} />
                        <Button title="Delete" onPress={() => handleDelete(index)} />
                    </View>
                ))}
            </ScrollView>

            <Text style={styles.formTitle}>
                {editingIndex !== null ? "Edit Education Entry" : "Add Education Entry"}
            </Text>

            <TextInputField formLabel="School" fieldName="school" formik={formik} />
            <SelectInputField formLabel="Degree Type" fieldName="degreeType" dataList={typeData.educationDegreeList} formik={formik}/>
            <TextInputField formLabel="Degree Name" fieldName="degreeName" formik={formik} />
            <TextInputField formLabel="City" fieldName="city" formik={formik} />
            <SelectInputField formLabel="Country" fieldName="country" dataList={typeData.countries} formik={formik}/>
            <DateInputField formLabel="Completion Date" fieldName="completionDate" formik={formik} />

            <Button
                title={editingIndex !== null ? "Update" : "Add"}
                onPress={() => formik.handleSubmit()}
                disabled={formik.isSubmitting}
            />

            <Button
                title="Cancel"
                type="outline"
                onPress={() => {
                    setEditingIndex(null);
                    formik.resetForm();
                    onComplete();
                }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    listItem: {
        marginVertical: 10,
        padding: 10,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 5,
    },
    formTitle: {
        fontSize: 18,
        marginVertical: 20,
        fontWeight: "bold",
    },
});

export default EducationForm2;