import * as Yup from "yup";
import { REGEX_VALIDATIONS } from "../regex";

export const loginSchema = Yup.object().shape({
    role: Yup.string().required("Please provide role"),
    userId: Yup.string().required("Please provide your email"),
    password: Yup.string()
    .min(10, "Password should be atleast 10 characacters")
    .matches(
      REGEX_VALIDATIONS.PASSWORD,
      "Password should contain atleast one uppercase, one lowercase, one number and one special character"
    )
    .required("Please provide your password"),
   
});
