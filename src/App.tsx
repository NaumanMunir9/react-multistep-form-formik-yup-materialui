import React, { FC, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Step,
  StepLabel,
  Stepper,
} from "@material-ui/core";
import { Field, Form, Formik, FormikConfig, FormikValues } from "formik";
import { TextField, CheckboxWithLabel } from "formik-material-ui";
import { object, mixed, number } from "yup";
import ButtonAppBar from "./components/ButtonAppBar";

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
    <div>
      <ButtonAppBar />
      <Container>
        <Card>
          <CardContent>
            <FormikStepper
              initialValues={initialValueFormik}
              onSubmit={() => {}}
            >
              <FormikStep label="Personal Data">
                <Box paddingBottom={2}>
                  <Field
                    name="firstName"
                    component={TextField}
                    label="First Name"
                    fullWidth
                  />
                </Box>
                <Box paddingBottom={2}>
                  <Field
                    name="lastName"
                    component={TextField}
                    label="Last Name"
                    fullWidth
                  />
                </Box>
                <Box paddingBottom={2}>
                  <Field
                    name="millionaire"
                    type="checkbox"
                    component={CheckboxWithLabel}
                    Label={{ label: "I am a Millionaire" }}
                  />
                </Box>
              </FormikStep>

              <FormikStep
                validationSchema={validationSchemaYup}
                label="Bank Accounts"
              >
                <Box paddingBottom={2}>
                  <Field
                    name="netWorth"
                    type="number"
                    component={TextField}
                    label="Net Worth"
                    fullWidth
                  />
                </Box>
              </FormikStep>

              <FormikStep label="More Info">
                <Box paddingBottom={2}>
                  <Field
                    name="description"
                    component={TextField}
                    label="Description"
                    fullWidth
                  />
                </Box>
              </FormikStep>
            </FormikStepper>
          </CardContent>
        </Card>
      </Container>
    </div>
  );
};

// ----------------------------------------------
// Formik step Function
export interface FormikStepProps
  extends Pick<FormikConfig<FormikValues>, "children" | "validationSchema"> {
  label: string;
}

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

  const isLastStep = () => {
    return step === childrenArray.length - 1;
  };

  return (
    <Formik
      {...props}
      validationSchema={currentChild.props.validationSchema}
      onSubmit={async (values, helpers) => {
        if (isLastStep()) {
          await props.onSubmit(values, helpers);
        } else {
          setStep((currentStep) => currentStep + 1);
        }
      }}
    >
      <Form autoComplete="off">
        <Stepper alternativeLabel activeStep={step}>
          {childrenArray.map((child) => (
            <Step key={child.props.label}>
              <StepLabel>{child.props.label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        {currentChild}

        {step > 0 ? (
          <Button
            onClick={() => setStep((currentStep) => currentStep - 1)}
            color="primary"
            variant="contained"
          >
            Back
          </Button>
        ) : null}

        <Button type="submit" color="primary" variant="contained">
          {isLastStep() ? "Submit" : "Next"}
        </Button>
      </Form>
    </Formik>
  );
};
