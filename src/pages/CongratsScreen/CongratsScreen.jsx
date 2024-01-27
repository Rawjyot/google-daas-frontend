import React, { useEffect, } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import congrats from "../../assets/images/congrats.png";
import logo from "../../assets/images/logo.png";
import "../Login/login.css";

const CongratsScreen = () => {
  const navigate = useNavigate();

  useEffect(() => {
    toast.success("Your new password has been set");
  }, []);

  return (
    <>
      <div className="h-[100vh]  login">
        <div className="flex  flex-col">
          <div className="self-start mt-16 ml-10">
            <img src={logo} alt="logo" className=" h-20 w-40" />
          </div>
          <div className="self-center">
            <div className="flex flex-col items-center gap-10">
              <h2 className=" text-4xl leading-9 capitalize font-medium tracking-tight text-gray-900">
                <p>Congratulations! Your password has been</p>
                <p className="mt-4 text-center">changed successfully</p>
              </h2>
              <div>
                <img src={congrats} alt="congrats" />
              </div>
              <div>
                <button
                  className="mx-auto flex w-44 justify-center rounded-full bg-[#1A74EAE5] px-3 py-1.5 text-xl font-semibold uppercase leading-6 text-white shadow-sm hover:bg-sky-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  onClick={() => navigate("/")}
                >
                  Login
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default CongratsScreen;
