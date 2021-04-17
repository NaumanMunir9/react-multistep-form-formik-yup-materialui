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
        <FormikStepper initialValues={initialValueFormik} onSubmit={() => {}}>
          <FormikStep>
            <Field name="firstName" component={TextField} label="First Name" />
            <Field name="lastName" component={TextField} label="Last Name" />
            <Field
              name="millionaire"
              type="checkbox"
              component={CheckboxWithLabel}
              Label={{ label: "I am a Millionaire" }}
            />
          </FormikStep>

          <FormikStep validationSchema={validationSchemaYup}>
            <Field
              name="netWorth"
              type="number"
              component={TextField}
              label="Net Worth"
            />
          </FormikStep>

          <FormikStep>
            <Field
              name="description"
              component={TextField}
              label="Description"
            />
          </FormikStep>
        </FormikStepper>
      </CardContent>
    </Card>
  );
};

// ----------------------------------------------
// Formik step Function
export interface FormikStepProps
  extends Pick<FormikConfig<FormikValues>, "children" | "validationSchema"> {}

export const FormikStep = ({ children }: FormikStepProps) => {
  return <>{children}</>;
};

// ----------------------------------------------
// Formik Stepper Function
export const FormikStepper = ({
  children,
  ...props
}: FormikConfig<FormikValues>) => {
  const [step, setStep] = useState(0);

  const childrenArray = React.Children.toArray(
    children
  ) as React.ReactElement<FormikStepProps>[];

  const currentChild = childrenArray[step];
  console.log("children", currentChild);

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
