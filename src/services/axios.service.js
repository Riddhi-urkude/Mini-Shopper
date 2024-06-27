import axios from "axios";
import { API_ENDPOINTS } from "./Helper.Service";
import {
  doLogoutLocalStorage,
  getTokenFromLocalStorage,
  updateAccessTokenInLocalStorage,
} from "../auth/HelperAuth";
import { toast } from "react-toastify";

// Create a new axios instance with a baseURL that will be used for all requests

//const {token} = getTokenFromLocalStorage();
//const token="csdc";

export const publicAxiosInstance = axios.create({
  baseURL: `http://localhost:8080`,
    // headers: {
    //   "Authorization" : `Bearer ${token.accessToken}`,
    // }

});

let {token} = {accessToken:'', refreshToken: ''};

function getAccesToken(){
  if(getTokenFromLocalStorage()!==null){
    token=getTokenFromLocalStorage();
  }
  return token.accessToken;
}

export const privateAxiosInstance = axios.create({
    baseURL: `http://localhost:8080`,
    //   headers: {
    //     "Authorization" : `Bearer ${getAccesToken()}`,
    //   }
  
  });

// const refreshToken = async () => {
//   const { refreshToken } = getTokenFromLocalStorage();
//   const result = await axios.post(
//     `http://localhost:8080/users/refresh`,
//     {},
//     {
//       headers: {
//         Authorization: `Bearer ${refreshToken}`,
//       },
//     }
//   );
//   return result.data.accessToken;
// };

// Add a request interceptor to the privateAxios instance
privateAxiosInstance.interceptors.request.use(
  (config) => {
    // Get the token from local storage
    const tokens = getTokenFromLocalStorage();
//    console.log("in use private instance");
   // console.log(tokens);
    if (tokens !== null) {
      // Set the Authorization header for the request
      //console.log("inside if ");
      //console.log(tokens.accessToken);
      config.headers.Authorization = `Bearer ${tokens.accessToken}`;
    }
    //console.log(config);
   // console.log("end in ");
    return config;
  },
  (error) => {
    console.log("Error in request interceptor: ", error);
    Promise.reject(error);
  }
);

// Add a response interceptor to the privateAxios instance
// privateAxiosInstance.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;

//     // Check if the error response has a status code of 401 (unauthorized)
//     if (
//       error.response &&
//       error.response.status === 401 &&
//       !originalRequest._retry
//     ) {
//       originalRequest._retry = true;

//       try {
//         // Refresh the access token
//         const newAccessToken = await refreshToken();

//         // Update the access token in local storage
//         updateAccessTokenInLocalStorage(newAccessToken);

//         // Update the Authorization header with the new access token
//         originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

//         // Retry the original request
//         return privateAxiosInstance(originalRequest);
//       } catch (refreshError) {
//         // Clear the tokens in local storage
//         doLogoutLocalStorage();

//         // show a msg 
//         toast.info("Your session has expired! please login again", {
//           autoClose: false,
//         });
        
//         // redirect to login page
//         window.location.href = "/login";
//       }
//     }

//     return Promise.reject(error);
//   }
// );
