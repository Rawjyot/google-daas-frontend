import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import React, { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useGetLocalStorage } from "../../Hooks/useGetLocalStorage";
import { useSetLocalStorage } from "../../Hooks/useSetLocalStorage";
import authService from "../../Services/authServices";
import logo from "../../assets/images/logo.png";
import { login } from "../../store/Features/authSlice";
import "./login.css";
const Login = () => {
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });
  const [visibility, setVisibility] = useState(false);

  const visible = useCallback(() => {
    setVisibility(!visibility);
    // console.log(visibility);
  }, [visibility]);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const recaptchaValue = (e) => {
    setLoginData({ ...loginData, captchaToken: e });
  };

  const onChangeData = useCallback((e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  });

  const submit = (e) => {
    e.preventDefault();
    // console.log({ ...loginData });
    const passwordRegex =
      /^(?=.*\d)(?=.*[A-Z])(?!.*[^a-zA-Z0-9@#$^+=])(.{8,15})$/;
    if (!loginData.password.match(passwordRegex)) {
      toast.error(
        "password must be of 8 length with 1 special character,Capital letter,Small letter and 1 digit"
      );
      return;
    }
    // setLoading(true)
    if (!loginData.username || !loginData.password) {
      // || !loginData.captchaToken
      toast.error("all details required");
    } else {
      authService
        .login(loginData)
        .then((res) => {
          if (res) {
            // console.log(res);
            if (res.data === "Credentials Invalid !!") toast.error(res.data);
            else {
              dispatch(login(res.data));
              if (!JSON.parse(useGetLocalStorage("userData")).policy_accepted) {
                navigate("/account-activity");
                useSetLocalStorage("login", true);
              } else navigate("/policy-acceptance");
            }
          }
        })
        .catch((err) => {
          // console.log(err);
          toast.error("something went wrong");
        });
    }
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
                Welcome to DAAS
              </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
              <form className="space-y-6 text-gray-500" onSubmit={submit}>
                <div>
                  <label
                    htmlFor="username"
                    className="block mb-1 text-xl  font-normal leading-6 "
                  >
                    Username
                  </label>
                  <div className="mt-4 rounded-md shadow-md shadow-sky-500/100">
                    <input
                      id="username"
                      name="username"
                      type="text"
                      required={true}
                      className="h-12 block w-full  border-0 p-2 font-normal text-gray-500 shadow-sm ring-1 ring-inset ring-gray-300 outline-none"
                      onChange={(e) => onChangeData(e)}
                      value={loginData.username}
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="block mb-1 text-lg font-normal leading-6 "
                  >
                    Password
                  </label>
                  <div className="mt-4 shadow-md flex justify-center items-center shadow-sky-500/100">
                    <input
                      id="password"
                      name="password"
                      type={visibility ? "text" : "password"}
                      required
                      className="h-12 block w-full   p-2 font-normal shadow-sm  ring-inset ring-gray-300 placeholder:text-gray-400 outline-none"
                      onChange={(e) => onChangeData(e)}
                      value={loginData.password}
                    />
                    <div className="mr-2 cursor-pointer">
                      {visibility ? (
                        <RemoveRedEyeIcon onClick={visible} />
                      ) : (
                        <VisibilityOffIcon onClick={visible} />
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-end">
                  <div className="text-sm font-normal">
                    <Link
                      to={"/forgetPassword"}
                      className="font-semibold text-[#E34438] hover:text-red-500"
                    >
                      Forgot password?
                    </Link>
                  </div>
                </div>
                {/* <div className="recaptcha flex justify-start">
                  <ReCAPTCHA
                    sitekey={config.siteKey}
                    onChange={recaptchaValue}
                    onExpired={() => toast.error("captcha expired, Refresh")}
                  />
                </div> */}

                <div>
                  <button
                    type="submit"
                    className="flex w-44 justify-center rounded-full bg-[#1A74EAE5] px-3 py-1.5 text-xl font-semibold uppercase leading-6 text-white shadow-sm hover:bg-sky-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Sign in
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Login;
