import React from "react";
import { Link } from "react-router-dom";
import AccountTable from "../../GlobalComponents/Table/PartnerTable";
import DashBoardNavbar from "../../GlobalComponents/navbar/DashboardNavbar";
import Sidebar from "../../GlobalComponents/sideBar/Sidebar";
import "./dashboard.css";

const PartnerActivity = () => {
  return (
    <>
      <div className="home">
        <Sidebar />
        <div className="homeContainer">
          <DashBoardNavbar />

          <div className="listContainer">
            <div className="flex flex-col gap-5 mb-4">
              <span className="text-[28px] font-medium  text-black">
                Partner Activity Status
              </span>
              <div className="flex  justify-between">
                <span className="text-xl flex items-center justify-center font-medium text-gray-400 rounded-md capitalize">
                Partner Activity Status
                </span>
                <Link to="/account-list" className="text-lg  text-center font-bold shadow-lg shadow-[1px_2px_3px_0px_rgba(0, 0, 0, 0.30)] text-white rounded-lg p-2 bg-sky-400 linkShadow">
                  view all Accounts
                </Link>
              </div>
            </div>
            <AccountTable/>
          </div>
        </div>
      </div>
    </>
  );
};

export default PartnerActivity;
