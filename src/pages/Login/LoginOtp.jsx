import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

import { useCallback, useState, useEffect } from "react";
import { useSelector } from 'react-redux';
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

// const generateRandomString = (length) => {
//   const characters =
//     "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
//   let result = "";

//   for (let i = 0; i < length; i++) {
//     const randomIndex = Math.floor(Math.random() * characters.length);
//     result += characters.charAt(randomIndex);
//   }

//   return result;
// };
// const userToken = generateRandomString(16);
const LoginOtp = ({ length = 6, onComplete }) => {
  const navigate = useNavigate();
  const stateData = useSelector((state) => state.auth);
  const userId = stateData?.userData?.userId;
  const userToken = stateData?.userData?.userToken;
  useEffect(() => {
    // Retrieve the stored error message
    const login = JSON.parse(useGetLocalStorage("login"));

    if (login) navigate("/account-activity")
    if (!userId || !userToken) navigate("/")
    const errorMessage = localStorage.getItem('sessionExpired');

    if (errorMessage) {
      // Display the error message in a toast notification
      toast.error(errorMessage);
      // Clear the stored error message
      localStorage.removeItem('sessionExpired');
    }
  }, []);


  const [loginData, setLoginData] = useState({
    userId: userId,
    userToken: userToken,
    otp: ""
  });
  const [visibility, setVisibility] = useState(false);
  const [otp, setOtp] = useState(new Array(length).fill(""));

  // console.log(stateData, "user data");
  const visible = useCallback(() => {
    setVisibility(!visibility);
    // console.log(visibility);
  }, [visibility]);


  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false)

  const onChangeData = useCallback((e) => {
    // console.log(loginData);
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  });

  const submit = (e) => {
    e.preventDefault();
    // console.log({ ...loginData });

    // setLoading(true)
    if (!loginData.otp) {
      // || !loginData.captchaToken
      toast.error("OTP is required");
    } else {
      setIsLoading(true);
      authService
        .submitOtp(loginData)
        .then((res) => {
          if (res) {
            // console.log(res.data);
            if (res?.data?.statusCode != "200") {
              toast.error(res?.data?.status);
              setIsLoading(false);
              return;
            } else {
              dispatch(login({ ...res.data, userToken: userToken }));
              if (res.data && res.data.userList) {
                const list = res.data.userList.map(
                  (list) => Object.keys(list)[0]
                );
                useSetLocalStorage("partnerList", list);
                dispatch(partnerListAction(list));
              }
              if (JSON.parse(useGetLocalStorage("userData")).policyAccept) {
                useSetLocalStorage("login", true);
                // navigate("/account-activity");
                // navigate("/account-list")
                window.location.href = '/account-activity';

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

  const resendOtp = ({ }) => {

    setIsLoading(true);
    authService
      .resendOtp({ userId: userId })
      .then((res) => {
        if (res) {
          // console.log(res.data);
          if (res?.data?.statusCode != "200") {
            toast.error(res?.data?.status);
            setIsLoading(false);
            return;
          } else {
            toast.success("OTP has been sent successfully!");
            setIsLoading(false);
          }
        }
      })
      .catch((err) => {
        // console.log(err);
        setIsLoading(false);
        toast.error("something went wrong");
      });
  }



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
                Login OTP
              </h2>
              <form className="space-y-6 text-gray-500" onSubmit={submit}>
                <div>
                  <label
                    htmlFor="userId"
                    className=""
                  >
                    OTP
                  </label>
                  <div className="form-group">
                    <input
                      id="otp"
                      name="otp"
                      type="text"
                      maxLength={6}
                      required={true}
                      className="form-control"
                      onChange={(e) => onChangeData(e)}
                      placeholder="Enter OTP"
                      value={loginData.otp}
                      onKeyDown={(e) => {
                        // Allow only numeric input
                        if (!/^\d*$/.test(e.key) && e.key !== "Backspace") {
                          e.preventDefault();
                        }
                      }}
                    />



                  </div>
                </div>




                {isLoading ? (
                  <LoadingComponent submit={true} />
                ) : (<>
                  <Stack direction="row">

                    <Button
                      type="submit"
                      variant="contained"
                      className="login-btn"
                    >
                      Submit
                    </Button>



                  </Stack>
                  <Stack direction="row">


                    <a
                      onClick={resendOtp}
                      // variant="contained"
                      className="resend-btn ml-auto"
                    >
                      Resend OTP
                    </a>



                  </Stack>
                </>)}

              </form>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default LoginOtp;
