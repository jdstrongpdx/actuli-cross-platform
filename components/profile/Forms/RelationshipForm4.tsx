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
import AppUser, {Relationship} from "@/interfaces/AppUser";
import {useTypeData} from "@/contexts/TypeDataContext";

interface RelationshipFormProps {
    userData: AppUser | null;
    onComplete: () => void;
}

const initialValues: Relationship = {
    name: "",
    dateOfBirth: "",
    relationshipType: "",
    startDate: "",
    endDate: "",
    interactionFrequency: "",
    status: "",
    relationshipImportance: "",
    description: "",
};


const RelationshipForm4: React.FC<RelationshipFormProps> = ({ userData, onComplete }) => {
    const { saveUser } = useAppUser();
    const { relationshipsList } = userData?.profile || {};
    const { typeData } = useTypeData();
    const [editingIndex, setEditingIndex] = useState<number | null>(null);
    const { token } = useSession();
    const { theme } = useTheme();

    const validationSchema = () =>
        Yup.object().shape({
            name: Yup.string().required("Name is required."),
            relationshipType: Yup.string().required("Relationship type is required."),
            interactionFrequency: Yup.string().optional().nullable(),
            dateOfBirth: Yup.date()
                .max(new Date(), "Start date cannot be in the future."),
            startDate: Yup.date()
                .required("Start date is required.")
                .max(new Date(), "Start date cannot be in the future."),
            endDate: Yup.date()
                .optional()
                .nullable()
                .min(Yup.ref("startDate"), "End date cannot be before start date."),
            status: Yup.string(),
            description: Yup.string().optional().nullable(),
            relationshipImportance: Yup.string().optional().nullable(),
        });

    const formik = useFormik({
        initialValues,
        validationSchema: validationSchema(),
        onSubmit: async (values, { setSubmitting }) => {
            await handleSubmit(values, setSubmitting);
        },
    });

    const handleSubmit = async (values: Relationship, setSubmitting: (isSubmitting: boolean) => void) => {
        try {
            const sanitizedData = replaceEmptyStringWithNull(values);

            let updatedRelationshipsList: Relationship[] = [];

            if (Array.isArray(relationshipsList)) {
                if (editingIndex === null) {
                    // Add the new education item if no index is being edited
                    updatedRelationshipsList = [...relationshipsList, sanitizedData];
                } else {
                    // Replace the existing item at the specific index
                    updatedRelationshipsList = relationshipsList.map((item, index) =>
                        index === editingIndex ? sanitizedData : item
                    );
                }
            } else {
                // If educationList is not an array, initialize it with the new item
                updatedRelationshipsList = [sanitizedData];
            }

            // Route accepts updated Education List and returns updated App User
            const updatedUser: AppUser = await apiRequest<Relationship>(
                ApiMethods.Put,
                ApiRoutes.UpdateUserRelationshipsList,
                updatedRelationshipsList,
                {},
                token
            );

            if (updatedUser) {
                saveUser(updatedUser as AppUser);
                Alert.alert("Relationship List updated successfully.");
                onComplete();
            }

        } catch (error) {
            Alert.alert("There was an error submitting the form. Please try again.");
        } finally {
            setSubmitting(false); // Stop form submission loading state
        }
    };

    const handleEdit = (index: number) => {
        if (userData?.profile?.relationshipsList) {
            const relationshipItem = userData.profile.relationshipsList[index];
            formik.setValues(relationshipItem);
            setEditingIndex(index);
        }
    };

    // TODO: Delete not working correctly
    const handleDelete = (index: number) => {
        Alert.alert(
            "Confirm Deletion",
            "Are you sure you want to delete this relationship entry?",
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "Delete",
                    style: "destructive",
                    onPress: async () => {
                        try {
                            console.log("Delete relationship entry at index: ", index);
                            let updatedRelationshipsList: Relationship[] = [];

                            // Ensure educationList is valid and filter out the index to be deleted
                            if (Array.isArray(relationshipsList)) {
                                updatedRelationshipsList = relationshipsList.filter((_, i) => i !== index);
                            }

                            // Make the API request to update the user's education list
                            const updatedUser: AppUser = await apiRequest<Relationship>(
                                ApiMethods.Put,
                                ApiRoutes.UpdateUserRelationshipsList,
                                updatedRelationshipsList,
                                {},
                                token
                            );

                            // If the user is successfully updated, save the user and notify
                            if (updatedUser) {
                                saveUser(updatedUser as AppUser);
                                Alert.alert("Relationship entry deleted successfully.");
                            }
                        } catch (error) {
                            Alert.alert("There was an error deleting the relationship entry. Please try again.");
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
                {userData?.profile?.relationshipsList?.map((item, index) => (
                    <View key={index} style={styles.listItem}>
                        {item.name && (
                            <Text style={[styles.text, { color: theme.colors.primary }]}>
                                <Text style={styles.label}>School: </Text>{item.name}
                            </Text>
                        )}
                        {item.relationshipType && (
                            <Text style={[styles.text, { color: theme.colors.primary }]}>
                                <Text style={styles.label}>Degree Type: </Text>{item.relationshipType}
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
                {editingIndex !== null ? "Edit Relationship Entry" : "Add Relationship Entry"}
            </Text>

            <TextInputField formLabel="Name" fieldName="name" formik={formik} />
            <SelectInputField formLabel="Relationship Type" fieldName="relationshipType" dataList={typeData.relationshipTypeList} formik={formik}/>
            <SelectInputField formLabel="Relationship Status" fieldName="status" dataList={typeData.relationshipStatusList} formik={formik}/>
            <SelectInputField formLabel="Interacton Frequency" fieldName="interactionFrequency" dataList={typeData.frequenciesList} formik={formik}/>
            <TextInputField formLabel="Description" fieldName="description" formik={formik} />
            <DateInputField formLabel="Date of Birth" fieldName="dateOfBirth" formik={formik} />
            <DateInputField formLabel="Start Date" fieldName="startDate" formik={formik} />
            <DateInputField formLabel="End Date" fieldName="endDate" formik={formik} />

            <Button
                title={editingIndex !== null ? "Update Selected Relationship Record" : "Add a new Relationship Record"}
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

export default RelationshipForm4;