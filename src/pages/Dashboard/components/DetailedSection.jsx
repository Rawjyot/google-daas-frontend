import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import useDashboardAccountCall, {
  useDashboardContactCall,
  useDashboardContactCountCall,
  useGetTrailRemarkCall,
} from "../../../Hooks/useDashboardCall";
import { useGetLocalStorage } from "../../../Hooks/useGetLocalStorage";
import dashboardService from "../../../Services/dashBoardService";
import {
  AttachMoneyIcon,
  BlurCircularIcon,
  FlagIcon,
  FmdGoodIcon,
  LanguageIcon,
  LocalPhoneIcon,
  TempleHinduIcon,
} from "../../../assets/icons";
import ContactComponent from "./ContactComponent";
import RemarkComponent from "./RemarkComponent";
import "./DetailedSection.css";

const marketData = [
  { title: "Company Type", content: "Public" },
  { title: "Stock Exchange", content: "NSE" },
  { title: "Funding Amount", content: "NA" },
  { title: "Funding Type", content: "NA" },
  {
    title: "Technographics",
    content: "Azure, MsOffice,            FreshSales",
  },
];

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};
const DetailedSection = () => {
  const [status, setStatus] = useState("");
  const [accountId, setAccountId] = useState("");
  const [open, setOpen] = useState(false);
  const [reloadData, setReloadData] = useState(false);
  const [remark, setRemark] = useState("");

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  // const handleReload = () => setReload(true);

  const handleReload = () => {
    console.log("Hello testing")
    setReloadData(true);
    useGetTrailRemarkCall(
      userInfo,
      userData?.jwtToken
    )
    // After data is refetched, reset the reload state
    setReloadData(false);
  };

  // useEffect(() => {
  //   if (reloadData) {
  //     // Perform data refetching logic here
  //     console.log('Data is being refetched...');
  //     useGetTrailRemarkCall(
  //       userInfo,
  //       userData?.jwtToken
  //     )
  //     // After data is refetched, reset the reload state
  //     setReloadData(false);
  //   }
  // }, [reloadData]);
  const { accountName, accountID } = useParams();

  // console.log(accountName, accountID);
  const userData = JSON.parse(useGetLocalStorage("userData"));
  const userRole = userData?.roleId
  // console.log(userData.jwtToken);
  const userInfo = {
    "userId": userData?.userId,
    "userToken": userData?.userToken,
    "responseToken": userData?.responseToken,
    "accountId": accountID
  }
  const accountDetails = useDashboardAccountCall(
    userInfo,
    userData.jwtToken
  );
  const remarkTrail = useGetTrailRemarkCall(
    userInfo,
    userData?.jwtToken
  );
  console.log(accountDetails, "Account Detail###########");

  // const contactCount = useDashboardContactCountCall(
  //   accountName,
  //   userData.jwtToken
  // );
  // console.log(contactCount);
  // const contacts = useDashboardContactCall(accountName, userData.jwtToken);
  // console.log(contacts);
  // console.log(accountDetails);
  const statusUpdate = () => {
    console.log("Test Test")
    if ((status === "BadData" || status === "Disqualified") && remark === "") {
      toast.error("remark must be added");
      return;
    }
    dashboardService
      .statusUpdate(
        accountId,
        { status: status, remark: remark },
        JSON.parse(useGetLocalStorage("userData")).jwtToken
      )
      .then((res) => {
        console.log(res);
        window.location.reload(false);
      })
      .catch((err) => console.log(err));
    handleClose();
  };

  return (
    <>


      <div className="row">
        <div className="col-lg-4">
          <div className="card custom-card">
            <div className="card-header">
              <h6>Account Details</h6>
            </div>
            <div className="card-body">
              <div className="card-inner">
                <h3 className="comp-name">
                  {accountDetails?.accountData?.accountName}{" "}
                  {/* <span>
                    <FlagIcon />
                  </span> */}
                </h3>
                <ul className="comp-lsit">
                  <li><span><LanguageIcon /></span> {accountDetails?.accountData?.website || ""}</li>
                  <li><span><TempleHinduIcon /></span> {accountDetails?.accountData?.empSize}</li>
                  <li><span><BlurCircularIcon /></span> {accountDetails?.accountData?.vertical}</li>
                  <li><span><FmdGoodIcon /></span> {accountDetails?.accountData?.city} {accountDetails?.accountData?.state}{" "}</li>
                  <li><span><LocalPhoneIcon /></span> {accountDetails?.accountData?.boardlineNumber1 || accountDetails?.accountData?.boardlineNumber2}</li>
                  <li><span><AttachMoneyIcon /></span> {accountDetails?.accountData?.revenue}</li>
                </ul>
                <div className="flex gap-2">
                  <b>Technographics</b>
                  <p className="ml-2">{accountDetails?.accountData?.technographics}</p>
                </div>

                <p className="mt-3">
                  <Stack spacing={1} alignItems="center" >
                    <Stack direction="row" spacing={1}>

                      <Chip
                        label={accountDetails?.accountData?.accountStatus}
                        color={accountDetails?.accountData?.accountStatus === 'Opportunity' ? 'default' : 'primary'}
                        className={accountDetails?.accountData?.accountStatus === 'Opportunity' ? 'green-chip' : ''}
                      />


                    </Stack>
                  </Stack>
                </p>

              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="card custom-card">
            <div className="card-header">
              <h6>Contact Details</h6>
            </div>
            <div className="card-body">
              <div className="card-inner">
                {accountDetails?.contactList?.map((item, index) =>
                  <ContactComponent
                    val={item}
                    handleOpen={handleOpen}
                    accountId={accountID}
                    contactId={item?.contactId}
                    status={item?.contactStatus}
                    key={index}
                    userRole={userRole}
                  />
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-4">
          <div className="card custom-card">
            <div className="card-header">
              <h6>Activity & Remarks</h6>
            </div>
            <div className="card-body">
              <div className="card-inner">
                {remarkTrail?.activityList?.length === 0
                  ? "No Status Updated"
                  : remarkTrail?.activityList?.map((remark, index) => (
                    <RemarkComponent
                      index={index}
                      remark={remark}
                      userData={userData}
                      key={index}
                    />
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>




    </>
  );
};

export default DetailedSection;
