import * as Yup from "yup";
import { REGEX_VALIDATIONS } from "../regex";

export const OrderStatusSchema = Yup.object().shape({

    orderStatus: Yup.string().required("Order Status is required"),    
    deliveredDate: Yup.string().required("Please give an expected delivery date"),
    comments: Yup.string().required("Please put some comments for this order")

});
