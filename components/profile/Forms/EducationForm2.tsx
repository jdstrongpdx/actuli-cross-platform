import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View, Alert } from "react-native";
import { useFormik } from "formik";
import * as Yup from "yup";
import AppUser, {Contact, Education} from "@/interfaces/AppUser";
import { useAppUser } from "@/contexts/AppUserContext";
import { produce } from "immer";
import TextInputField from "@/components/form/TextInputField";
import DateInputField from "@/components/form/DateInputField";
import {Button, Text, useTheme} from "@rneui/themed";
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
    personalImportance: "",
    careerImportance: "",
};

const EducationForm2: React.FC<EducationForm2Props> = ({ userData, onComplete }) => {
    const { saveUser } = useAppUser();
    const { typeData } = useTypeData();
    const { educationList } = userData?.profile || {};
    const [editingIndex, setEditingIndex] = useState<number | null>(null);
    const { token } = useSession();
    const { theme } = useTheme();

    const ValidationSchema = () =>
        Yup.object().shape({
            school: Yup.string().required("School name is required."),
            degreeType: Yup.string().required("Degree type is required."),
            degreeName: Yup.string().optional().nullable(),
            city: Yup.string().optional().nullable(),
            state: Yup.string().optional().nullable(),
            country: Yup.string().optional().nullable(),
            location: Yup.string().optional().nullable(),
            status: Yup.string(),
            completionDate: Yup.date()
                .optional()
                .nullable()
                .max(new Date(), "Completion date cannot be in the future."),
            grade: Yup.string().optional().nullable(),
            gradeScale: Yup.string().optional().nullable(),
            description: Yup.string().optional().nullable(),
            personalImportance: Yup.string().optional().nullable(),
            careerImportance: Yup.string().optional().nullable(),
        });

    const formik = useFormik({
        initialValues,
        validationSchema: ValidationSchema,
        onSubmit: async (values, { setSubmitting }) => {
            await handleSubmit(values, setSubmitting);
        },
    });

    const handleSubmit = async (values: Education, setSubmitting: (isSubmitting: boolean) => void) => {
        try {
            const sanitizedData = replaceEmptyStringWithNull(values);

            let updatedEducationList: Education[] = [];

            if (Array.isArray(educationList)) {
                if (editingIndex === null) {
                    // Add the new education item if no index is being edited
                    updatedEducationList = [...educationList, sanitizedData];
                } else {
                    // Replace the existing item at the specific index
                    updatedEducationList = educationList.map((item, index) =>
                        index === editingIndex ? sanitizedData : item
                    );
                }
            } else {
                // If educationList is not an array, initialize it with the new item
                updatedEducationList = [sanitizedData];
            }

            // Route accepts updated Education List and returns updated App User
            const updatedUser: AppUser = await apiRequest<Education>(
                ApiMethods.Put,
                ApiRoutes.UpdateUserEducationList,
                updatedEducationList,
                {},
                token
            );

            if (updatedUser) {
                saveUser(updatedUser as AppUser);
                Alert.alert("Education List updated successfully.");
                onComplete();
            }

        } catch (error) {
            Alert.alert("There was an error submitting the form. Please try again.");
        } finally {
            setSubmitting(false); // Stop form submission loading state
        }
    };

    const handleEdit = (index: number) => {
        if (userData?.profile?.educationList) {
            const educationItem = userData.profile.educationList[index];
            formik.setValues(educationItem);
            setEditingIndex(index);
        }
    };

    // TODO: Delete not working correctly
    const handleDelete = (index: number) => {
        Alert.alert(
            "Confirm Deletion",
            "Are you sure you want to delete this education entry?",
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "Delete",
                    style: "destructive",
                    onPress: async () => {
                        try {
                            console.log("Delete education entry at index: ", index);
                            let updatedEducationList: Education[] = [];

                            // Ensure educationList is valid and filter out the index to be deleted
                            if (Array.isArray(educationList)) {
                                updatedEducationList = educationList.filter((_, i) => i !== index);
                            }

                            // Make the API request to update the user's education list
                            const updatedUser: AppUser = await apiRequest<Education>(
                                ApiMethods.Put,
                                ApiRoutes.UpdateUserEducationList,
                                updatedEducationList,
                                {},
                                token
                            );

                            // If the user is successfully updated, save the user and notify
                            if (updatedUser) {
                                saveUser(updatedUser as AppUser);
                                Alert.alert("Education entry deleted successfully.");
                            }
                        } catch (error) {
                            Alert.alert("There was an error deleting the education entry. Please try again.");
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
                        {item.school && (
                            <Text style={[styles.text, { color: theme.colors.primary }]}>
                                <Text style={styles.label}>School: </Text>{item.school}
                            </Text>
                        )}
                        {item.degreeType && (
                            <Text style={[styles.text, { color: theme.colors.primary }]}>
                                <Text style={styles.label}>Degree Type: </Text>{item.degreeType}
                            </Text>
                        )}
                        {item.degreeName && (
                            <Text style={[styles.text, { color: theme.colors.primary }]}>
                                <Text style={styles.label}>Degree Name: </Text>{item.degreeName}
                            </Text>
                        )}
                        <Button title="Edit"
                                style = {{
                                    width: 100,
                                    borderRadius: 5,
                                    marginTop: 10,
                                }}
                                onPress={() => handleEdit(index)} />
                        <Button title="Delete"
                                style = {{
                                    width: 100,
                                    borderRadius: 5,
                                    marginTop: 10,
                                }}
                                onPress={() => handleDelete(index)} />
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
            <SelectInputField formLabel="State" fieldName="state" dataList={typeData.states} formik={formik}/>
            <SelectInputField formLabel="Country" fieldName="country" dataList={typeData.countries} formik={formik}/>
            <SelectInputField formLabel="Status" fieldName="status" dataList={typeData.educationStatusList} formik={formik}/>
            <DateInputField formLabel="Completion Date" fieldName="completionDate" formik={formik} />
            <SelectInputField formLabel="Grade Scale" fieldName="gradeScale" dataList={typeData.educationGradeScaleList} formik={formik}/>
            <TextInputField formLabel={"Grade based on Grade Scale Above"} fieldName="grade" formik={formik} />
            <TextInputField formLabel="Description" fieldName="description" formik={formik} />
            <SelectInputField formLabel="Importance to you personally." fieldName="importance" dataList={typeData.sevenLevelList} formik={formik}/>
            <SelectInputField formLabel="Importance to your career." fieldName="importance" dataList={typeData.sevenLevelList} formik={formik}/>
            <Button
                title={editingIndex !== null ? "Update Selected Education Record" : "Add a new Education Record"}
                onPress={() => formik.handleSubmit()}
                disabled={formik.isSubmitting}
                style={{ marginBottom: 10 }}
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
    text: {
        fontSize: 16,
        marginBottom: 8,
    },
    label: {
        fontWeight: 'bold',
    },
});

export default EducationForm2;