import axios from "axios";
import { publicAxiosInstance, privateAxiosInstance } from "./Axios.Service";


export const registerUser= async (data)=> {
     // data.userId=data.email;
      //data.role=data.userType;
      //data.firstName=null;
    //  data.lastName=data.lname;
    // data.password="Kishore@123";
      console.log(data);
   //  try{
       return await publicAxiosInstance.post("/users/newUser", data);
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
     const result = await publicAxiosInstance.post(`/users/loginUser`, data);
     console.log(result);
     return result;
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


export const loginShopkeeper = async(data)=>{
  console.log(data);
  const result = await publicAxiosInstance.post(`/users/loginUser`, data);
  return result;
}
  

export const getUserById= async (userId) => {

  const res=await privateAxiosInstance.post(`/users/${userId}`);
  console.log(res);
  return res.data;

}


export const updateUser= async (userId, data) => {
  console.log(userId);
    console.log(data);
  const res=await privateAxiosInstance.put(`/users/updateDetails/${userId}`,data);
  return res.data;

}
  

export const addAddress= async (userId, data) => {
  console.log(userId);
    console.log(data);
  const res=await privateAxiosInstance.put(`/users/addAddress/${userId}`,data);
  return res.data;

}

// export const updateUserAddresses= async (userId, data) => {
//   console.log(data);
// const res=await privateAxiosInstance.put(`/users/${userId}`,data);
// return res.data;

// }


