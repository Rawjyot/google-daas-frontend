import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AccountActivityGrid } from "../../GlobalComponents/Table/AccountActivityGrid";
import DashBoardNavbar from "../../GlobalComponents/navbar/DashboardNavbar";
import Sidebar from "../../GlobalComponents/sideBar/Sidebar";
import { useGetLocalStorage } from "../../Hooks/useGetLocalStorage";
// import { getMasterData } from "../../Services/dashBoardService";
import { regionsList as regionsListAction } from "../../store/Features/accountSlice";
import dashboardService from "../../Services/dashBoardService";
import "./dashboard.css";
const AccountActivity = () => {
  const dispatch = useDispatch();
  const { technographicsFilter } = useSelector((state) => state.account);
  const userData = JSON.parse(useGetLocalStorage("userData"));

  const fetchRegionList = async () => {
    try {
      const response = await dashboardService.getMasterData({
        userId: userData?.userId,
        userToken: userData?.userToken,
        responseToken: userData?.responseToken,
        roleId: userData?.roleId,
      });

      const regionsList = [];
      response &&
        response.data &&
        response.data.regionList &&
        response.data.regionList.length > 1 &&
        response.data.regionList.map((list) => {
          regionsList.push(Object.values(list)[0]);
        });

      dispatch(regionsListAction(regionsList));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchRegionList();
  }, []);

  return (
    <>
      <div className="home">
        <Sidebar page="accountActivity" />
        <div className="mainContainer">
          <DashBoardNavbar />
          <AccountActivityGrid />
        </div>
      </div>
    </>
  );
};

export default AccountActivity;
