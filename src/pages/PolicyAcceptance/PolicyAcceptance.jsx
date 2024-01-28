import React, { useState, useEffect } from "react";
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
  const userData = JSON.parse(useGetLocalStorage("userData"));
  const userRole = userData?.roleId
  let policyDataContent = ""
  // console.log(userData.jwtToken);
  const userInfo = {
    "userId": userData?.userId,
    "userToken": userData?.userToken,
    "responseToken": userData?.responseToken,
    // "accountId": accountID
  }

  const [policyContentHTML, setPolicyContent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await policyService.policyContent(userInfo, userData.jwtToken);
        setPolicyContent(res?.data);
      } catch (err) {
        console.error('Error fetching policy content:', err);
      } finally {
        setIsLoading(false);
      }
    };

    // Only fetch data if policyContentHTML is null (i.e., when the component mounts)
    if (!policyContentHTML) {
      fetchData();
    }
  }, [userInfo, userData.jwtToken, policyContentHTML]);

  // const policyData = () => {
  //   policyService.policyContent(
  //     userInfo,
  //     userData.jwtToken
  //   ).then(res => {
  //     // return res.data
  //     policyDataContent = res?.data
  //     // setPolicyContent(res.data)
  //   }).catch(err => { })
  // }
  // policyData()
  // const policyData = (companyName, token) => {
  //   
  //   useEffect(() => {
  //     policyService
  //       .policyContent(userInfo, userData.jwtToken)
  //       .then((res) => {
  //         // console.log(res);
  //         setPolicyContent(res.data)
  //       })
  //       .catch((err) => console.log(err));
  //   }, []);
  //   return data;
  // };
  // const accountDetails = policyData(
  //   userInfo,
  //   userData.jwtToken
  // );
  // const fetchPolicy = () => {
  //   // if (checked === false) {
  //   //   toast.error("can't proceed for further without accepting policy");
  //   //   return;
  //   // } else {
  //   policyService
  //     .policyContent(userInfo, jwtToken)
  //     .then((res) => {
  //       // console.log(res);
  //       useSetLocalStorage("login", true);
  //       navigate("/account-activity");
  //     })
  //     .catch((err) => console.log(err));
  //   // }

  //   // console.log(checked);
  // };

  const sendPolicy = () => {
    if (checked === false) {
      toast.error("can't proceed for further without accepting policy");
      return;
    } else {
      policyService
        .policyAcceptance(userInfo, jwtToken)
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
                <span className="border-3 border-sky-500" dangerouslySetInnerHTML={{ __html: policyContentHTML?.policyDescription }}>
                  {/* {policyContent?.policyDescription}{" "} */}
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
