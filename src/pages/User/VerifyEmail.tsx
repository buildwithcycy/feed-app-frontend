//import React, { type JSX } from "react";
import React, { useEffect, useState, type JSX } from "react";
import { Link, useSearchParams } from "react-router-dom";

import LogoImage from "../../assets/images/logo.png";

import { verifyEmailApi } from "../../util/ApiUtil";
import type { StandardResponse } from "../../util/ApiUtil";

const VerifyEmail = (): JSX.Element => {
const [searchParams] = useSearchParams();
const [message, setMessage] = useState<string>("Verifying your account...");
const verifyAccount = async (token: string | null): Promise<void> => {
  console.log(token);
  const apiResponse: StandardResponse = await verifyEmailApi(token);
console.log(apiResponse);

if (apiResponse.status === 1) {
  setMessage("Your account has been verified.");
} else {
  setMessage(apiResponse.payLoad);
}
};

useEffect((): void => {
  document.title = "Verify Email | Feed App";
  const verifyToken: string | null = searchParams.get("token");

  if (verifyToken) {
    verifyAccount(verifyToken);
  } else {
    // If no token is present in the URL, inform the user immediately
    setMessage("Invalid verification request.");
  }
}, []);
  return ( <div className="bg-white">
  <div className="flex justify-center h-screen">
    <div className="flex items-center w-full mx-auto lg:w-full mt-20 md:mt-0 px-10 md:px-36">
      <div className="flex-1">
        <div className="text-center">
          <img src={LogoImage} width={120} className="mx-auto mb-2" alt="App Logo" />
          <h2 className="text-4xl font-bold text-center text-gray-700">
            Account Verification
          </h2>
          <p className="mt-3 text-gray-500 mb-10">{message}</p>
          <Link
            to="/user/login"
            className="inline-block w-52 p-4 tracking-wide text-white transition-colors duration-200 transform bg-purple-600 rounded-md hover:bg-purple-400 focus:outline-none focus:bg-purple-400 focus:ring focus:ring-purple-300 focus:ring-opacity-50"
          >
            Click to Log In
          </Link>
        </div>
      </div>
    </div>
  </div>
</div>);
};



export default VerifyEmail;