import * as Yup from "yup";
import { REGEX_VALIDATIONS } from "../regex";

export const placeOrderSchema = Yup.object().shape({
  firstName: Yup.string().required("Please provide a first name"),
  lastName: Yup.string().required("Please provide a last name"),
  
    shippingAddress: Yup.string()
  .min(10, "Address should be atleast 100 characters")
  .required("Address is required"),
  
  pinCode: Yup.string()
  .min(6, "Pincode should contain 6 Numbers")
  .max(6, "Pincode should not contain more than 6 Numbers")
  .matches(REGEX_VALIDATIONS.POSTAL_CODE,
    "Pincode is required"),
    
  city: Yup.string().required("Please provide a city"),
  state: Yup.string().required("Please provide a sate"),
  phoneNumber: Yup.string()
  .min(10, "Shipping Phone should contain 10 Numbers")
  .max(10, "Shipping Phone should not contain more than 10 Numbers")
    .matches(
      REGEX_VALIDATIONS.PHONE,
      "Please provide a valid 10 digit phone number"
    )
    .required("Please provide a phone number"),
});
