import * as React from 'react'
import { Formik, FormikHelpers, FormikProps, Form, Field, FieldProps, withFormik } from 'formik';

interface PropertyFormValueProps {
    street_address: string;
    owner_name: string;
    owner_mailing_address: string;
    city_state_zip: {
        city: string,
        state: string,
        zipcode: string,
    };
}

const initialValues: PropertyFormValueProps = {
    street_address: "",
    owner_name: "",
    owner_mailing_address: "",
    city_state_zip: {
        city: "",
        state: "",
        zipcode: ""
    }
}

function PropertyForm() {
    return
    (
        <Formik
            initialValues={initialValues}
            onSubmit={(values, actions) => {
                actions.setSubmitting(false)
            }}
        > {({
            handleSubmit,
            handleChange,
            handleBlur,
            values,
            touched,
            isValid,
            errors,
        }) =>
        (
            <Form onSubmit={handleSubmit}>
                <label htmlFor="streetAddress">Street Address</label>
                <Field
                    id="streetAddress"
                    name="streetAddress"
                    placeholder="Street Address" />
                <label htmlFor="ownerName">Owner Name</label>
                <Field
                    id="ownerName"
                    name="ownerName"
                    placeholder="Owner Name" />
                <label htmlFor="cityStateZip">City / State / Zip</label>
                <Field
                    id="cityStateZip"
                    name="cityStateZip"
                    placeholder="city state zip" />
                <label htmlFor="ownerMailingAddress">Owner Mailing Address</label>
                <Field
                    id="ownerMailingAddress"
                    name="ownerMailingAddress"
                    placeholder="owner mailing address" />
                <button type="submit">Submit</button>
            </Form>
        )

            }
        </Formik >
    )

}
