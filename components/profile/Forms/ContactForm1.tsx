import React, { useEffect } from "react";
import {ScrollView, StyleSheet, Text, Alert} from "react-native";
import { useFormik } from "formik";
import * as Yup from "yup";
import AppUser, {Contact} from "@/interfaces/AppUser";
import {useTypeData} from "@/contexts/TypeDataContext";
import TextInputField from "@/components/form/TextInputField";
import SelectInputField from "@/components/form/SelectInputField";
import {useAppUser} from "@/contexts/AppUserContext";
import DateInputField from "@/components/form/DateInputField";
import { Button} from '@rneui/themed';
import apiRequest from "@/utils/apiRequest";
import {ApiMethods, ApiRoutes} from "@/enums/ApiEnums";
import {useSession} from "@/contexts/AuthContext";
import {replaceEmptyStringWithNull} from "@/utils/normalizationUtils";

interface ContactForm1Props {
    userData: AppUser | null;
    onComplete: () => void;
}

const initialValues: Contact = {
    email: "",
    firstName: "",
    lastName: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
    dateOfBirth: "",
    homePhone: "",
    mobilePhone: "",
    website: "",
};

const ContactForm1: React.FC<ContactForm1Props> = ({ userData, onComplete }) => {
    const { typeData } = useTypeData();
    const { saveUser } = useAppUser();
    const { token } = useSession();

    const ValidationSchema = () =>
        Yup.object().shape({
            email: Yup.string()
                .transform((value) => value.trim()) // Remove unnecessary spaces
                .transform((value) => value.toLowerCase()) // Change case to lowercase
                .email("Invalid email"),
            firstName: Yup.string().required("First Name is required."),
            lastName: Yup.string().required("Last Name is required."),
            address1: Yup.string().optional().nullable(),
            address2: Yup.string().optional().nullable(),
            city: Yup.string().optional().nullable(),
            state: Yup.string().optional().nullable(),
            postalCode: Yup.string().optional().nullable(),
            country: Yup.string().optional().nullable(),
            dateOfBirth: Yup.date().required("Date of Birth is required."),
            homePhone: Yup.string()
                .optional()
                .nullable()
                .matches(/^[0-9]+$/, "Phone number must only contain digits")
                .min(10, "Phone number must be at least 10 digits")
                .max(15, "Phone number must not exceed 15 digits"),
            mobilePhone: Yup.string()
                .optional()
                .nullable()
                .matches(/^[0-9]+$/, "Phone number must only contain digits")
                .min(10, "Phone number must be at least 10 digits")
                .max(15, "Phone number must not exceed 15 digits"),
            website: Yup.string().url("Invalid URL").nullable(),
        });

    const formik = useFormik({
        initialValues,
        validationSchema: ValidationSchema,
        onSubmit: async (values, { setSubmitting }) => {
            await handleSubmit(values, setSubmitting);
        },
    });

    const handleSubmit = async (values: Contact, setSubmitting: (isSubmitting: boolean) => void) => {
        try {
            const sanitizedData = replaceEmptyStringWithNull(values);

            // Route accepts updated Contact and returns updated App User
            const updatedUser: AppUser = await apiRequest<Contact>(
                ApiMethods.Put,
                ApiRoutes.UpdateUserContact,
                sanitizedData,
                {},
                token
            );

            if (updatedUser) {
                saveUser(updatedUser as AppUser);
                Alert.alert("Contact updated successfully.");
                onComplete();
            }

        } catch (error) {
            Alert.alert("There was an error submitting the form. Please try again.");
        } finally {
            setSubmitting(false); // Stop form submission loading state
        }
    };

    useEffect(() => {
        if (userData && userData.profile.contact) {
            // data normalized in context
            formik.setValues(userData.profile.contact);
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
        <ScrollView contentContainerStyle={styles.formContainer}>
            <TextInputField formLabel="First Name" fieldName="firstName" formik={formik} />
            <TextInputField formLabel="Last Name" fieldName="lastName" formik={formik} />
            <TextInputField formLabel="Email" fieldName="email" formik={formik} />
            <TextInputField formLabel="Address1" fieldName="address1" formik={formik} />
            <TextInputField formLabel="Address2" fieldName="address2" formik={formik} />
            <TextInputField formLabel="City" fieldName="city" formik={formik} />
            <SelectInputField formLabel="State" fieldName="state" dataList={typeData.states} formik={formik}/>
            <TextInputField formLabel="Postal Code" fieldName="postalCode" formik={formik} />
            <SelectInputField formLabel="Country" fieldName="country" dataList={typeData.countries} formik={formik}/>
            <TextInputField formLabel="Mobile Phone" fieldName="mobilePhone" formik={formik} />
            <TextInputField formLabel="Home Phone" fieldName="homePhone" formik={formik} />
            <TextInputField formLabel="Website" fieldName="website" formik={formik} />
            <DateInputField formLabel="Date of Birth" fieldName="dateOfBirth" formik={formik} />

            <Button
                title="Save Contact"
                onPress={() => formik.submitForm()}
                buttonStyle={styles.saveButton}
                disabled={formik.isSubmitting || !formik.isValid}
                loading={formik.isSubmitting}
            />

            <Button
                title="Cancel"
                onPress={onComplete}
                buttonStyle={styles.cancelButton}
            />

        </ScrollView>
    );
};

const styles = StyleSheet.create({
    formContainer: {
        paddingHorizontal: 16,
        paddingBottom: 130
    },
    saveButton: {
        backgroundColor: "rgba(78, 116, 289, 1)",
        borderRadius: 5,
    },
    cancelButton: {
        backgroundColor: "#868686",
        borderRadius: 5,
        marginTop: 10,
    },
});

export default ContactForm1;