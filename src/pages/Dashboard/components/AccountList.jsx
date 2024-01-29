import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import CardActions from "@mui/material/CardActions";
import { AccountListGrid } from "../../../GlobalComponents/Table/AccountListGrid";
import AccountListNavbar from "../../../GlobalComponents/navbar/AccountListNavbar";
import Sidebar from "../../../GlobalComponents/sideBar/Sidebar";
import { useGetLocalStorage } from "../../../Hooks/useGetLocalStorage";
import { accountList } from "../../../store/Features/accountSlice";

import { getAccountListDetails } from "../../../Services/dashBoardService";
import AccountListMeta from "./AccountListMeta";
import "./acountList.css";

const AccountList = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);

  const { role, id, jwtToken } = JSON.parse(useGetLocalStorage("userData"));

  const userData = JSON.parse(useGetLocalStorage("userData"));
  // console.log(userData.jwtToken);
  // const userInfo = {
  //   "userId": userData?.userId,
  //   "userToken": "9d3507edcf83d1dd1",
  //   "responseToken": userData?.responseToken,
  //   "accountId": accountID
  // }
  const fetchAccountListDetails = async () => {
    try {
      const response = await getAccountListDetails({
        userId: userData?.userId,
        userToken: userData?.userToken,
        responseToken: userData?.responseToken,
        roleId: userData?.roleId,
      });
      dispatch(accountList(response.data));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAccountListDetails();
  }, []);

  return (
    <>
      <Sidebar />
      <div className="mainContainer">
        <AccountListNavbar />

        <div className="main-content">
          <div className="page-header">
            <div className="row align-items-center">
              <div className="col-md-6">
                <Typography className="page-title">Account List</Typography>
              </div>
              <div className="col-md-6 text-right">
                <Link to="/account-activity">
                  <Button
                    variant="contained"
                    sx={{
                      alignItems: "center",
                      textAlign: "center",
                      width: "220px",
                    }}
                    startIcon={<ArrowBackIcon />}
                  >
                    Back to Dashboard
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-12">
              <div className="grid-data">
                <AccountListMeta />
                <AccountListGrid />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default AccountList;
