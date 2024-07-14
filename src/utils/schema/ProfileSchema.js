import * as Yup from "yup";
import { REGEX_VALIDATIONS } from "../regex";
 
export const profileSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(1, "First Name need atleast 1 characters")
    .required("Please provide a first name"),
  lastName: Yup.string()
    .min(2, "Last Name need atleast 2 characters")
    .required("Please provide a last name"),
  state: Yup.string()
    .required(
      "State is required"
    ),
  address: Yup.string()
  .min(10, "Address should be atleast 100 characters")
  .required("Address is required"),
 
  pinCode: Yup.string()
  .min(6, "Pincode should contain 6 Numbers")
  .max(6, "Pincode should not contain more than 6 Numbers")
  .matches(REGEX_VALIDATIONS.POSTAL_CODE,
    "Please enter valid Pincode").required("Please provide a postal code"),
 
  city: Yup.string().required("City is required"),
 
  street: Yup.string().required("Street is required"),
 addressType: Yup.string().required("Address Type is required"),
});
