import React, { FC, useState } from "react";
import { Button, Card, CardContent } from "@material-ui/core";
import { Field, Form, Formik, FormikConfig, FormikValues } from "formik";
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
        <FormikStepper
          validationSchema={validationSchemaYup}
          initialValues={initialValueFormik}
          onSubmit={() => {}}
        >
          <div>
            <Field name="firstName" component={TextField} label="First Name" />
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
        </FormikStepper>
      </CardContent>
    </Card>
  );
};

export const FormikStepper = ({
  children,
  ...props
}: FormikConfig<FormikValues>) => {
  const [step, setStep] = useState(0);

  const childrenArray = React.Children.toArray(children);
  const currentChild = childrenArray[step];

  const isLastStep = () => {
    return step === childrenArray.length - 1;
  };

  return (
    <Formik
      {...props}
      onSubmit={async (values, helpers) => {
        if (isLastStep()) {
          await props.onSubmit(values, helpers);
        } else {
          setStep((currentStep) => currentStep + 1);
        }
      }}
    >
      <Form autoComplete="off">
        {currentChild}

        {step > 0 ? (
          <Button onClick={() => setStep((currentStep) => currentStep - 1)}>
            Back
          </Button>
        ) : null}

        <Button type="submit">{isLastStep() ? "Submit" : "Next"}</Button>
      </Form>
    </Formik>
  );
};
