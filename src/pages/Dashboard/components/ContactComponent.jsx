import React, { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { useGetLocalStorage } from "../../../Hooks/useGetLocalStorage";
import dashboardService from "../../../Services/dashBoardService";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal"
const userData = JSON.parse(useGetLocalStorage("userData"));
import {
  useGetMasterData,
} from "../../../Hooks/useDashboardCall";
// console.log(userData.jwtToken);
import "./DetailedSection.css";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 450,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};
const ContactComponent = ({
  val,
  accountId,
  setAccountId,
  userRole,
  // setStatus,
  // status,
  contactId
}) => {
  const [open, setOpen] = useState(false);
  const [remark, setRemark] = useState("");
  const [status, setStatus] = useState(val?.contactStatus)

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const userInfo = {
    "userId": userData?.userId,
    "userToken": userData?.userToken,
    "responseToken": userData?.responseToken,

  }
  const masterData = useGetMasterData(
    userInfo,
    userData?.jwtToken
  );
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

  // console.log(masterData);
  const statusUpdate = (e) => {

    if ((status === "Bad data" || status === "Disqualified") && remark === "") {
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
    handleOpen();
    return;
    // if ((status === "BadData" || status === "Disqualified") && remark === "") {
    //   toast.error("remark must be added");
    //   return;
    // }

    // if (status === "BadData" || status === "Disqualified") {
    //   handleOpen();
    //   return;
    // }
    // // console.log(data)
    // dashboardService
    //   .statusUpdateNew(
    //     accountId,
    //     payloadInfo,
    //     JSON.parse(useGetLocalStorage("userData"))?.jwtToken
    //   )
    //   .then((res) => {
    //     console.log(res);

    //     window.location.reload(false);
    //   })
    //   .catch((err) => console.log(err));
    // handleClose();
    // console.log(data, accountId);
  };


  return (
    <>

      <div className="contact-box">
        <p>
          <span>Name : </span>
          {val?.contactName}
        </p>
        <p>
          <span>Email : </span>
          {val?.emailId || 'NA'}
        </p>
        <p>
          <span>Ph : </span>
          {val?.mobile1 || 'NA'}
        </p>

        <p>
          <span>Designation : </span>
          {val.designation || 'NA'}
        </p>
        <label><strong>Status</strong> :{" "}</label>
        {(userRole == 1 || userRole == 2 || val?.contactStatus == 'Opportunity') ? val?.contactStatus || ' NA' : (<form
          action=""
          className="flex items-center justify-center"
          onSubmit={submit}
        >
          <div className="input-group">
            <select
              id="status"
              name="status"
              onChange={(e) => handleDropdown(e, val.contactaccountID)}
              value={status}
              className={`form-control `}
            >
              {/* <option value={val.contactstatus}>{val.contactstatus}</option> */}
              <option value="">Select Status</option>
              {masterData?.accountStatusList?.map((statusObj, index) => {
                const key = Object.keys(statusObj)[0]; // Assuming there's only one key in each object
                const value = statusObj[key];

                return (
                  <option key={index} value={value}>
                    {value}
                  </option>
                );
              })}
              {/* <option value="Opportunity">Opportunity</option>
              <option value="Nurture">Nurture</option>
              <option value="Follow Up">Follow Up</option>
              <option value="Disqualified">Disqualified</option>
              <option value="Bad data">Bad data</option>
              <option value="Viewed">Viewed</option>
              <option value="Untouched">Untouched</option> */}
            </select>

            <div className="input-group-append">
              <button type="submit" className="btn btn-submit">Submit</button>
            </div>{" "}

          </div>
        </form>)}
        {hide === false ? (
          ""
        ) : (
          <div>
            <p className="mt-3">
              <span>Job Level : </span>
              {val.jobLevel || 'NA'}
            </p>

            <p className="mb-0">
              <span>Department : </span>
              {val.department}
            </p>
          </div>
        )}
        <div className="text-center">
          <button
            className="more-btn"
            onClick={() => setHide(!hide)}
          >
            {hide === false ? "+ See More" : "- See Less"}
          </button>
        </div></div>
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
                  onClick={statusUpdate}
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
      <ToastContainer />
    </>
  );
};

export default ContactComponent;
