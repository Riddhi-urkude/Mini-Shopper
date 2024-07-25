import * as Yup from "yup";
import { REGEX_VALIDATIONS } from "../regex";

export const registerSchema = Yup.object().shape({
  userType: Yup.string().required("Please Provide User type"),
  firstName: Yup.string().required("Please provide your first name"),
  lastName: Yup.string().required("Please provide your last name"),
  email: Yup.string()
    .email("Please provide a valid email")
    .required("Please provide an email"),
  phoneNumber: Yup.string()
    .min(10, "Shipping Phone should contain 10 Numbers")
    .max(10, "Shipping Phone should not contain more than 10 Numbers")
      .matches(
        REGEX_VALIDATIONS.PHONE,
        "Please provide a valid 10 digit phone number"
      )
      .required("Please provide a phone number"),
  password: Yup.string()
    .min(10, "Password should be atleast 10 characacters")
    .matches(
      REGEX_VALIDATIONS.PASSWORD,
      "Password should contain atleast one uppercase, one lowercase, one number and one special character"
    )
    .required("Please provide your password"),
  cpassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Please confirm your password"),
  addressLine: Yup.string()
    .min(10, "Address should be atleast 10 characters")
    .required("Address is required"),
  city: Yup.string().required("City is required"),
  street: Yup.string().required("Street is required"),
  state: Yup.string()
    .required(
      "State is required"
    ),
  pinCode: Yup.string()
    .min(6, "Pincode should contain 6 Numbers")
    .max(6, "Pincode should not contain more than 6 Numbers")
    .matches(REGEX_VALIDATIONS.POSTAL_CODE,
      "Please enter valid Pincode").required("Please provide a postal code"),
  addressType: Yup.string().required("Address Type is required"),
});
