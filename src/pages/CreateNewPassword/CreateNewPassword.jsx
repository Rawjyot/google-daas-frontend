import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useGetLocalStorage } from "../../Hooks/useGetLocalStorage";
import authService from "../../Services/authServices";
import lock from "../../assets/images/lock.png";
import logo from "../../assets/images/logo.png";
import "../Login/login.css";

const CreateNewPassword = () => {
  const [visibility1, setVisibility1] = useState(false);
  const [visibility2, setVisibility2] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const submit = (e) => {
    e.preventDefault();
    if (newPassword === confirmPassword) {
      authService
        .createNewPassword(newPassword,useGetLocalStorage("resetToken"))
        .then((res) => {
          // console.log(res);
          navigate("/congratsScreen");
        })
        .catch((err) => console.log(err));
    }
    else toast.error("password do not match!!");
  };
  return (
    <>
    <div className="h-[100vh] lg:px-8 login">
      <div className="flex h-[100vh] justify-between">
        <div className=" self-start mt-16">
          <img src={logo} alt="logo" className="h-20 w-40" />
        </div>
        <div className="self-center w-[400px]">
          <div className="mb-6">
            <h2 className="text-[2.5rem] capitalize font-medium leading-9 tracking-tight text-gray-900">
              Create New Password
            </h2>
          </div>

          <div className="text-gray-500 flex flex-col gap-2">
            <div className="text-lg">
              <p>Your New Password Must Be Different</p>
              <p>From Previously Used Password</p>
            </div>
            <form
              className="mt-4 flex flex-col gap-5 text-gray-500"
              onSubmit={submit}
            >
              <div className="flex flex-col mt-2">
                <label htmlFor="password" className="mb-2">
                  New Password
                </label>
                <div className="border flex justify-center items-center shadow-md shadow-sky-300/100 ">
                  <input
                    id="password"
                    name="password"
                    type={visibility1 ? "text" :"password"}
                    required
                    className="h-14 w-full block  p-2  text-xl   outline-none"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                  <div className="mr-2 cursor-pointer">
                    {visibility1 ? (
                      <RemoveRedEyeIcon
                        onClick={() => setVisibility1(!visibility1)}
                      />
                    ) : (
                      <VisibilityOffIcon
                        onClick={() => setVisibility1(!visibility1)}
                      />
                    )}
                  </div>
                </div>
              </div>
              <div className="flex flex-col mt-2">
                <label htmlFor="confirmPassword" className="mb-2">
                  Comfirm New Password
                </label>
                <div className="border flex justify-center items-center shadow-md shadow-sky-300/100 ">
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={visibility2 ? "text" :"password"}
                    required
                    className="h-14 w-full block p-2 text-xl outline-none"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                  <div className="mr-2 cursor-pointer">
                    {visibility2 ? (
                      <RemoveRedEyeIcon
                        onClick={() => setVisibility2(!visibility2)}
                      />
                    ) : (
                      <VisibilityOffIcon
                        onClick={() => setVisibility2(!visibility2)}
                      />
                    )}
                  </div>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="mx-auto mt-4 flex w-44 justify-center rounded-full bg-[#1A74EAE5] px-3 py-1.5 text-xl font-semibold uppercase leading-6 text-white shadow-sm hover:bg-sky-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"

                >
                  save
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
    <ToastContainer/>
    </>
  );
};

export default CreateNewPassword;
