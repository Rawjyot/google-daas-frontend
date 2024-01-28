import React from "react";
import { Link } from "react-router-dom";
import AccountListNavbar from "../../../GlobalComponents/navbar/AccountListNavbar";
import Sidebar from "../../../GlobalComponents/sideBar/Sidebar";
import DetailedSection from "./DetailedSection";
import Button from "@mui/material/Button";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Typography from "@mui/material/Typography";
const DetailedList = () => {
  return (
    <>
      <Sidebar />
      <div className="mainContainer">
        <AccountListNavbar />

        <div className="main-content">

        <div className="page-header">
            <div className="row align-items-center">
              <div className="col-md-6"><Typography className="page-title">Account Details</Typography></div>
              <div className="col-md-6 text-right">
              <Link to="/account-List">
                  <Button
                    variant="contained"
                    sx={{
                      alignItems: "center",
                      textAlign: "center",
                      width: "220px",
                    }}
                    startIcon={<ArrowBackIcon />}
                  >
                    Back to GridView
                  </Button>
                </Link>
              </div>
            </div>
          </div>


         
          <DetailedSection />
        </div>
      </div>
    </>
  );
};

export default DetailedList;
