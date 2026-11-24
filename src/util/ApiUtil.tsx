import axios from "axios";

const API_BASE_URL: string = "http://localhost:8080";

const frameToken = (token: string): string => `Bearer ${token}`;

export interface StandardResponse {
  status: number;
  payLoad: any; 
}

const frameResponse = (
  reqStatus: number = 0,
  reqPayLoad: any = "Invalid request. Please try again later."
): StandardResponse => {
  return {
    status: reqStatus,
    payLoad: reqPayLoad,
  };
};

const registerApi = async (
  username: string,
  password: string,
  emailId: string,
  firstName: string,
  lastName: string,
  phone: string
): Promise<StandardResponse> => {

  let response: StandardResponse = frameResponse();
  try {
  const url: string = `${API_BASE_URL}/user/signup`;
  const apiResponse = await axios.post(url, {
    username,
    password,
    emailId,
    firstName,
    lastName,
    phone,
  });

  if (apiResponse.status === 200) {
    response = frameResponse(1);
  }
} catch (err: any) {
  if (err.response) {
    response = frameResponse(0, err.response.data.message);
  }
  console.log(err);
} finally {
  return response;
}
 // return response;
};

 export const verifyEmailApi = async (token: string): Promise<StandardResponse> => {
   let response: StandardResponse = frameResponse();
   try {
   const url: string = `${API_BASE_URL}/user/verify/email`;
   const apiResponse = await axios.get(url, {
     headers: { Authorization: frameToken(token) },
   });
   
   if (apiResponse.status === 200) {
     response = frameResponse(1, apiResponse.data);
   }
 } catch (err: any) {
   if (err.response) {
     response = frameResponse(0, err.response.data.message);
   }
   console.error("Email Verification Error:", err);
 } finally {
   return response;
 }
   //return response;
 };

 export const loginApi = async (username: string, password: string): Promise<StandardResponse> => {
   let response: StandardResponse = frameResponse();
    try {
   const url: string = `${API_BASE_URL}/user/login`;
   const apiResponse = await axios.post(url, { username, password });

   if (apiResponse.status === 200) {
     const payLoad = {
       userData: apiResponse.data,
       token: apiResponse.headers.authorization,
     };
     
     response = frameResponse(1, payLoad);
     }
   } catch (err: any) {
     if (err.response) {
       response = frameResponse(0, err.response.data.message);
     }
     console.error("Login API Error:", err);
   } finally {
     return response;
 }
   //return response;
 };
export { registerApi };

