import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useGetLocalStorage } from "../../Hooks/useGetLocalStorage";
import { useSetLocalStorage } from "../../Hooks/useSetLocalStorage";
import policyService from "../../Services/policyService";
import logo from "../../assets/images/logo.png";
const PolicyAcceptance = () => {
  const [checked, setChecked] = useState(false);
  const { id, jwtToken } = JSON.parse(useGetLocalStorage("userData"));
  const navigate = useNavigate();

  const fetchPolicy = () => {
    if (checked === false) {
      toast.error("can't proceed for further without accepting policy");
      return;
    } else {
      policyService
        .postCall(id, jwtToken)
        .then((res) => {
          // console.log(res);
          useSetLocalStorage("login", true);
          navigate("/account-activity");
        })
        .catch((err) => console.log(err));
    }

    // console.log(checked);
  };

  const sendPolicy = () => {
    if (checked === false) {
      toast.error("can't proceed for further without accepting policy");
      return;
    } else {
      policyService
        .policyAcceptance(id, jwtToken)
        .then((res) => {
          // console.log(res);
          useSetLocalStorage("login", true);
          navigate("/account-activity");
        })
        .catch((err) => console.log(err));
    }

    // console.log(checked);
  };
  return (
    <>
      <div className="h-[100vh] login">
        <div className="flex flex-col ">
          <div className="self-start mt-16 ml-10">
            <img src={logo} alt="logo" className=" h-20 w-40" />
          </div>
          <div className="w-[320px] self-center">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
              <h2 className=" text-3xl font-medium leading-9 tracking-tight text-gray-900">
                Policy Acceptance
              </h2>
              <div className="h-60 w-100 outline outline-gray-400 my-8 overflow-scroll rounded p-2">
                <span className="border-3 border-sky-500">
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  Repellat sunt voluptatem quo esse molestias repellendus nihil
                  nam magni iusto veniam enim consequuntur qui facilis explicabo
                  a itaque nobis, aut eaque quisquam labore natus laborum?
                  Maxime itaque iste dolore nostrum mollitia facilis voluptatem?
                  Assumenda culpa similique sunt beatae. Sint, iusto accusamus!{" "}
                </span>
              </div>
              <div>
                <input
                  type="checkbox"
                  id="vehicle1"
                  name="vehicle1"
                  value={checked}
                  onChange={() => setChecked(true)}
                />
                <label htmlFor="vehicle1"> I accept Terms and Condition</label>
              </div>
              <div className="mt-4">
                <button
                  className="bg-sky-500 w-auto px-6  text-white font-medium rounded-sm"
                  onClick={sendPolicy}
                >
                  Accept
                </button>
              </div>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm"></div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default PolicyAcceptance;
