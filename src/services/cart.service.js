import { publicAxiosInstance, privateAxiosInstance } from "./Axios.Service";


const cart = {};

export const getCartByUserId = async (userId) => {
   // const res = await axios.get(`http://localhost:8080/carts/user/${userId}`);
   // console.log("in cart service");
   // console.log(res);
  try{
   const res = await publicAxiosInstance.get(`/carts/user/${userId}`);
   //console.log(res.data);
    return res.data;
  }catch(err){   
     
  }
 //  return cart;
};
  
  // add item to cart
export const addItemToCart = async (data, userId) => {

  //  const res = await axios.post(`http://localhost:8080/carts/${userId}`, data);

// const res = await axios.post(`http://localhost:8080/carts/${userId}`, data,
//  {
//   headers: {
//     "Authorization" : `Bearer ${token.accessToken}`,
//     },
//   }
// ); 
console.log("in add item to cart");
  const res = await privateAxiosInstance.post(`/carts/${userId}`,data);

    console.log(res);
    return res.data;
};
  
  // remove item from cart
export const removeItemFromCart = async (userId, itemId) => {
    try{
//      const res = await axios.delete(`http://localhost:8080/carts/${userId}/item/${itemId}`);
      const res = await privateAxiosInstance.delete(`/carts/${userId}/item/${itemId}`);
    //return res.data;
    //console.log(res);
    return res.data;
    }catch(err){
      
    }
};
  
  // remove all items from cart
export const removeAllItemsFromCart = async (userId) => {
    
    //return res.data;
    return cart;
};
