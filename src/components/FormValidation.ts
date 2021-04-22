import { object, mixed, number, string } from "yup";

export const NET_WORTH_VALIDATION = object().shape({
  netWorth: mixed().when("millionaire", {
    is: true,
    then: number()
      .required()
      .min(1000000, "You need to have a net worth of atleast 1 million"),
    otherwise: number().required(),
  }),
});

export const NAME_VALIDATION = object().shape({
  firstName: string().required("First Name is a required field"),
  lastName: string().required("Last Name is a required field"),
});
