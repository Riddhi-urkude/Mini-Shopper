import axios from "axios";

import { publicAxiosInstance, privateAxiosInstance } from "./Axios.Service";


export const getAllProducts= async (page) =>{
      try {
        return await publicAxiosInstance.get(`/products/listAllProducts`);
      } catch (err) {
         alert(err);
       }
}

export const getProductById = async (productId) =>{
  try {
    const result = await privateAxiosInstance.post(`/products/productId/${productId}`); 
     return result.data;
  } catch (err) {
//    console.log(err);
    alert(err);
  }
}

export const getProductsByCategoryId = async (categoryId,page) =>{
  // try {

   return  await publicAxiosInstance.get(`/categories/${categoryId}/products`);
 // console.log(res.data);
// } catch (err) {
//   //    console.log(err);
//       alert(err);
//     }


}

export const uploadImage = async (image) => {
 console.log(image);
// const someData="now it is comming";
//    const data = new FormData();
//    data.append("image", image);
//  console.log(data);
  return publicAxiosInstance
    .get(`/products/addImage/`,image) 
    .then((res) => { 
      return res.data; 
    });

//   const res = await axios.get(`http://localhost:8080/products/addImage`, image,
//  {
//   headers: {
//     "content-type" : `multipart/form-data`,
//     // "Authorization" : `Bearer ${token.accessToken}`,
//     },
//   }
// ); 


};


