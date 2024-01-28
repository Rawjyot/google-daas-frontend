import React, { useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const RemarkComponent = ({ remark, index, userData }) => {
  const [remarkContent, setRemarkContent] = useState("Quality lead");

  return (
    <>
      <div key={index}>
        <p className="text-gray-500 my-2">
          {remark?.createdDate}
        </p>
        <hr />
        <div className="flex gap-3 my-3">
          <p>
            {/* Contact status for{" "}
            <span className="text-gray-500 font-semibold">{remark.name}</span>{" "}
            Updated from {remark?.updatedStatus} to{" "}
            <span className="font-bold text-green-500">
              {remark?.updatedStatus}
            </span> */}
            {remark?.activityContent}
          </p>
        </div>
        {remark.remarks ? (<textarea
          className="border p-2 rounded w-[20em]"
          value={remark.remarks}
          // onChange={(e) => setRemarkContent(e.target.value)}
          disabled
        />) : ""}

      </div>
      <ToastContainer />
    </>
  );
};

export default RemarkComponent;
