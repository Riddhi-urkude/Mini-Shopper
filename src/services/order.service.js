import axios from "axios";
import { API_ENDPOINTS } from "./helper.service";

// get order by id
export const getOrderById = async (orderId) => {
  const result = await axios.get(`http://localhost:8080/orders/${orderId}`);
  return result.data;
};

// get all orders
export const getAllOrders = async (
  pageNumber,
  pageSize = API_ENDPOINTS.ORDER_PAGE_SIZE,
  sortBy = "createdAt",
  sortDir = "asc"
) => {
//   const result = await privateAxios.get(
//     `${API_ENDPOINTS.ORDERS}?pageNumber=${pageNumber}&pageSize=${pageSize}&sortBy=${sortBy}&sortDir=${sortDir}`
//   );
//   return result.data;
};

// get all orders by user id
export const getAllOrdersByUserId = async (userId) => {
  const result = await axios.get(`http://localhost:8080/orders/user/${userId}`);
   return result.data;
};

// create order
export const createOrder = async (order) => {
    console.log("coming inside create order" );
    console.log(order);
   const result = await axios.post(`http://localhost:8080/orders`, order);
   return result.data;
};

// update order
export const updateOrder = async (order, orderId) => {
//   const result = await privateAxios.put(
//     `${API_ENDPOINTS.ORDERS}/${orderId}`,
//     order
//   );
//   return result.data;
};