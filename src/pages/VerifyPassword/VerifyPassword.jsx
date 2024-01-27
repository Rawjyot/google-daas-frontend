import React, { useEffect, useState } from "react";
import OtpInput from "react-otp-input";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useGetLocalStorage } from "../../Hooks/useGetLocalStorage";
import { useSetLocalStorage } from "../../Hooks/useSetLocalStorage";
import authService from "../../Services/authServices";
import emailPicture from "../../assets/images/email.png";
import logo from "../../assets/images/logo.png";
import "../Login/login.css";

const VerifyPassword = () => {
  const navigate = useNavigate();
  // const [otp, setOtp] = useState(["", "", "", ""]);

  // const inputRefs = Array.from({ length: 4 }, (_, index) => React.createRef());
  const [otp, setOtp] = useState("");
  const email = useGetLocalStorage("email");

  useEffect(() => {
    toast.success("OTP has been sent to your email");
  }, []);

  // const handleInputChange = (event, index) => {
  //   event.preventDefault();
  //   const value = event.target.value;
  //   if (value.length === 1 && index < 3) {
  //     inputRefs[index + 1].current.focus();
  //   }

  //   const newOtp = [...otp];

  //   newOtp[index] = value;
  //   setOtp(newOtp);

  //   authService
  //     .verifyViaEmail(email, otp)
  //     .then((res) => {
  //       console.log(res);
  //       useSetLocalStorage("resetToken", res.data.resetToken);
  //       console.log(otp)
  //       navigate("/createNewPassword");
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       toast.error("something went wrong");
  //     });
  // };
  const submit = (e) => {
    e.preventDefault();
    authService
      .verifyViaEmail(email, otp)
      .then((res) => {
        // console.log(res);
        useSetLocalStorage("resetToken", res.data.resetToken);
        navigate("/createNewPassword");
      })
      .catch((err) => {
        console.log(err);
        toast.error("something went wrong");
      });
  };

  return (
    <>
      <div className="h-[100vh] lg:px-8 login">
        <div className="flex h-[100vh] justify-between">
          <div className=" self-start mt-16">
            <img src={logo} alt="logo" className="h-20 w-40" />
          </div>
          <div className="   self-center w-[400px]">
            <div className="text-center">
              <h2 className="mb-10 text-[2.5rem] capitalize font-medium leading-9 tracking-tight text-gray-900">
                Verify Your Email
              </h2>
            </div>

            <div className="text-gray-500 flex flex-col gap-10">
              <div className="text-center text-lg">
                <p>Please Enter The 4-Digit Code</p>
                <p>Sent to {email}</p>
              </div>
              <form
                className="mt-4 flex flex-col gap-16 text-gray-500"
                onSubmit={submit}
              >
                <div>
                  <div className="mt-2 flex justify-around gap-3">
                    <div className="flex justify-center items-center gap-3 ">
                      {/* {otp.map((digit, index) => (
                        <input
                          key={index}
                          type="number"
                          maxLength="1"
                          value={digit}
                          onChange={(e) => handleInputChange(e, index)}
                          ref={inputRefs[index]}
                          className="h-14 w-16 text-center text-3xl active:text-gray-500 bg-sky-100   shadow-sm  ring-gray-300  outline-none"
                        />
                      ))} */}
                      {/* <input

                          type="number"
                          maxLength="1"
                          value={otp}
                          onChange={(e) => setOtp(e.target.value)}
                          className="h-14 w-16 text-center text-3xl active:text-gray-500 bg-sky-100   shadow-sm  ring-gray-300  outline-none"
                        /> */}
                      <OtpInput
                        value={otp}
                        onChange={setOtp}
                        numInputs={4}
                        // renderSeparator={<span>-</span>}
                        renderInput={(props) => <input {...props} />}
                        inputStyle="h-14 w-30 text-center text-3xl active:text-gray-500 bg-sky-100  shadow-sm ring-gray-300  outline-none"
                        containerStyle="flex gap-4"
                      />
                    </div>
                  </div>
                </div>
                <div className="text-center  font-medium underline text-lg text-sky-500">
                  <Link>Resend Code</Link>
                </div>

                <div>
                  <button
                    type="submit"
                    className="mx-auto flex w-44 justify-center rounded-full bg-[#1A74EAE5] px-3 py-1.5 text-xl font-semibold uppercase leading-6 text-white shadow-sm hover:bg-sky-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Verify
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className=" self-end relative bottom-10 right-20">
            <img src={emailPicture} alt="lock" className="h-auto w-[250px]" />
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default VerifyPassword;
