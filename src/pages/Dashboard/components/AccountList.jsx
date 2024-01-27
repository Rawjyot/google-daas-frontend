import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AgGridActivity } from "../../../GlobalComponents/Table/AgGridActivity";
import AccountListNavbar from "../../../GlobalComponents/navbar/AccountListNavbar";
import Sidebar from "../../../GlobalComponents/sideBar/Sidebar";
import { useTotalAccountNumberCall } from "../../../Hooks/useDashboardCall";
import { useGetLocalStorage } from "../../../Hooks/useGetLocalStorage";
import dashboardService from "../../../Services/dashBoardService";
import AccountTable from "./AccountTable";
const AccountList = () => {
  const [data, setData] = useState([]);
  const { role, id, jwtToken } = JSON.parse(useGetLocalStorage("userData"));
  // console.log(role, id, jwtToken);
  const totalAccount = useTotalAccountNumberCall(role, id, jwtToken);
  console.log(totalAccount);
  useEffect(() => {
    dashboardService
      .AccountList(role, id, jwtToken)
      .then((res) => {
        //  console.log(res.data);
        setData(res.data);
      })
      .catch((err) => console.log(err));
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
              <Link
                to="/dashboard"
                className="text-lg  text-center font-bold shadow-lg shadow-[1px_2px_3px_0px_rgba(0, 0, 0, 0.30)] text-white rounded-lg p-2 bg-sky-400 linkShadow"
              >
                Back to Dashboard
              </Link>
            </Box>
            {/* <AccountTable data={data} filterStatus={filterStatus} totalAccount={totalAccount}/> */}
            <AccountTable data={data} totalAccount={totalAccount} />
          </Box>
        </Box>
        <AgGridActivity />
      </Box>
    </Box>
  );
};
export default AccountList;
