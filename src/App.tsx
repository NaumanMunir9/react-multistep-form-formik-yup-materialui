// libraries
import React from "react";
import { Box, Card, CardContent, Container } from "@material-ui/core";
import { Field } from "formik";
import { TextField, CheckboxWithLabel } from "formik-material-ui";

// components
import ButtonAppBar from "./components/ButtonAppBar";
import { INITIAL_FORM_STATE } from "./components/FormInitialState";
import {
  NAME_VALIDATION,
  NET_WORTH_VALIDATION,
} from "./components/FormValidation";
import { FormikStepper } from "./components/FormikStepper";
import { FormikStep } from "./components/FormikStep";

const sleep = (time: number) => new Promise((acc) => setTimeout(acc, time));

export const App: React.FC = () => {
  return (
    <div>
      <ButtonAppBar />
      <Container>
        <Card>
          <CardContent>
            <FormikStepper
              initialValues={{ ...INITIAL_FORM_STATE }}
              onSubmit={async (values) => {
                await sleep(3000);
                console.log(values);
              }}
            >
              <FormikStep
                label="Personal Data"
                validationSchema={NAME_VALIDATION}
              >
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
                validationSchema={NET_WORTH_VALIDATION}
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
