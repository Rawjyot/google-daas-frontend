import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import LoadingComponent from "../../../GlobalComponents/LoadingComponent";
import useDashboardAccountCall, {
  useGetMasterData,
  useGetTrailRemarkCall,
} from "../../../Hooks/useDashboardCall";
import { useGetLocalStorage } from "../../../Hooks/useGetLocalStorage";
import dashboardService from "../../../Services/dashBoardService";
import {
  AttachMoneyIcon,
  BlurCircularIcon,
  FmdGoodIcon,
  LanguageIcon,
  LocalPhoneIcon,
  TempleHinduIcon,
} from "../../../assets/icons";
import ContactComponent from "./ContactComponent";
import "./DetailedSection.css";
import RemarkComponent from "./RemarkComponent";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";

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
  const [isLoading, setIsLoading] = useState(true);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  // const handleReload = () => setReload(true);

  const { accountName, accountID } = useParams();

  // console.log(accountName, accountID);
  const userData = JSON.parse(useGetLocalStorage("userData"));
  const userRole = userData?.roleId;

  // console.log(userData.jwtToken);
  const userInfo = {
    userId: userData?.userId,
    userToken: userData?.userToken,
    responseToken: userData?.responseToken,
    accountId: accountID,
  };


  const masterPayload = { ...userInfo };
  delete masterPayload.responseToken;

  const masterData = useGetMasterData(userInfo, userData?.jwtToken);
  const accountDetails = useDashboardAccountCall(userInfo, userData?.jwtToken, reloadData);
  const remarkTrail = useGetTrailRemarkCall(userInfo, userData?.jwtToken, reloadData);
  const payload = {
    "userId": userData?.userId,
    "userToken": userData?.userToken,
    "responseToken": userData?.responseToken,
    "accountId": accountDetails?.accountData?.accountId,
    "contactId": null,
    "contactStatsOld": accountDetails?.accountData?.accountStatus,
    "contactStatusNew": status,
    "remarks": ""
  }
  console.log(payload, "Payload")
  // if (accountDetails) setStatus(accountDetails?.accountStatus)
  useEffect(() => {
    setStatus(accountDetails?.accountData?.accountStatus)
  }, [accountDetails])
  useEffect(() => {

    if (remarkTrail) {
      setIsLoading(false);
    }
  }, [remarkTrail]);
  const handleDropdown = (e) => {
    // console.log(e.target.value, "Target value...");
    setStatus(e.target.value);
    // status = e.target.value;
    // setAccountId(val);
  };

  const statusUpdateAccount = (e) => {

    if ((status === "Bad data" || status === "Disqualified") && remark === "") {
      toast.error("remark must be added");
      return;
    }
    payload['remarks'] = remark
    // return
    // setIsLoading(true);
    dashboardService
      .statusUpdateNew(
        accountId,
        payload,
        JSON.parse(useGetLocalStorage("userData"))?.jwtToken
      )
      .then((res) => {
        console.log(res);
        setReloadData(prevTrigger => !prevTrigger);
        setIsLoading(false);
        // window.location.reload(false);
      })
      .catch((err) => {
        console.log(err)
        setIsLoading(false);
      });
    handleClose();
  };
  const handleFetchData = () => {
    // Your logic to fetch data
    setReloadData(prevTrigger => !prevTrigger); // Toggle the trigger to re-fetch data
  };
  // setIsLoading(false);
  const convertToHttps = (url) => {
    // Check if the URL starts with "http://" or "https://"
    if (!/^https?:\/\//i.test(url)) {
      // If not, prepend "https://"
      return `https://${url}`;
    }
    // Otherwise, return the original URL
    return url;
  };
  const submit = (e) => {
    e.preventDefault();
    // console.log(e)

    if (!status || status === 'Viewed') {
      toast.error("Please select a status");
      return
    }
    handleOpen();
    return;

  };
  return (
    <>
      {!isLoading ? (
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
                    <li>
                      <span>
                        <LanguageIcon />
                      </span>{" "}
                      <a href={convertToHttps(accountDetails?.accountData?.website) || "#"} target="_blank">{accountDetails?.accountData?.website || ""}</a>
                    </li>
                    <li>
                      <span>
                        <TempleHinduIcon />
                      </span>{" "}
                      {accountDetails?.accountData?.empSize}
                    </li>
                    <li>
                      <span>
                        <BlurCircularIcon />
                      </span>{" "}
                      {accountDetails?.accountData?.vertical}
                    </li>
                    <li>
                      <span>
                        <FmdGoodIcon />
                      </span>{" "}
                      {accountDetails?.accountData?.city}{" "}
                      {accountDetails?.accountData?.state}{" "}
                    </li>
                    <li>
                      <span>
                        <LocalPhoneIcon />
                      </span>{" "}
                      {accountDetails?.accountData?.boardlineNumber1 ||
                        accountDetails?.accountData?.boardlineNumber2}
                    </li>
                    <li>
                      <span>
                        <AttachMoneyIcon />
                      </span>{" "}
                      {accountDetails?.accountData?.revenue}
                    </li>
                  </ul>
                  <div className="flex gap-2" style={{
                    borderBottom: '1px dashed #ccc',
                    marginBottom: '5px',
                    marginTop: '5px'
                  }}>
                    {/* <b>Technographics</b> */}
                    <p className="ml-2">
                      <span style={{ textAlign: 'center' }}><b>Technographics :</b></span><br />
                      {accountDetails?.accountData?.technographics ? accountDetails?.accountData?.technographics?.split('#').map((item, index) => (
                        <li key={index}>{item}</li>
                      )) : 'N/A'}
                      {/* {accountDetails?.accountData?.technographics} */}
                    </p>
                  </div>
                  {/* <br></br> */}
                  {userRole == 3 ? (<>
                    <label><strong>Status</strong> :{" "}</label>
                    <form
                      action=""
                      className="flex items-center justify-center"
                      onSubmit={submit}
                    >
                      <div className="input-group">
                        <select
                          id="status"
                          name="status"
                          onChange={(e) => handleDropdown(e)}
                          value={status}
                          className={`form-control `}
                        >
                          {/* <option value={val.contactstatus}>{val.contactstatus}</option> */}
                          <option value="">Select Status</option>
                          {masterData ? masterData?.accountStatusList?.map((statusObj, index) => {
                            const key = Object.keys(statusObj)[0]; // Assuming there's only one key in each object
                            const value = statusObj[key];

                            return (
                              <option key={index} value={value}>
                                {value}
                              </option>
                            );
                          }) : (
                            <>
                              <option value="Disqualified">Disqualified</option>
                              <option value="Follow Up">Follow Up</option>
                              <option value="Nurture">Nurture</option>
                              <option value="Opportunity">Opportunity</option>
                            </>
                          )}

                        </select>

                        <div className="input-group-append">
                          <button type="submit" className="btn btn-submit">Submit</button>
                        </div>{" "}

                      </div>
                    </form></>) : ''}

                  <div className="mt-3">
                    <Stack spacing={1} alignItems="center">
                      <Stack direction="row" spacing={1}>
                        <Chip
                          label={accountDetails?.accountData?.accountStatus}
                          color={accountDetails?.accountData?.accountStatus === "Bad data" || accountDetails?.accountData?.accountStatus === "Disqualified" ? "error" :
                            (accountDetails?.accountData?.accountStatus ===
                              "Opportunity"
                              ? "default"
                              : "primary")
                          }
                          className={
                            accountDetails?.accountData?.accountStatus ===
                              "Opportunity"
                              ? "green-chip"
                              : ""
                          }
                        />
                      </Stack>
                    </Stack>
                  </div>
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
                  {accountDetails?.contactList?.map((item, index) => (
                    <ContactComponent
                      val={item}
                      handleOpen={handleOpen}
                      accountId={accountID}
                      contactId={item?.contactId}
                      status={item?.contactStatus}
                      key={index}
                      userRole={userRole}
                      masterData={masterData}
                      fetchData={handleFetchData}
                    />
                  ))}
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
          <div>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style} className="custom-modal">
                <div className="modal-body">
                  <h2 className="modal-title">Enter Your Remark</h2>
                  <textarea
                    className="form-control"
                    value={remark}
                    onChange={(e) => setRemark(e.target.value)}
                  />
                  <div className="modal-action">
                    <button
                      onClick={statusUpdateAccount}
                      className="btn-submit"
                    >
                      Submit
                    </button>
                    <button
                      onClick={handleClose}
                      className="btn-reset"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </Box>
            </Modal>
          </div>
        </div >
      ) : (
        <LoadingComponent />
      )}
    </>
  );
};

export default DetailedSection;
