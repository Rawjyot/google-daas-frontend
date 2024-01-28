import { AccountActivityGrid } from "../../GlobalComponents/Table/AccountActivityGrid";
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
          <AccountActivityGrid />
        </div>
      </div>
    </>
  );
};

export default AccountActivity;
