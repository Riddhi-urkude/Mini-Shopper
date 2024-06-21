import axios from "axios";
import  { useEffect } from "react";

export const registerUser= async (data)=> {
      data.userId=data.email;
      //data.firstName=null;
    //  data.lastName=data.lname;
    // data.password="Kishore@123";
      console.log(data);
   //  try{
        return await axios.post("http://localhost:8080/users/newUser", data);
        //.then((res)=>{console.log("response in user service "+res)});
    //  }catch(err){
    //   console.log("error "+err);
    //   return err;

    //  }
 
  }


export const loginUser= async(data)=>{
    // console.log("data "+data.email);
    // console.log("data "+data.password);
    // data.userId=data.email;
    // console.log("data "+data.email);
    // console.log("data "+data.password);
    // console.log("user data "+data.userId);

    // const userId="arun@gmail.com";
    // const password="Awed123";
    // const login={};//"dineshkumar@gmail.com";
    //data.userId=null;
  //  try {
     return await axios.post(`http://localhost:8080/users/loginUser`, data);
     // console.log("result "+result.data);
    // } catch (err) {
    //   console.log("in service ");
    //   if (err.response) {
    //     console.log(err.response);

    //     console.log("server responded");
    //     return err;
    //   } else if (err.request) {
    //     console.log("network error");
    //   } else {
    //     console.log(err);
    //   }
    //   return err;
    // }
  }


export const getUserById= async (userId) => {

  const res=await axios.post(`http://localhost:8080/users/${userId}`);
  return res.data;

}


export const updateUser= async (userId, data) => {
  //  console.log(data);
  const res=await axios.put(`http://localhost:8080/users/${userId}`,data);
  return res.data;

}
  


