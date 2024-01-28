import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import ProtectedRoutes from "./GlobalComponents/ProtectedRoutes";
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
} from "./pages";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/policy-acceptance" element={<PolicyAcceptance />} />
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
          path="/account-details/:accountID"
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
