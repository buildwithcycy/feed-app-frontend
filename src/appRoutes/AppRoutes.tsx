import React, { type JSX } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Login from "../pages/User/Login";
import Register from "../pages/User/Register";
import VerifyEmail from "../pages/User/VerifyEmail";
import ForgotPassword from "../pages/User/ForgotPassword";
import ResetPassword from "../pages/User/ResetPassword";

const AppRoutes = (): JSX.Element => {
  return (
    <Routes>
      {/* Note: The 'exact' prop has been removed here because React Router v6 
        matches paths exactly by default! 
      */}
      <Route path="/user/login" element={<Login />} />
      <Route path="/user/register" element={<Register />} />
      <Route path="/user/verifyEmail" element={<VerifyEmail />} />
      <Route path="/user/forgotPassword" element={<ForgotPassword />} />
      <Route path="/user/resetPassword" element={<ResetPassword />} />
      
      {/* Catch-all route to redirect lost users safely back to login */}
      <Route path="*" element={<Navigate to="/user/login" replace />} />
    </Routes>
  );
};

export default AppRoutes;