import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AccountListNavbar from "../../../GlobalComponents/navbar/AccountListNavbar";
import Sidebar from "../../../GlobalComponents/sideBar/Sidebar";
import { useTotalAccountNumberCall } from "../../../Hooks/useDashboardCall";
import { useGetLocalStorage } from "../../../Hooks/useGetLocalStorage";
import dashboardService from "../../../Services/dashBoardService";
import AccountTable from "./AccountTable";
const AccountList = () => {
  const [data,setData] = useState([])
  const { role, id, jwtToken } = JSON.parse(useGetLocalStorage("userData"));
  // console.log(role, id, jwtToken);
  const totalAccount = useTotalAccountNumberCall(role,id,jwtToken);
  console.log(totalAccount);
  useEffect(() => {
    dashboardService
      .AccountList(role, id, jwtToken)
      .then((res) =>{
      //  console.log(res.data);
       setData(res.data);
       })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className="home bg-[rgba(255,255,255,1)]">
      <Sidebar />
      <div className="homeContainer bg-[rgba(255,255,255,1)]">
       <AccountListNavbar/>
        <div className="listContainer">
          <div className="flex flex-col gap-5 mb-2">
            <div className="flex  justify-between">
              <span className="text-xl font-medium text-[rgba(36,196,255,1)]">
                Account List
              </span>
              <Link
                to="/dashboard"
                className="text-lg  text-center font-bold shadow-lg shadow-[1px_2px_3px_0px_rgba(0, 0, 0, 0.30)] text-white rounded-lg p-2 bg-sky-400 linkShadow"
              >
                Back to Dashboard
              </Link>
            </div>
          </div>
          {/* <AccountTable data={data} filterStatus={filterStatus} totalAccount={totalAccount}/> */}
          <AccountTable data={data}  totalAccount={totalAccount}/>
        </div>
      </div>
    </div>
  );
};
export default AccountList;