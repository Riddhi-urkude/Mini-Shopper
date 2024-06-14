import axios from "axios";

export const getAllCategories = async ()=>{
 // const res= 
  return axios.get(`http://localhost:8080/categories`);
 // return res.data;
}


export const getCategoryById = async (categoryId)=>{
    const res = await axios.get(`http://localhost:8080/categories/${categoryId}`);
    return res.data;


  
}

