import React, { FC } from "react";
import { Card, CardContent } from "@material-ui/core";
import { Field, Form, Formik } from "formik";
import { TextField, CheckboxWithLabel } from "formik-material-ui";
import { object, mixed, number } from "yup";

const initialValueFormik = {
  firstName: "",
  lastName: "",
  millionaire: false,
  netWorth: 0,
  description: "",
};

const validationSchemaYup = object().shape({
  netWorth: mixed().when("millionaire", {
    is: true,
    then: number()
      .required()
      .min(1000000, "You need to have a net worth of atleast 1 million"),
    otherwise: number().required(),
  }),
});

export const App: FC = () => {
  return (
    <Card>
      <CardContent>
        <Formik
          validationSchema={validationSchemaYup}
          initialValues={initialValueFormik}
          onSubmit={() => {}}
        >
          <Form autoComplete="off">
            <div>
              <Field
                name="firstName"
                component={TextField}
                label="First Name"
              />
              <Field name="lastName" component={TextField} label="Last Name" />
              <Field
                name="millionaire"
                type="checkbox"
                component={CheckboxWithLabel}
                Label={{ label: "I am a Millionaire" }}
              />
            </div>

            <div>
              <Field
                name="netWorth"
                type="number"
                component={TextField}
                label="Net Worth"
              />
            </div>

            <div>
              <Field
                name="description"
                component={TextField}
                label="Description"
              />
            </div>
          </Form>
        </Formik>
      </CardContent>
    </Card>
  );
};

export const FormikStepper = () => {};
