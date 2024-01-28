import React, { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { useGetLocalStorage } from "../../../Hooks/useGetLocalStorage";
import dashboardService from "../../../Services/dashBoardService";

const userData = JSON.parse(useGetLocalStorage("userData"));
// console.log(userData.jwtToken);

const ContactComponent = ({
  val,
  handleOpen,
  accountId,
  setAccountId,
  setStatus,
  status,
  contactId
}) => {
  console.log(val)
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
    // console.log(e.target.value);
    setStatus(e.target.value);
    // setAccountId(val);
  };

  const submit = (e) => {
    e.preventDefault();
    console.log(e)
    if (status === val.contactstatus) return false;
    const data = {
      status: status,
      remark: ""
    };
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

        // window.location.reload(false);
      })
      .catch((err) => console.log(err));
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
          {val?.emailId}
        </h1>
        <h1>
          <span className="font-medium">Ph : </span>
          {val?.mobile1 || "phone number"}
        </h1>
        <h1>
          <span className="font-medium">Job Level : </span>
          {val.jobLevel}
        </h1>
        <h1>
          <span className="font-medium">Designation : </span>
          {val.designation}
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
                value={val.contactStatus}
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
    </>
  );
};

export default ContactComponent;
