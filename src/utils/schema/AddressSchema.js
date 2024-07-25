import * as Yup from "yup";
import { REGEX_VALIDATIONS } from "../regex";
 
export const AddressSchema = Yup.object().shape({
  state: Yup.string()
    .required(
      "State is required"
    ),
  addressLine: Yup.string()
  .min(10, "Address should be atleast 100 characters")
  .required("Address is required"),

  addressType: Yup.string().required("Address Type is required"),
  pinCode: Yup.string()
  .min(6, "Pincode should contain 6 Numbers")
  .max(6, "Pincode should not contain more than 6 Numbers")
  .matches(REGEX_VALIDATIONS.POSTAL_CODE,
    "Please enter valid Pincode").required("Please provide a postal code"),
 
  city: Yup.string().required("City is required"),
 
  street: Yup.string().required("Street is required"),
 addressType: Yup.string().required("Address Type is required"),
 phoneNumber: Yup.string()
 .min(10, "Shipping Phone should contain 10 Numbers")
 .max(10, "Shipping Phone should not contain more than 10 Numbers")
   .matches(
     REGEX_VALIDATIONS.PHONE,
     "Please provide a valid 10 digit phone number"
   )
   .required("Please provide a phone number"),
});