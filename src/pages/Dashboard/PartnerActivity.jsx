import { PartnerActivityGrid } from "../../GlobalComponents/Table/PartnerActivityGrid";
import DashBoardNavbar from "../../GlobalComponents/navbar/DashboardNavbar";
import Sidebar from "../../GlobalComponents/sideBar/Sidebar";
import "./dashboard.css";

const PartnerActivity = () => {
  return (
    <>
      <div className="home">
        <Sidebar />
        <div className="mainContainer">
          <DashBoardNavbar />

          <PartnerActivityGrid />
        </div>
      </div>
    </>
  );
};

export default PartnerActivity;
