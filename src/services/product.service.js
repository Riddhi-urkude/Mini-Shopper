import axios from "axios";

export const getAllProducts= async (page) =>{
      try {
        return await axios.get(`http://localhost:8080/products/listAllProducts`);
//          return await axios.post(`http://localhost:8080/products/productCategory/${category}`);
//          return await axios.post(`http://localhost:8080/products/updateProduct`);
       } catch (err) {
         alert(err);
       }
}

export const getProductById = async (productId) =>{
  try {
    const result = await axios.post(`http://localhost:8080/products/productId/${productId}`); 
     return result.data;
  } catch (err) {
//    console.log(err);
    alert(err);
  }
}

export const getProductsByCategoryId = async (categoryId,page) =>{
  // try {

   return  await axios.get(`http://localhost:8080/categories/${categoryId}/products`);
 // console.log(res.data);
// } catch (err) {
//   //    console.log(err);
//       alert(err);
//     }


}

