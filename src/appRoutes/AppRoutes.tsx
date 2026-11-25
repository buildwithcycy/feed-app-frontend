import React, { useState, useEffect, useContext, type JSX } from "react";
import {
  Route,
  Routes,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router-dom";

import Login from "../pages/User/Login";
import Register from "../pages/User/Register";
import VerifyEmail from "../pages/User/VerifyEmail";
import ForgotPassword from "../pages/User/ForgotPassword";
import ResetPassword from "../pages/User/ResetPassword";

import Wrapper from "../components/Wrapper";
import NavBar from "../components/NavBar";
import { AppContext } from "../context/applicationContext";
import LoadingIndicator from "../components/LoadingIndicator";
import { sessionApi, type StandardResponse } from "../util/ApiUtil";

import Dashboard from "../pages/App/Dashboard";
import Profile from "../pages/App/Profile";
import MyFeeds from "../pages/App/MyFeeds";
import CompleteProfile from "../pages/App/CompleteProfile";

const AppRoutes = (): JSX.Element => {

    const navigate = useNavigate();
    const location = useLocation();

    const appContext = useContext(AppContext);
    const token = appContext.getSession();
    const userData = appContext.getUserData();

    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

    const pageTitles: Record<string, string> = {
    "/app/dashboard": "Dashboard",
    "/app/profile": "Profile",
    "/app/myFeeds": "My Feeds",
    };

    const getSession = async (): Promise<void> => {
    const apiResponse: StandardResponse = await sessionApi(token);

    if (apiResponse.status === 1) {
        appContext.setUserData(apiResponse.payLoad);
        setIsAuthenticated(true);
    } else {
        setIsAuthenticated(false);
    }
    };

    useEffect((): void => {
  if (token && !userData) {
    getSession();
  } else if (!token) {
    setIsAuthenticated(false);
  } else if (token && userData) {
    setIsAuthenticated(true);
  }
}, []);

useEffect((): void => {
  if (!userData && !token) {
    setIsAuthenticated(false);
  }

  if (userData) {
    setIsAuthenticated(true);
    //modified code
    if (!("profile" in userData) || !userData.profile) {
      navigate("/app/completeProfile");
    }
  }
}, [userData, token, navigate]);
if (isAuthenticated === null) return <LoadingIndicator />;
if (isAuthenticated === false) {
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
}

if (isAuthenticated === true) {
  return (
    <Wrapper>
      {userData && (userData as any).profile && (
        <NavBar pageTitle={pageTitles[location.pathname]} />
      )}
      <Routes>
        <Route path="*" element={<Navigate to="/app/dashboard" replace />} />
        <Route path="/app/dashboard" element={<Dashboard />} />
        <Route path="/app/myFeeds" element={<MyFeeds />} />
        <Route path="/app/profile" element={<Profile />} />
        <Route path="/app/completeProfile" element={<CompleteProfile />} />
      </Routes>
    </Wrapper>
  );
}

};

export default AppRoutes;