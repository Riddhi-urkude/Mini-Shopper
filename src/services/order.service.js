import axios from "axios";

import { publicAxiosInstance, privateAxiosInstance } from "./Axios.Service";


// get order by id
export const getOrderById = async (orderId) => {
  const result = await privateAxiosInstance.post(`/minishop/${orderId}`);
  return result.data;
};


// get all orders by user id
export const getAllOrdersByUserId = async (userId) => {
  const result = await privateAxiosInstance.post(`/minishop/user/${userId}`);
   return result.data;
};

// create order
export const createOrder = async (order) => {
    console.log("coming inside create order" );
    console.log(order);
   const result = await privateAxiosInstance.post(`/minishop/placeOrder`, order);
    return result.data;
};


export const createOrderwithSingleProduct= async (order) => {
  console.log(order);
  const result = await privateAxiosInstance.post(`/minishop/singleProduct`, order);
  return result.data;
}

export const createOrderByExcelSheet = async (order) => {
  console.log(order);
  const result = await privateAxiosInstance.post(`/minishop/excelOrder`, order);
  console.log(result);
  return result;

}

export const getAllProductsForExcel = async () =>{
  try{
     return await privateAxiosInstance.get(`/minishop/excel`);
  }catch(err){
     console.log(err);
  }
}

// update order
export const updateOrder = async (values) => {
  console.log(values);
  // console.log(orderId);
  // const data={
  //   orderId : "03bea9ef-a789-475c-8751-03b75d2db7b7",
  //   orderStatus : "SEND FOR MODIFICATION",
  //   reason : "i won't tell you"
  // }
  try{
    const result = await privateAxiosInstance.post(`/minishop/changeOrderStatus`, values);
    console.log(result);
    
    return result.data;

  }catch(err){
    console.log(err);
  }

  
};


// add item to order
export const updateOrderItemService = async (data) => {
  console.log(data);
  const res = await privateAxiosInstance.post(`/minishop/updateOrderItem`, data);
//  console.log(res);
  return res.data;
};

// remove item from cart
export const removeItemFromOrder = async (orderItemId) => {
  console.log(orderItemId);
  try{
   const res= await privateAxiosInstance.delete(`/minishop/item/${orderItemId}`);
  //return res.data;
  //console.log(res);
  return res.data;
  }catch(err){
    
  }
};

// remove all items from cart
export const removeAllItemsFromOrder = async (userId) => {
  // const res = await privateAxios.delete(`${API_ENDPOINTS.CARTS}/${userId}`);
  //return res.data;
  return "";
};

export const getAllOrders = async () => {
  const result = await privateAxiosInstance.post(`/minishop/getAllOrders/${"leodas@gmail.com"}`);
  return result.data;

}

// export const updateOrderStatus = async (updatedOrder) => {
//   const result = await privateAxiosInstance.post(`/orders/changeOrderStatus`, updatedOrder);
// }



