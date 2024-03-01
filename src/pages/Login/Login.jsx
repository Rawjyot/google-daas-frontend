import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

import { useCallback, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useGetLocalStorage } from "../../Hooks/useGetLocalStorage";
import { useSetLocalStorage } from "../../Hooks/useSetLocalStorage";
import authService from "../../Services/authServices";
import logo from "../../assets/images/logo.png";
import { partnerList as partnerListAction } from "../../store/Features/accountSlice";
import { login, loginOTP } from "../../store/Features/authSlice";
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
  useEffect(() => {
    // Retrieve the stored error message
    const login = JSON.parse(useGetLocalStorage("login"));
    // const userRole = userData?.roleId;

    // // console.log(userData.jwtToken);
    // const userInfo = {
    //   userId: userData?.userId,
    //   userToken: userData?.userToken,
    //   responseToken: userData?.responseToken,
    //   accountId: accountID,
    // };
    if (login) navigate("/account-activity")
    const errorMessage = localStorage.getItem('sessionExpired');

    if (errorMessage) {
      // Display the error message in a toast notification
      toast.error(errorMessage);
      // Clear the stored error message
      localStorage.removeItem('sessionExpired');
    }
  }, []);
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
              dispatch(loginOTP({ userId: loginData.userId, userToken: userToken }))
              navigate("/login-otp");
              // dispatch(login({ ...res.data, userToken: userToken }));
              // if (res.data && res.data.userList) {
              //   const list = res.data.userList.map(
              //     (list) => Object.keys(list)[0]
              //   );
              //   useSetLocalStorage("partnerList", list);
              //   dispatch(partnerListAction(list));
              // }
              // if (JSON.parse(useGetLocalStorage("userData")).policyAccept) {
              //   // navigate("/account-activity");
              //   window.location.href = '/account-activity';
              //   useSetLocalStorage("login", true);
              // } else navigate("/policy-acceptance");
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
      <div className="h-[100vh] login login-main">
        <div className="login-inner">
          <div className="login-header">
            <img src={logo} alt="logo" className=" h-20 w-40 mauto" />
          </div>
          <div className="login-box">
            <div className="login-form">
              <h2>
                Welcome to Data Bank
              </h2>
              <form className="space-y-6 text-gray-500" onSubmit={submit}>
                <div>
                  <label
                    htmlFor="userId"
                    className=""
                  >
                    Username
                  </label>
                  <div className="form-group">
                    <input
                      id="userId"
                      name="userId"
                      type="text"
                      required={true}
                      className="form-control"
                      onChange={(e) => onChangeData(e)}
                      placeholder="Enter provided username"
                      value={loginData.userId}
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="userPassword"
                    className=""
                  >
                    Password
                  </label>
                  <div className="form-group position-relative">
                    <input
                      id="userPassword"
                      name="userPassword"
                      type={visibility ? "text" : "password"}
                      required
                      className="form-control"
                      onChange={(e) => onChangeData(e)}
                      value={loginData.userPassword}
                      placeholder="Enter your password"
                    />
                    <div className="cursor-pointer">
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

                <Stack direction="row">
                  {isLoading ? <LoadingComponent submit={true} /> : <Button
                    type="submit"
                    variant="contained"
                    className="login-btn"
                  >
                    Sign in
                  </Button>}
                </Stack>
                <Stack direction="row">


                  <a
                    href="#"
                    // variant="contained"
                    className="resend-btn ml-auto"
                  >
                    Privacy Policy
                  </a>



                </Stack>
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
