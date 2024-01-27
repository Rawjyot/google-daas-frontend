import React from "react";
import { Link } from "react-router-dom";
import AccountListNavbar from "../../../GlobalComponents/navbar/AccountListNavbar";
import Sidebar from "../../../GlobalComponents/sideBar/Sidebar";
import DetailedSection from "./DetailedSection";

const DetailedList = () => {
  return (
    <div className="home bg-gray-300">
      <Sidebar />
      <div className="homeContainer bg-gray-300">
        <AccountListNavbar/>

        <div className="listContainer">
          <div className="flex flex-col gap-5 mb-2">
            <div className="flex  justify-end">
              <Link to="/account-List" className="text-lg font-bold text-sky-500 underline">
                Back to reports
              </Link>
            </div>
          </div>
          <DetailedSection />
        </div>
      </div>
    </div>
  );
};

export default DetailedList;
