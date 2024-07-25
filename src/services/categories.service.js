import axios from "axios";
import { publicAxiosInstance } from "./Axios.Service";


export const getAllCategories = async ()=>{
 // const res= 
  return publicAxiosInstance.get(`/categories`);
 // return res.data;
}


export const getCategoryById = async (categoryId)=>{
    console.log(categoryId);
    const res = await publicAxiosInstance.get(`/categories/${categoryId}`);
    return res.data;
}

