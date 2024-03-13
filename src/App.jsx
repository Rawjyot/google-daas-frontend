import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import {
  contactStatusList as contactStatusListAction,
  empSizeList as empSizeListAction,
  regionsList as regionsListAction,
  revenueList as revenueListAction,
  technographicsList as technographicsListAction,
  verticalList as verticalListAction,
} from "../src/store/Features/accountSlice";
import "./App.css";
import ProtectedRoutes from "./GlobalComponents/ProtectedRoutes";
import { useGetLocalStorage } from "./Hooks/useGetLocalStorage";
import { getMasterData } from "./Services/dashBoardService";
import {
  AccountActivity,
  AccountList,
  CongratsScreen,
  CreateNewPassword,
  DetailedList,
  ErrorPage,
  ForgetPassword,
  Login,
  PartnerActivity,
  PolicyAcceptance,
  VerifyPassword,
  LoginOtp,
  PrivacyPolicy
} from "./pages";

function App() {
  const dispatch = useDispatch();
  const userData = JSON.parse(useGetLocalStorage("userData"));

  const fetchMasterData = async () => {
    try {
      const response = await getMasterData({
        userId: userData?.userId,
        userToken: userData?.userToken,
        responseToken: userData?.responseToken,
        roleId: userData?.roleId,
      });

      const regionsList =
        response &&
        response.data &&
        response.data.regionList &&
        response.data.regionList.length > 1 &&
        response.data.regionList.map((list) => Object.values(list)[0]);

      const revenueList =
        response &&
        response.data &&
        response.data.revenueList &&
        response.data.revenueList.length > 1 &&
        response.data.revenueList.map((list) => Object.values(list)[0]);

      const technographicsList =
        response &&
        response.data &&
        response.data.technographicsList &&
        response.data.technographicsList.length > 1 &&
        response.data.technographicsList.map((list) => Object.values(list)[0]);

      const verticalList =
        response &&
        response.data &&
        response.data.verticalList &&
        response.data.verticalList.length > 1 &&
        response.data.verticalList.map((list) => Object.values(list)[0]);

      const contactStatusList =
        response &&
        response.data &&
        response.data.accountStatusList &&
        response.data.accountStatusList.length > 1 &&
        response.data.accountStatusList.map((list) => Object.values(list)[0]);

      // Adding "Viewed" and "Untouched" to the contactStatusList
      if (contactStatusList) {
        contactStatusList.push("Untouched", "Viewed");
      }
      const empSizeList =
        response &&
        response.data &&
        response.data.empSizeList &&
        response.data.empSizeList.length > 1 &&
        response.data.empSizeList.map((list) => Object.values(list)[0]);

      dispatch(regionsListAction(regionsList));
      dispatch(revenueListAction(revenueList));
      dispatch(verticalListAction(verticalList));
      dispatch(empSizeListAction(empSizeList));
      dispatch(contactStatusListAction(contactStatusList));
      dispatch(technographicsListAction(technographicsList));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchMasterData();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/policy-acceptance" element={<PolicyAcceptance />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/login-otp" element={<LoginOtp />} />
        <Route path="/forgetPassword" element={<ForgetPassword />} />
        <Route path="/verifyEmail" element={<VerifyPassword />} />
        <Route path="/createNewPassword" element={<CreateNewPassword />} />
        <Route path="/congratsScreen" element={<CongratsScreen />} />
        <Route
          path="/account-activity"
          element={<ProtectedRoutes Component={AccountActivity} />}
        />
        <Route
          path="/partner-activity"
          element={<ProtectedRoutes Component={PartnerActivity} />}
        />
        {/* <Route
          path="/dashboard"
          element={ <DashBoard/>}
        /> */}
        <Route
          path="/account-List"
          element={<ProtectedRoutes Component={AccountList} />}
        />
        {/* <Route
          path="/account-List"
          element={ <AccountList/>}
        /> */}
        <Route
          path="/account-details/:accountID/:allocationId"
          element={<ProtectedRoutes Component={DetailedList} />}
        />
        {/* <Route
          path="/detailed-account"
          element={ <DetailedList/>}
        /> */}
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
