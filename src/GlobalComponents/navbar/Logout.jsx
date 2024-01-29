import React from "react";
import { useGetLocalStorage } from "../../Hooks/useGetLocalStorage";
import authService from "../../Services/authServices";

import { ToastContainer } from "react-toastify";

import { useNavigate } from "react-router-dom";
import { LogoutIcon } from "../../assets/icons";
const Logout = ({}) => {
  const navigate = useNavigate();
  const userData = JSON.parse(useGetLocalStorage("userData"));
  const userRole = userData?.roleId;
  // console.log(userData.jwtToken);
  const userInfo = {
    userId: userData?.userId,
    userToken: userData?.userToken,
    responseToken: userData?.responseToken,
  };
  const handleLogout = async () => {
    try {
      authService
        .logout(userInfo)
        .then((res) => {
          console.log(res);
          if (res?.data?.status === "SUCCESS") {
            localStorage.clear();
            navigate("/");
          } else {
            // toast.error("Something went wrong!");
            localStorage.clear();
            navigate("/");
            return;
          }
        })
        .catch((err) => {
          // toast.error("Something went wrong!");
          localStorage.clear();
          navigate("/");
        });
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <>
      <li className="nav-item">
        <p className="nav-link log-out-btn" onClick={handleLogout}>
          <LogoutIcon /> Log Out
        </p>
      </li>
      <ToastContainer />
    </>
  );
};

export default Logout;
