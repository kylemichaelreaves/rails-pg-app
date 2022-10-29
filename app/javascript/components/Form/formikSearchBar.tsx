import * as React from "react";
import {
  Formik,
  FormikHelpers,
  Field,
  Form,
  useField,
  useFormikContext,
} from "formik";

interface Values {
  searchTerm: string;
}

export default function SearchBar() {
  return (
    <div>
      <Formik
        initialValues={{ searchTerm: "" }}
        onSubmit={(
          values: Values,
          { setSubmitting }: FormikHelpers<Values>
        ) => {}}
      >
        <Form>
          <label htmlFor="searchTerm">Search Term</label>
          <Field id="searchTerm" name="searchTerm" placeholder="search…" />
        </Form>
      </Formik>
    </div>
  );
}
