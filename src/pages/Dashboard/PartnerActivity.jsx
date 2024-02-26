import { PartnerActivityGrid } from "../../GlobalComponents/Table/PartnerActivityGrid";
import DashBoardNavbar from "../../GlobalComponents/navbar/DashboardNavbar";
import Sidebar from "../../GlobalComponents/sideBar/Sidebar";
import "./dashboard.css";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useGetLocalStorage } from "../../Hooks/useGetLocalStorage";

const PartnerActivity = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const userData = JSON.parse(useGetLocalStorage("userData"));
    const userRole = userData?.roleId;
    if (userRole === 3) navigate('/');
  }, [])


  return (
    <>
      <div className="home">
        <Sidebar page="accountActivity" />
        <div className="mainContainer">
          <DashBoardNavbar />

          <PartnerActivityGrid />
        </div>
      </div>
    </>
  );
};

export default PartnerActivity;
