import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { AccountListGrid } from "../../../GlobalComponents/Table/AccountListGrid";
import AccountListNavbar from "../../../GlobalComponents/navbar/AccountListNavbar";
import Sidebar from "../../../GlobalComponents/sideBar/Sidebar";
import { useGetLocalStorage } from "../../../Hooks/useGetLocalStorage";
import {
  accountList,
  agentList as agentListAction,
} from "../../../store/Features/accountSlice";

import {
  getAccountListDetails,
  getAccountListDetailsFiltered,
  getAgentList,
} from "../../../Services/dashBoardService";
import AccountListMeta from "./AccountListMeta";
import "./acountList.css";

const AccountList = () => {
  const dispatch = useDispatch();
  const { partnerFilter } = useSelector((state) => state.account);
  const { agentFilter } = useSelector((state) => state.account);
  const { empSizeFilter } = useSelector((state) => state.account);
  const { countryFilter } = useSelector((state) => state.account);
  const { stateFilter } = useSelector((state) => state.account);
  const { revenueFilter } = useSelector((state) => state.account);
  const { cityFilter } = useSelector((state) => state.account);
  const { verticalFilter } = useSelector((state) => state.account);
  const { statusFilter } = useSelector((state) => state.account);
  const { regionsFilter } = useSelector((state) => state.account);
  const { technographicsFilter } = useSelector((state) => state.account);
  const userData = JSON.parse(useGetLocalStorage("userData"));

  const fetchAccountListDetails = async () => {
    try {
      let response = null;
      if (
        (empSizeFilter && empSizeFilter.length > 0) ||
        (partnerFilter && partnerFilter.length > 0) ||
        (agentFilter && agentFilter.length > 0) ||
        (statusFilter && statusFilter.length > 0) ||
        (regionsFilter && regionsFilter.length > 0) ||
        (countryFilter && countryFilter.length > 0) ||
        (stateFilter && stateFilter.length > 0) ||
        (cityFilter && cityFilter.length > 0) ||
        (verticalFilter && verticalFilter.length > 0) ||
        (revenueFilter && revenueFilter.length > 0) ||
        (technographicsFilter && technographicsFilter.length > 0)
      ) {
        response = await getAccountListDetailsFiltered({
          userId: userData?.userId,
          userToken: userData?.userToken,
          responseToken: userData?.responseToken,
          roleId: userData?.roleId,
          partnerId:
            (partnerFilter &&
              partnerFilter.length > 0 &&
              partnerFilter.join("^")) ||
            "",
          agentId:
            (agentFilter && agentFilter.length > 0 && agentFilter.join("^")) ||
            "",
          accountStatus:
            (statusFilter &&
              statusFilter.length > 0 &&
              statusFilter.join("^")) ||
            "",
          region:
            (regionsFilter &&
              regionsFilter.length > 0 &&
              regionsFilter.join("^")) ||
            "",
          country:
            (countryFilter &&
              countryFilter.length > 0 &&
              countryFilter.join("^")) ||
            "",
          state:
            (stateFilter && stateFilter.length > 0 && stateFilter.join("^")) ||
            "",
          city:
            (cityFilter && cityFilter.length > 0 && cityFilter.join("^")) || "",
          vertical:
            (verticalFilter &&
              verticalFilter.length > 0 &&
              verticalFilter.join("^")) ||
            "",
          empSize:
            (empSizeFilter &&
              empSizeFilter.length > 0 &&
              empSizeFilter.join("^")) ||
            "",
          revenue:
            (revenueFilter &&
              revenueFilter.length > 0 &&
              revenueFilter.join("^")) ||
            "",
          technographics:
            (technographicsFilter &&
              technographicsFilter.length > 0 &&
              technographicsFilter.join("^")) ||
            "",
        });
      } else {
        response = await getAccountListDetails({
          userId: userData?.userId,
          userToken: userData?.userToken,
          responseToken: userData?.responseToken,
          roleId: userData?.roleId,
        });
      }

      dispatch(accountList(response.data));
    } catch (error) {
      console.log(error);
    }
  };

  const fetchAgentList = async () => {
    const response = await getAgentList({
      userId: userData?.userId,
      userToken: userData?.userToken,
      responseToken: userData?.responseToken,
      roleId: userData?.roleId,
      dataFor: partnerFilter.join(","),
    });

    const agentList =
      response.data &&
      response.data.userList &&
      response.data.userList.map((list) => Object.keys(list)[0]);

    dispatch(agentListAction(agentList));
  };

  useEffect(() => {
    fetchAccountListDetails();
    fetchAgentList();
  }, [
    technographicsFilter,
    revenueFilter,
    regionsFilter,
    empSizeFilter,
    verticalFilter,
    statusFilter,
    partnerFilter,
    agentFilter,
  ]);

  return (
    <>
      <Sidebar page="accountList" />
      <div className="mainContainer">
        <AccountListNavbar />
        <div className="main-content">
          <div className="page-header">
            <div className="row align-items-center">
              <div className="col-md-6">
                <Typography className="page-title">Account List</Typography>
              </div>
              <div className="col-md-6 text-right">
                <Link to="/account-activity">
                  <Button
                    variant="contained"
                    sx={{
                      alignItems: "center",
                      textAlign: "center",
                      width: "220px",
                    }}
                    startIcon={<ArrowBackIcon />}
                  >
                    Back to Dashboard
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-12">
              <div className="grid-data grid-datatable">
                <AccountListMeta />
                <AccountListGrid />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default AccountList;
