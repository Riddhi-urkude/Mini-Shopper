import * as Yup from "yup";

export const loginSchema = Yup.object().shape({
    role: Yup.string().required("Please provide role"),
    userId: Yup.string().required("Please provide an email"),
    password: Yup.string().required("Please provide a password")
});
