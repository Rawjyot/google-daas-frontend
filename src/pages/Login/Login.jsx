import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useGetLocalStorage } from "../../Hooks/useGetLocalStorage";
import { useSetLocalStorage } from "../../Hooks/useSetLocalStorage";
import authService from "../../Services/authServices";
import logo from "../../assets/images/logo.png";
import { partnerList as partnerListAction } from "../../store/Features/accountSlice";
import { login } from "../../store/Features/authSlice";
import LoadingComponent from "../../GlobalComponents/LoadingComponent";
import "./login.css";

const generateRandomString = (length) => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters.charAt(randomIndex);
  }

  return result;
};
const userToken = generateRandomString(16);
const Login = () => {
  const [loginData, setLoginData] = useState({
    userId: "",
    userPassword: "",
    userToken: userToken,
  });
  const [visibility, setVisibility] = useState(false);

  const visible = useCallback(() => {
    setVisibility(!visibility);
    // console.log(visibility);
  }, [visibility]);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false)

  const onChangeData = useCallback((e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  });

  const submit = (e) => {
    e.preventDefault();
    // console.log({ ...loginData });
    const passwordRegex =
      /^(?=.*\d)(?=.*[A-Z])(?!.*[^a-zA-Z0-9@#$^+=])(.{8,15})$/;
    if (!loginData.userPassword.match(passwordRegex)) {
      toast.error(
        "password must be of 8 length with 1 special character,Capital letter,Small letter and 1 digit"
      );
      return;
    }
    // setLoading(true)
    if (!loginData.userId || !loginData.userPassword) {
      // || !loginData.captchaToken
      toast.error("all details required");
    } else {
      setIsLoading(true);
      authService
        .login(loginData)
        .then((res) => {
          if (res) {
            // console.log(res.data?.statusCode);
            // return
            if (res?.data?.statusCode != "200") {
              toast.error(res?.data?.message);
              setIsLoading(false);
              return;
            }

            else {
              dispatch(login({ ...res.data, userToken: userToken }));
              if (res.data && res.data.userList) {
                const list = res.data.userList.map(
                  (list) => Object.keys(list)[0]
                );
                useSetLocalStorage("partnerList", list);
                dispatch(partnerListAction(list));
              }
              if (JSON.parse(useGetLocalStorage("userData")).policyAccept) {
                navigate("/account-activity");
                useSetLocalStorage("login", true);
              } else navigate("/policy-acceptance");
            }
          }
        })
        .catch((err) => {
          // console.log(err);
          setIsLoading(false);
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
                    htmlFor="userId"
                    className="block mb-1 text-xl  font-normal leading-6 "
                  >
                    Username
                  </label>
                  <div className="mt-4 rounded-md shadow-md shadow-sky-500/100">
                    <input
                      id="userId"
                      name="userId"
                      type="text"
                      required={true}
                      className="h-12 block w-full  border-0 p-2 font-normal text-gray-500 shadow-sm ring-1 ring-inset ring-gray-300 outline-none"
                      onChange={(e) => onChangeData(e)}
                      value={loginData.userId}
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="userPassword"
                    className="block mb-1 text-lg font-normal leading-6 "
                  >
                    Password
                  </label>
                  <div className="mt-4 shadow-md flex justify-center items-center shadow-sky-500/100">
                    <input
                      id="userPassword"
                      name="userPassword"
                      type={visibility ? "text" : "password"}
                      required
                      className="h-12 block w-full   p-2 font-normal shadow-sm  ring-inset ring-gray-300 placeholder:text-gray-400 outline-none"
                      onChange={(e) => onChangeData(e)}
                      value={loginData.userPassword}
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
                {/*<div className="flex items-center justify-end">
                  <div className="text-sm font-normal">
                    <Link
                      to={"/forgetPassword"}
                      className="font-semibold text-[#E34438] hover:text-red-500"
                    >
                      Forgot password?
                    </Link>
                  </div>
                      </div>  */}
                {/* <div className="recaptcha flex justify-start">
                  <ReCAPTCHA
                    sitekey={config.siteKey}
                    onChange={recaptchaValue}
                    onExpired={() => toast.error("captcha expired, Refresh")}
                  />
                </div> */}

                <Stack direction="row" spacing={1} sx={{ pt: 2 }}>
                  {isLoading ? <LoadingComponent submit={true} /> : <Button
                    type="submit"
                    variant="contained"
                    sx={{ width: "120px", borderRadius: 5 }}
                  >
                    Sign in
                  </Button>}
                </Stack>
              </form>
            </div>
          </div>
        </div>
      </div>)
      <ToastContainer />
    </>
  );
};

export default Login;
