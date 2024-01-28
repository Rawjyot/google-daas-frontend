import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import React, { useState } from "react";
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
  const [remark, setRemark] = useState("");

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { accountName, accountID } = useParams();

  // console.log(accountName, accountID);
  const userData = JSON.parse(useGetLocalStorage("userData"));
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
    userData.id,
    userData.jwtToken,
    accountID
  );
  console.log(accountDetails, "Account Detail###########");

  const contactCount = useDashboardContactCountCall(
    accountName,
    userData.jwtToken
  );
  // console.log(contactCount);
  const contacts = useDashboardContactCall(accountName, userData.jwtToken);
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
      <div className="grid grid-cols-3 gap-10">
        <div>
          <h1 className="text-lg">Account Details</h1>
          <div>
            {/* {accountDetails?.accountData?.map((item, index) => ( */}
            <div >
              <div className="bg-white px-2 py-1 rounded text-md flex flex-col  mt-3">
                <div className="flex flex-col gap-2 ">
                  <p className="font-semibold">
                    {accountDetails?.accountData?.accountName}{" "}
                    <span>
                      <FlagIcon />
                    </span>
                  </p>
                  <div className="flex gap-2">
                    <LanguageIcon className="text-black" />
                    <p className="ml-2">{accountDetails?.accountData?.website || ""}</p>
                  </div>
                  <div className="flex gap-2">
                    <TempleHinduIcon className="text-black" />
                    <p className="ml-2">{accountDetails?.accountData?.empSize}</p>
                  </div>
                  <div className="flex gap-2">
                    <BlurCircularIcon className="text-black" />
                    <p className="ml-2">{accountDetails?.accountData?.vertical}</p>
                  </div>
                  <div className="flex gap-2">
                    <FmdGoodIcon className="text-black" />
                    <p className="ml-2">
                      {accountDetails?.accountData?.city} {accountDetails?.accountData?.state}{" "}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <LocalPhoneIcon className="text-black" />
                    <p className="ml-2">{accountDetails?.accountData?.boardlineNumber1 || accountDetails?.accountData?.boardlineNumber2}</p>
                  </div>
                  <div className="flex gap-2">
                    <AttachMoneyIcon className="text-black" />
                    <p className="ml-2">{accountDetails?.accountData?.revenue}</p>
                  </div>

                </div>
              </div>
              <div className="bg-white px-2 py-1 rounded h-auto text-md flex flex-col gap-3 mt-1">
                <div className="flex flex-col gap-2">
                  <div className="flex gap-2">
                    <b>Technographics</b>
                    <p className="ml-2">{accountDetails?.accountData?.technographics}</p>
                  </div>

                  <div className="flex gap-2">
                    <b>{accountDetails?.accountData?.accountStatus}</b>
                  </div>
                </div>
              </div>
              {/* <div className="bg-white px-2 py-1 rounded h-auto text-md flex flex-col gap-3 mt-1">
                <div className="flex flex-col gap-2">
                  {marketData.map((item) => (
                    <div key={item.title}>
                      {item.title} :{" "}
                      <span className="ml-1">{accountDetails?.accountData?.content}</span>
                    </div>
                  ))}
                </div>
                <div className="mx-auto">
                  <button className="p-2 text-md font-semibold text-white bg-green-400 w-auto">
                    Opportunity
                  </button>
                </div>
              </div> */}
              {" "}
            </div>

          </div>
        </div>
        <div>
          <h1 className="text-lg">
            Contacts: <span className="font-bold">{contactCount}</span>
          </h1>
          <div className="h-[500px] overflow-y-scroll ">
            {accountDetails?.contactList?.map((item, index) =>

              <ContactComponent
                val={item}
                handleOpen={handleOpen}
                setAccountId={setAccountId}
                setStatus={setStatus}
                status={status}
                accountId={accountId}
                contactId={item?.contactId}
              />

            )}
          </div>
        </div>
        <div>
          <h1>Activity & Remarks</h1>
          <div className="bg-white px-4 py-2 rounded h-[500px] overflow-y-scroll text-md flex flex-col gap-2 mt-3 ">
            <div>
              {remarkTrail.length === 0
                ? "No Status Updated"
                : remarkTrail?.map((remark, index) => (
                  <RemarkComponent
                    index={index}
                    remark={remark}
                    userData={userData}
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
          <Box sx={style} className="rounded-lg">
            <div className="flex flex-col items-start">
              <h1 className="text-2xl">Enter Your Remark :</h1>
              <input
                className="mt-2 outline-none border-2 rounded-md p-1"
                type="text"
                value={remark}
                onChange={(e) => setRemark(e.target.value)}
              />
              <div className="mt-5 flex gap-3 ">
                <button
                  onClick={statusUpdate}
                  className="bg-green-500 text-white font-medium p-0 rounded-md w-[100px]"
                >
                  Submit
                </button>
                <button
                  onClick={handleClose}
                  className="bg-red-500 text-white font-medium p-0 rounded-md w-[100px]"
                >
                  Cancel
                </button>
              </div>
            </div>
          </Box>
        </Modal>
      </div>
    </>
  );
};

export default DetailedSection;
