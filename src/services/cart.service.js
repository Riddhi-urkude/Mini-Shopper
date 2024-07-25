import { publicAxiosInstance, privateAxiosInstance } from "./Axios.Service";


const cart = {};

export const getCartByUserId = async (userId) => {
  try{
    const res = await privateAxiosInstance.post(`/carts/user/${userId}`);
    return res.data;
  }catch(err){   
     return err;
  }
};
  
  // add item to cart
export const addItemToCart = async (data, userId) => {
  try{
    const res = await privateAxiosInstance.post(`/carts/${userId}`,data);
    return res.data;
  }catch(err){
    return err;
  }
};
  
  // remove item from cart
export const removeItemFromCart = async (userId, itemId) => {
    try{
      const res = await privateAxiosInstance.delete(`/carts/${userId}/item/${itemId}`);
      return res.data;
    }catch(err){
      return err;
    }
};
  
