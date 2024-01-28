import React, { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { useGetLocalStorage } from "../../../Hooks/useGetLocalStorage";
import dashboardService from "../../../Services/dashBoardService";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal"
const userData = JSON.parse(useGetLocalStorage("userData"));
// console.log(userData.jwtToken);

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
const ContactComponent = ({
  val,
  accountId,
  setAccountId,
  // setStatus,
  // status,
  contactId
}) => {
  const [open, setOpen] = useState(false);
  const [remark, setRemark] = useState("");
  const [status, setStatus] = useState("")

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  // console.log(status)
  const payloadInfo = {
    "userId": userData?.userId,
    "userToken": userData?.userToken,
    "responseToken": userData?.responseToken,
    "accountId": accountId,
    "contactId": val?.contactId,
    "contactStatsOld": val?.contactStatus,
    "contactStatusNew": status,
    "remarks": ""
  }
  const [hide, setHide] = useState(false);
  // const [reload, setReload] = useState(false);
  const handleDropdown = (e, val) => {
    // console.log(e.target.value, "Target value...");
    setStatus(e.target.value);
    // status = e.target.value;
    // setAccountId(val);
  };

  const statusUpdate = (e) => {

    if ((status === "BadData" || status === "Disqualified") && remark === "") {
      toast.error("remark must be added");
      return;
    }
    payloadInfo['remarks'] = remark
    dashboardService
      .statusUpdateNew(
        accountId,
        payloadInfo,
        JSON.parse(useGetLocalStorage("userData"))?.jwtToken
      )
      .then((res) => {
        console.log(res);
        window.location.reload(false);
      })
      .catch((err) => console.log(err));
    handleClose();
  };

  const submit = (e) => {
    e.preventDefault();
    // console.log(e)
    if (!status) {
      toast.error("Please select a status");
      return
    }
    // if ((status === "BadData" || status === "Disqualified") && remark === "") {
    //   toast.error("remark must be added");
    //   return;
    // }

    if (status === "BadData" || status === "Disqualified") {
      handleOpen();
      return;
    }
    // console.log(data)
    dashboardService
      .statusUpdateNew(
        accountId,
        payloadInfo,
        JSON.parse(useGetLocalStorage("userData"))?.jwtToken
      )
      .then((res) => {
        console.log(res);

        window.location.reload(false);
      })
      .catch((err) => console.log(err));
    handleClose();
    // console.log(data, accountId);
  };


  return (
    <>

      <div className="bg-white px-2 py-1 rounded  text-md flex flex-col gap-2 mt-3">
        <h1>
          <span className="font-medium">Name : </span>
          {val?.contactName}
        </h1>
        <h1>
          <span className="font-medium">Email : </span>
          {val?.emailId || 'NA'}
        </h1>
        <h1>
          <span className="font-medium">Ph : </span>
          {val?.mobile1 || 'NA'}
        </h1>
        <h1>
          <span className="font-medium">Job Level : </span>
          {val.jobLevel || 'NA'}
        </h1>
        <h1>
          <span className="font-medium">Designation : </span>
          {val.designation || 'NA'}
        </h1>

        <h1 className="flex items-center">
          <span className="font-bold mr-1">Status</span> :{" "}
          <form
            action=""
            className="flex items-center justify-center"
            onSubmit={submit}
          >
            <span className="border-5 border-black">
              <select
                id="status"
                name="status"
                onChange={(e) => handleDropdown(e, val.contactaccountID)}
                defaultValue={val.contactStatus}
                className={`outline mx-2 `}
              >
                {/* <option value={val.contactstatus}>{val.contactstatus}</option> */}
                <option value="" disabled>Select Status</option>
                <option value="Opportunity">Opportunity</option>
                <option value="Nurture">Nurture</option>
                <option value="Followup">Followup</option>
                <option value="Disqualified">Disqualified</option>
                <option value="BadData">Bad Data</option>
                <option value="Viewed">Viewed</option>
                <option value="Untouched">Untouched</option>
              </select>

              <button
                type="submit"
                className="ml-3 text-white w-auto px-2 rounded font-bold bg-sky-500"
              >
                Submit
              </button>
            </span>{" "}
          </form>
        </h1>
        {hide === false ? (
          ""
        ) : (
          <h1>
            <span className="font-bold">Department : </span>
            {val.department}
          </h1>
        )}
        <div className="flex justify-center ">
          <button
            className="text-sky-500 font-medium p-0"
            onClick={() => setHide(!hide)}
          >
            {hide === false ? "+more" : "-less"}
          </button>
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
      <ToastContainer />
    </>
  );
};

export default ContactComponent;
