import React, { useEffect, useContext, type JSX } from "react";
import { useNavigate } from "react-router-dom";
import UpdatePublicProfile from "../../components/UpdatePublicProfile";
import { AppContext } from "../../context/applicationContext";

const CompleteProfile = (): JSX.Element => {
  const navigate = useNavigate();
  const appContext = useContext(AppContext);
  const userData = appContext.getUserData();

  useEffect((): void => {
  document.title = "Complete your profile | Feed App";
}, []);

  useEffect(() => {
  if (userData && "profile" in userData && userData.profile) {
    navigate("/app/dashboard");
  }
}, [navigate, userData]);
    
  return (
    <main className="grid grid-cols-1 lg:grid-cols-1 gap-6 my-12 md:mx-12 container px-2 mx-auto">
  <UpdatePublicProfile />
</main>
  );
};

export default CompleteProfile;

