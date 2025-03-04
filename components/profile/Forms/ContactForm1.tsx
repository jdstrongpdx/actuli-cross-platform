import React, { useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import AppUser, {Contact} from "../../../../interfaces/AppUser";
import {ApiRoutes} from "../../../../config/apiRoutes";
import {useTypes} from "../../../../contexts/TypesContext";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import {useFormik} from "formik";
import TextField from "../../form/TextField";
import SelectField from "../../form/SelectField";
import DateField from "../../form/DateField";

interface ContactForm1Props {
    userData: AppUser | null,
    error: Error | null,
    updateUser: (route: string, data: Partial<AppUser>) => Promise<void>,
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

const ContactForm1: React.FC<ContactForm1Props> = ({ userData, error, updateUser }) => {
    const {typesData} = useTypes();
    const navigate = useNavigate();

    const ValidationSchema = () =>
        Yup.object().shape({
            email: Yup.string()
                .transform((value) => value.trim()) // Remove unnecessary spaces
                .transform((value) => value.toLowerCase()) // Change case to lowercase
                .email('Invalid email'),
            firstName: Yup.string().required('First Name is required.'),
            lastName: Yup.string().required('Last Name is required.'),
            address1: Yup.string().optional().nullable(),
            address2: Yup.string().optional().nullable(),
            city: Yup.string().optional().nullable(),
            state: Yup.string().optional().nullable(),
            postalCode: Yup.string().optional().nullable(),
            country: Yup.string().optional().nullable(),
            dateOfBirth: Yup.date().required('Date of Birth is required.'),
            homePhone: Yup.string()
                .optional()
                .nullable()
                .matches(/^[0-9]+$/, 'Phone number must only contain digits')
                .min(10, 'Phone number must be at least 10 digits')
                .max(15, 'Phone number must not exceed 15 digits'),
            mobilePhone: Yup.string()
                .optional()
                .nullable()
                .matches(/^[0-9]+$/, 'Phone number must only contain digits')
                .min(10, 'Phone number must be at least 10 digits')
                .max(15, 'Phone number must not exceed 15 digits'),
            website: Yup.string().url('Invalid URL').nullable(),
        });

    const formik = useFormik({
        initialValues,
        validationSchema: ValidationSchema,
        onSubmit: async (values, { setSubmitting }) => {
            try {
                handleSubmit(values);
            } catch (error) {
                console.error("Error submitting form:", error);
            } finally {
                setSubmitting(false); // Ensure the button reactivates
            }
        },
    });

    useEffect(() => {
        if (userData && userData.profile.contact) {
            // data normalized in context
            formik.setValues(userData.profile.contact);
        }
        // eslint-disable-next-line
    }, [])

    const handleSubmit = async (values: Contact) => {
        // Data is normalized in the context before submission
        await updateUser(ApiRoutes.UpdateUserContact, values as Partial<AppUser>);
        if (error){
            if (error.message) {
                throw new Error("Error Updating Contact: " + error.message);
            } else {
                throw new Error("An unknown error occurred.");
            }
        }
        else {
            toast.success("Contact Updated Successfully");
            navigate("/user?view=contact");
        }
    };

    // RENDER JSX RETURN
    if (!userData || !typesData) {
        return <>Loading...</>;
    }

    return (
        <div className="App">
            <Form noValidate onSubmit={formik.handleSubmit}>
                <fieldset>
                    <h2>Contact Edit</h2>

                    <TextField formLabel="First Name" fieldName="firstName" formik={formik} />
                    <TextField formLabel="Last Name" fieldName="lastName" formik={formik} />
                    <TextField formLabel="Email" fieldName="email" formik={formik} />
                    <TextField formLabel="Address1" fieldName="address1" formik={formik} />
                    <TextField formLabel="Address2" fieldName="address2" formik={formik} />
                    <TextField formLabel="City" fieldName="city" formik={formik} />
                    <SelectField formLabel="State" fieldName="state" list={typesData.states.data} formik={formik}/>
                    <TextField formLabel="Postal Code" fieldName="postalCode" formik={formik} />
                    <SelectField formLabel="Country" fieldName="country" list={typesData.countries.data} formik={formik}/>
                    <TextField formLabel="Mobile Phone" fieldName="mobilePhone" formik={formik} />
                    <TextField formLabel="Home Phone" fieldName="homePhone" formik={formik} />
                    <TextField formLabel="Website" fieldName="website" formik={formik} />
                    <DateField formLabel="Date of Birth" fieldName="dateOfBirth" formik={formik} />

                    <Button type="submit" disabled={formik.isSubmitting}>
                        {formik.isSubmitting ? "Submitting..." : "Update Contact"}
                    </Button>
                </fieldset>
            </Form>
        </div>
    );
};

export default ContactForm1;