import { Card, CardContent } from "@material-ui/core";
import { Field, Form, Formik } from "formik";
import { TextField, CheckboxWithLabel } from "formik-material-ui";
import React from "react";

const initialValueFormik = {
  firstName: "",
  lastName: "",
  millionaire: false,
  netWorth: 0,
  description: "",
};

const App = () => {
  return (
    <Card>
      <CardContent>
        <Formik initialValues={initialValueFormik} onSubmit={() => {}}>
          <Form>
            <Field name="firstName" component={TextField} label="First Name" />
            <Field name="lastName" component={TextField} label="Last Name" />
            <Field
              name="millionaire"
              type="checkbox"
              component={CheckboxWithLabel}
              Label={{ label: "I am a Millionaire" }}
            />
            <Field
              name="netWorth"
              type="number"
              component={TextField}
              label="Net Worth"
            />
            <Field
              name="description"
              component={TextField}
              label="Description"
            />
          </Form>
        </Formik>
      </CardContent>
    </Card>
  );
};

export default App;
