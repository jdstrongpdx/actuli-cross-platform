import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View, Alert } from "react-native";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useAppUser } from "@/contexts/AppUserContext";
import { produce } from "immer";
import TextInputField from "@/components/form/TextInputField";
import DateInputField from "@/components/form/DateInputField";
import { Button, Text, useTheme } from "@rneui/themed";
import SelectInputField from "@/components/form/SelectInputField";
import { replaceEmptyStringWithNull } from "@/utils/normalizationUtils";
import apiRequest from "@/utils/apiRequest";
import { ApiMethods, ApiRoutes } from "@/enums/ApiEnums";
import { useSession } from "@/contexts/AuthContext";
import AppUser, {Education, Work} from "@/interfaces/AppUser";
import {useTypeData} from "@/contexts/TypeDataContext";

interface WorkFormProps {
    userData: AppUser | null;
    onComplete: () => void;
}

const initialValues: Work = {
    workTitle: "",
    employer: "",
    industry: "",
    careerLevel: "",
    wage: "",
    wageScale: "",
    city: "",
    state: "",
    country: "",
    location: "",
    startDate: "",
    endDate: "",
    status: "",
    description: "",
    personalImportance: "",
    satisfaction: ""
};

const WorkForm: React.FC<WorkFormProps> = ({ userData, onComplete }) => {
    const { saveUser } = useAppUser();
    const { workList } = userData?.profile || {};
    const { typeData } = useTypeData();
    const [editingIndex, setEditingIndex] = useState<number | null>(null);
    const { token } = useSession();
    const { theme } = useTheme();

    const validationSchema = () =>
        Yup.object().shape({
            workTitle: Yup.string().required("Work title is required."),
            employer: Yup.string().required("Employer is required."),
            industry: Yup.string().optional().nullable(),
            careerLevel: Yup.string().optional().nullable(),
            wage: Yup.number().optional().nullable(),
            wageScale: Yup.string().optional().nullable(),
            city: Yup.string().optional().nullable(),
            state: Yup.string().optional().nullable(),
            country: Yup.string().optional().nullable(),
            location: Yup.string().optional().nullable(),
            startDate: Yup.date()
                .required("Start date is required.")
                .max(new Date(), "Start date cannot be in the future."),
            endDate: Yup.date()
                .optional()
                .nullable()
                .min(Yup.ref("startDate"), "End date cannot be before start date."),
            status: Yup.string(),
            description: Yup.string().optional().nullable(),
            personalSatisfaction: Yup.string().optional().nullable(),
            satisfaction: Yup.string().optional().nullable(),
        });

    const formik = useFormik({
        initialValues,
        validationSchema: validationSchema(),
        onSubmit: async (values, { setSubmitting }) => {
            await handleSubmit(values, setSubmitting);
        },
    });

    const handleSubmit = async (values: Work, setSubmitting: (isSubmitting: boolean) => void) => {
        try {
            const sanitizedData = replaceEmptyStringWithNull(values);

            let updatedWorkList: Work[] = [];

            if (Array.isArray(workList)) {
                if (editingIndex === null) {
                    // Add the new education item if no index is being edited
                    updatedWorkList = [...workList, sanitizedData];
                } else {
                    // Replace the existing item at the specific index
                    updatedWorkList = workList.map((item, index) =>
                        index === editingIndex ? sanitizedData : item
                    );
                }
            } else {
                // If educationList is not an array, initialize it with the new item
                updatedWorkList = [sanitizedData];
            }

            // Route accepts updated Education List and returns updated App User
            const updatedUser: AppUser = await apiRequest<Education>(
                ApiMethods.Put,
                ApiRoutes.UpdateUserWorkList,
                updatedWorkList,
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
        if (userData?.profile?.workList) {
            const workItem = userData.profile.workList[index];
            formik.setValues(workItem);
            setEditingIndex(index);
        }
    };

    // TODO: Delete not working correctly
    const handleDelete = (index: number) => {
        Alert.alert(
            "Confirm Deletion",
            "Are you sure you want to delete this work entry?",
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "Delete",
                    style: "destructive",
                    onPress: async () => {
                        try {
                            console.log("Delete work entry at index: ", index);
                            let updatedEducationList: Work[] = [];

                            // Ensure educationList is valid and filter out the index to be deleted
                            if (Array.isArray(workList)) {
                                updatedEducationList = workList.filter((_, i) => i !== index);
                            }

                            // Make the API request to update the user's education list
                            const updatedUser: AppUser = await apiRequest<Education>(
                                ApiMethods.Put,
                                ApiRoutes.UpdateUserWorkList,
                                updatedEducationList,
                                {},
                                token
                            );

                            // If the user is successfully updated, save the user and notify
                            if (updatedUser) {
                                saveUser(updatedUser as AppUser);
                                Alert.alert("Work entry deleted successfully.");
                            }
                        } catch (error) {
                            Alert.alert("There was an error deleting the work entry. Please try again.");
                        }
                    },
                },
            ]
        );
    };

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
                {userData?.profile?.workList?.map((item, index) => (
                    <View key={index} style={styles.listItem}>
                        {item.workTitle && (
                            <Text style={[styles.text, { color: theme.colors.primary }]}>
                                <Text style={styles.label}>School: </Text>{item.workTitle}
                            </Text>
                        )}
                        {item.employer && (
                            <Text style={[styles.text, { color: theme.colors.primary }]}>
                                <Text style={styles.label}>Degree Type: </Text>{item.employer}
                            </Text>
                        )}
                        {item.status && (
                            <Text style={[styles.text, { color: theme.colors.primary }]}>
                                <Text style={styles.label}>Degree Name: </Text>{item.status}
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
                {editingIndex !== null ? "Edit Work Entry" : "Add Work Entry"}
            </Text>

            <TextInputField formLabel="Work Title" fieldName="workTitle" formik={formik} />
            <TextInputField formLabel="Employer" fieldName="employer" formik={formik} />
            <SelectInputField formLabel="Industry" fieldName="industry" dataList={typeData.workIndustryList} formik={formik}/>
            <SelectInputField formLabel="Career Level" fieldName="careerLevel" dataList={typeData.workCareerLevelList} formik={formik}/>
            <SelectInputField formLabel="Wage Scale" fieldName="wageScale" dataList={typeData.workWageScaleList} formik={formik}/>
            <TextInputField formLabel="Wage using Wage Scale Above" fieldName="wage" formik={formik} />
            <TextInputField formLabel="City" fieldName="city" formik={formik} />
            <SelectInputField formLabel="State" fieldName="state" dataList={typeData.states} formik={formik}/>
            <SelectInputField formLabel="Country" fieldName="country" dataList={typeData.countries} formik={formik}/>
            <DateInputField formLabel="Start Date" fieldName="startDate" formik={formik} />
            <DateInputField formLabel="End Date" fieldName="endDate" formik={formik} />
            <SelectInputField formLabel="Status" fieldName="status" dataList={typeData.workStatusList} formik={formik}/>
            <TextInputField formLabel="Description" fieldName="description" formik={formik} />
            <SelectInputField formLabel="Importance to you personally." fieldName="importance" dataList={typeData.sevenLevelList} formik={formik}/>
            <SelectInputField formLabel="Personal Satisfaction." fieldName="satisfaction" dataList={typeData.sevenLevelList} formik={formik}/>

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
        padding: 16,
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

export default WorkForm;