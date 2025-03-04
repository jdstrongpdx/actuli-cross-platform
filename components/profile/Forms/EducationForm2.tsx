import React, {useEffect, useState} from "react";
import {Form, Button, Col} from "react-bootstrap";
import AppUser, {Education} from "../../../../interfaces/AppUser";
import {ApiRoutes} from "../../../../config/apiRoutes";
import {useTypes} from "../../../../contexts/TypesContext";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import {useFormik} from "formik";
import SelectField from "../../form/SelectField";
import DateField from "../../form/DateField";
import TextField from "../../form/TextField";
import Verify from "../../form/Verify";

interface EducationForm2Props {
    userData: AppUser | null,
    error: Error | null,
    updateUser: (route: string, data: Partial<AppUser>) => Promise<void>,
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

const EducationForm2: React.FC<EducationForm2Props> = ({ userData, error, updateUser }) => {
    const [educationList, setEducationList] = useState<Education[]>([])
    const [listIndex, setListIndex] = useState(0);
    const [newFlag, setNewFlag] = useState<boolean>(false);
    const {typesData} = useTypes();
    const navigate = useNavigate();

    const ValidationSchema = () =>
        Yup.object().shape({
            school: Yup.string().required('School Name is required.'),
            degreeType: Yup.string().required('Degree Type is required.'),
            degreeName: Yup.string().required('Degree Name is required.'),
            city: Yup.string().optional().nullable(),
            state: Yup.string().optional().nullable(),
            country: Yup.string().optional().nullable(),
            location: Yup.string().optional().nullable(),
            status: Yup.string().required('Status is required.'),
            completionDate: Yup.date().required('Completion or Estimated Completion date is required'),
            grade: Yup.string().optional().nullable(),
            gradeScale: Yup.string().optional().nullable(),
            description: Yup.string().optional().nullable(),
            importance: Yup.string().optional().nullable(),
        });

    const formik = useFormik({
        initialValues,
        validationSchema: ValidationSchema,
        onSubmit: async (values, {setSubmitting}) => {
            try {
                handleSubmit(values);
            } catch (error) {
                console.error("Error submitting form:", error);
            } finally {
                setSubmitting(false); // Ensure the button reactivates
            }
        },
    });

    // On page load, sort the education list by completion date
    useEffect(() => {
        if (userData && userData.profile.educationList.length > 0) {
            setEducationList(userData.profile.educationList.sort(
                (a, b) => new Date(a.completionDate).getTime() - new Date(b.completionDate).getTime()))
        }
    }, []);

    useEffect(() => {
        if (userData && userData.profile.educationList.length > 0) {
            // data normalized in context
            formik.setValues(userData.profile.educationList[listIndex]);
        }
    }, [listIndex])

    const addNew = () => {
        setNewFlag(true);
        formik.setValues(initialValues);
    }

    const deleteEducation = async () => {
        const updatedList = educationList.filter((item, index) => index !== listIndex);
        setEducationList(updatedList);

        // Data is normalized in the context before submission
        await updateUser(ApiRoutes.UpdateUserEducationList, updatedList as Partial<AppUser>);
        if (error) {
            if (error.message) {
                throw new Error("Error Deleting Education: " + error.message);
            } else {
                throw new Error("An unknown error occurred.");
            }
        } else {
            toast.success("Education Deleted Successfully");
            navigate("/user?view=education");
        }
    }

    const handleSubmit = async (values: Education) => {
        if (newFlag) {
            // If new, add to the end of the list
            const updatedList = [...educationList, values];
            setEducationList(updatedList)
        } else {
            // If replacing existing, create a new list with the updated value
            const updatedList = [...educationList];
            updatedList[listIndex] = values;
            setEducationList(updatedList);
        }

        // Data is normalized in the context before submission
        await updateUser(ApiRoutes.UpdateUserEducationList, educationList as Partial<AppUser>);
        if (error){
            if (error.message) {
                throw new Error("Error Updating Education: " + error.message);
            } else {
                throw new Error("An unknown error occurred.");
            }
        }
        else {
            toast.success("Education Updated Successfully");
            navigate("/user?view=education");
        }
    };

    // LIST COMPONENT FOR RENDERING EDUCATION ITEMS
    const displayList = () => {
        if (!educationList) {
            return (
                <>
                    <p>No records found.</p>
                    <Button variant="primary" onClick={() => addNew()}>Add New</Button>
                </>
            )}
        return (
            <>
                <p>Select from the following list to edit a record or select new to add a new one.</p>

                <ol>
                    {educationList.map((item, index) => (
                        <li
                            key={index}
                            onClick={() => setListIndex(index)}
                            style={{ cursor: "pointer", marginBottom: "10px" }}
                        >
                            <strong>{item.degreeType}</strong> at <strong>{item.school}</strong> - {new Date(item.completionDate).toLocaleDateString()}
                        </li>
                    ))}
                </ol>

                <Col className="mb-2">
                    <Button className="me-3" variant="primary" onClick={() => addNew()}>Add New</Button>
                </Col>

            </>
        )
    }

    // RENDER JSX CONTENT
    if (!userData || !typesData) {
        return <>Loading...</>;
    }

    return (
        <div className="App">
            <h2>Education Edit</h2>

            { displayList() }

            <Form noValidate onSubmit={formik.handleSubmit}>
                <fieldset>

                    <TextField formLabel="School Name" fieldName="school" formik={formik} />
                    <SelectField
                        formLabel="Degree Type"
                        fieldName="degreeType"
                        list={typesData.educationDegreeList.data}
                        formik={formik}
                    />
                    <TextField formLabel="Degree Name" fieldName="degreeName" formik={formik} />
                    <TextField formLabel="City" fieldName="city" formik={formik} />
                    <SelectField
                        formLabel="State/Province"
                        fieldName="state"
                        list={typesData.states.data}
                        formik={formik}
                    />
                    <SelectField
                        formLabel="Country"
                        fieldName="country"
                        list={typesData.countries.data}
                        formik={formik}
                    />

                    <SelectField
                        formLabel="Degree Status"
                        fieldName="status"
                        list={typesData.educationStatusList.data}
                        formik={formik}
                    />

                    <DateField
                        formLabel="Completion or Estimated Completion Date"
                        fieldName="completionDate"
                        formik={formik} />

                    <TextField formLabel="Grade" fieldName="grade" formik={formik} />

                    <SelectField
                        formLabel="Grade Scale"
                        fieldName="gradeScale"
                        list={typesData.educationGradeScaleList.data}
                        formik={formik}
                    />

                    <TextField formLabel="Description" fieldName="description" formik={formik} />

                    <SelectField
                        formLabel="Importance to you personally or to your career"
                        fieldName="importance"
                        list={typesData.fiveLevelList.data}
                        formik={formik}
                    />

                    <Col>
                        <Button className="me-2" type="submit" disabled={formik.isSubmitting}>
                            {formik.isSubmitting ? "Submitting..." : "Update Education"}
                        </Button>
                        <Verify
                            onConfirm={deleteEducation}
                            confirmText="Delete Education"
                            messageText="Are you sure you want to delete this education item? This action cannot be undone.">
                            <Button className="btn btn-danger m-2">Delete Item</Button>
                        </Verify>
                    </Col>
                </fieldset>
            </Form>
        </div>
    );
};

export default EducationForm2;