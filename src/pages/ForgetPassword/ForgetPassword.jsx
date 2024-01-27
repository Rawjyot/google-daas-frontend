import React, { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSetLocalStorage } from "../../Hooks/useSetLocalStorage";
import authService from "../../Services/authServices";
import lock from "../../assets/images/lock.png";
import logo from "../../assets/images/logo.png";
import "../Login/login.css";

const ForgetPassword = () => {
  const [loginData, setLoginData] = useState({
    email: "",
  });
  const navigate = useNavigate();

  const onChangeData = useCallback((e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  });

  const submit = (e) => {
    e.preventDefault();
    if (loginData.email !== "") {
      authService
        .forgetPassword(loginData)
        .then((res) => {
          // console.log(res);
          useSetLocalStorage("email", loginData.email);
          navigate("/verifyEmail");
        })
        .catch((err) => toast.error("something went wrong"));
    } else toast.error("something went wrong");
  };
  return (
    <>
      <div className="h-[100vh] login">
        <div className="flex h-[100vh] justify-between ">
          <div className="self-start mt-16 ml-10">
            <img src={logo} alt="logo" className=" h-20 w-40" />
          </div>
          <div className="h-96 self-center w-[400px] ">
            <div className="">
              <h2 className="mb-10 text-[2.5rem] capitalize font-medium leading-9 tracking-tight text-gray-900">
                Forget Password
              </h2>
            </div>

            <div className=" sm:mx-auto sm:w-full sm:max-w-sm">
              <form
                className="mt-4 flex flex-col gap-10 text-gray-500"
                onSubmit={submit}
              >
                <div>
                  <label
                    htmlFor="email"
                    className="block  text-xl  font-normal leading-6 "
                  >
                    Enter Email ID
                  </label>
                  <div className="mt-4 shadow-md border shadow-sky-400/85">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      className="h-14 w-full block   p-2  shadow-sm  ring-gray-300 text-xl placeholder:text-gray-400   outline-none  "
                      onChange={(e) => onChangeData(e)}
                      value={loginData.email}
                    />
                  </div>
                </div>

                <div>
                  <p>Please Enter Your Email Address to</p>
                  <p>Receive a Verification Code</p>
                </div>

                <div>
                  <button
                    type="submit"
                    className="mx-auto flex w-44 justify-center rounded-full bg-[#1A74EAE5] px-3 py-1.5 text-xl font-semibold uppercase leading-6 text-white shadow-sm hover:bg-sky-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Send
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className="self-end relative bottom-10 right-20">
            <img src={lock} alt="lock" className="h-auto w-[250px]" />
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default ForgetPassword;
