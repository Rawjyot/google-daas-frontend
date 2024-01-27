import React from "react";
import { Link } from "react-router-dom";
import ActivityGrid from "../../GlobalComponents/Table/ActivityGrid";
import DashBoardNavbar from "../../GlobalComponents/navbar/DashboardNavbar";
import Sidebar from "../../GlobalComponents/sideBar/Sidebar";
import "./dashboard.css";

const AccountActivity = () => {

  return (
    <>
      <div className="home">
        <Sidebar />
        <div className="homeContainer">
          <DashBoardNavbar />

          <div className="listContainer">
            <div className="flex flex-col gap-5 mb-4">
              <span className="text-[28px] font-medium  text-black">
                Account Status
              </span>
              <div className="flex  justify-between">
                <span className="text-lg flex items-center justify-center  bg-sky-400 font-medium text-white rounded-md capitalize w-[153px] linkShadow">
                  Expand All
                </span>
                <Link to="/account-list" className="text-lg  text-center font-bold shadow-lg shadow-[1px_2px_3px_0px_rgba(0, 0, 0, 0.30)] text-white rounded-lg p-2 bg-sky-400 linkShadow capitalize">
                  view all Accounts
                </Link>
              </div>
            </div>
            <ActivityGrid />
          </div>
        </div>
      </div>
    </>
  );
};

export default AccountActivity;
