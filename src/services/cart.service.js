import axios from "axios";
import { API_ENDPOINTS } from "./helper.service";

const cart = {};

export const getCartByUserId = async (userId) => {
    const res = await axios.get(`http://localhost:8080/carts/user/${userId}`);
   // console.log("in cart service");
   // console.log(res);
    return res.data;
 
 //  return cart;
};
  
  // add item to cart
export const addItemToCart = async (data, userId) => {

    const res = await axios.post(`http://localhost:8080/carts/${userId}`, data);
  //  console.log(res);
    return res.data;
};
  
  // remove item from cart
export const removeItemFromCart = async (userId, itemId) => {
    try{
      const res = await axios.delete(`http://localhost:8080/carts/${userId}/item/${itemId}`);
    //return res.data;
    //console.log(res);
    return res.data;
    }catch(err){
      
    }
};
  
  // remove all items from cart
export const removeAllItemsFromCart = async (userId) => {
    // const res = await privateAxios.delete(`${API_ENDPOINTS.CARTS}/${userId}`);
    //return res.data;
    return cart;
};