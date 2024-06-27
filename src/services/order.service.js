import axios from "axios";

import { publicAxiosInstance, privateAxiosInstance } from "./Axios.Service";


// get order by id
export const getOrderById = async (orderId) => {
  const result = await privateAxiosInstance.get(`/orders/${orderId}`);
  return result.data;
};


// get all orders by user id
export const getAllOrdersByUserId = async (userId) => {
  const result = await privateAxiosInstance.get(`/orders/user/${userId}`);
   return result.data;
};

// create order
export const createOrder = async (order) => {
    console.log("coming inside create order" );
    console.log(order);
   const result = await privateAxiosInstance.post(`/orders`, order);
    return result.data;
};


export const createOrderwithSingleProduct= async (order) => {
  console.log(order);
  const result = await privateAxiosInstance.post(`/orders/singleProduct`, order);
  return result.data;
}

export const createOrderByExcelSheet = async (order) => {
  console.log(order);
  const result = await privateAxiosInstance.post(`/orders/excel`, order);
  return result.data;

}

export const getAllProductsForExcel = async () =>{
  try{
     return await privateAxiosInstance.get(`/orders/excel`);
  }catch(err){
     console.log(err);
  }
}

// update order
export const updateOrder = async (order, orderId) => {
//   const result = await privateAxios.put(
//     `${API_ENDPOINTS.ORDERS}/${orderId}`,
//     order
//   );
//   return result.data;
};


// add item to order
export const updateOrderItemService = async (data) => {
  console.log(data);
  const res = await privateAxiosInstance.post(`/orders/updateOrderItem`, data);
//  console.log(res);
  return res.data;
};

// remove item from cart
export const removeItemFromOrder = async (orderItemId) => {
  console.log(orderItemId);
  try{
   const res= await privateAxiosInstance.delete(`/orders/item/${orderItemId}`);
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
