import React from "react";
import { Link } from "react-router-dom";
import BasicTable from "../../GlobalComponents/Table/Table";
import DashBoardNavbar from "../../GlobalComponents/navbar/DashboardNavbar";
import Sidebar from "../../GlobalComponents/sideBar/Sidebar";
import "./dashboard.css";
import Button from '@mui/material/Button';
import Typography from "@mui/material/Typography";
const AccountActivity = () => {

  return (
    <>
      <div className="home">
        <Sidebar />
        <div className="mainContainer">
          <DashBoardNavbar />


          
          
          <div className="main-content">
          <div className="page-header">
            <div className="row align-items-center">
              <div className="col-md-6"><Typography className="page-title">Account Status</Typography></div>
              <div className="col-md-6 text-right"> 
              </div>
            </div>
          </div>
            <div className="flex flex-col gap-5 mb-4"> 
              <div className="flex  justify-between">
                <span className="text-lg flex items-center justify-center  bg-sky-400 font-medium text-white rounded-md capitalize w-[153px] linkShadow">
                  Expand All
                </span>
                <Link to="/account-list" className="text-lg  text-center font-bold shadow-lg shadow-[1px_2px_3px_0px_rgba(0, 0, 0, 0.30)] text-white rounded-lg p-2 bg-sky-400 linkShadow capitalize">
                  view all Accounts
                </Link>
              </div>
            </div>
            <BasicTable />
          </div>
        </div>
      </div>
    </>
  );
};

export default AccountActivity;
