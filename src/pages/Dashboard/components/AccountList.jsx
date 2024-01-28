import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { AccountListGrid } from "../../../GlobalComponents/Table/AccountListGrid";
import AccountListNavbar from "../../../GlobalComponents/navbar/AccountListNavbar";
import Sidebar from "../../../GlobalComponents/sideBar/Sidebar";
import { useGetLocalStorage } from "../../../Hooks/useGetLocalStorage";
import { accountList } from "../../../store/Features/accountSlice";

import { getAccountListDetails } from "../../../Services/dashBoardService";
import AccountListMeta from "./AccountListMeta";

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
    <Box sx={{ display: "flex" }}>
      <Sidebar />
      <Box sx={{ width: "100%" }}>
        <Box>
          <AccountListNavbar />
          <Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                pt: 2,
                pb: 2,
                m: 1,
              }}
            >
              <Typography variant="h4">Account List</Typography>
              <Link to="/dashboard">
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
            </Box>
            <AccountListMeta />
          </Box>
        </Box>
        <AccountListGrid />
      </Box>
    </Box>
  );
};
export default AccountList;
