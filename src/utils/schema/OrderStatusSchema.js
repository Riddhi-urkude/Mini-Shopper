import * as Yup from "yup";
import { REGEX_VALIDATIONS } from "../regex";

export const OrderStatusSchema = Yup.object().shape({


    orderStatus: Yup.string()
   .required("Order Status is required"),
  
    
    deliveredDate: Yup.string().required("Please give an expected delivery date"),
  
   // orderStatus: Yup.string().required("Please select a Status"),
  
    comments: Yup.string().required("Please put some comments for this order")
//     reason: Yup.string()
//   .min(10, "reason should contain 10 Numbers")
//   .max(10, "Reason should not contain more than 450 Numbers")
//   .required("Please provide a reason"),

});
