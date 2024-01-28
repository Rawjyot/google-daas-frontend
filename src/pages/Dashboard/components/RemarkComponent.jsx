import React, { useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./DetailedSection.css";
const RemarkComponent = ({ remark, index, userData }) => {
  const [remarkContent, setRemarkContent] = useState("Quality lead");

  return (
    <>
      <div className="remark-box" key={index}>
        <div className="remark-item">
          <h4>{remark?.createdDate}</h4>
          <p>
            {remark?.activityContent}
          </p>
          {remark.remarks ? (
            <p className="remark-status"
            >{remark.remarks}</p>) : ""}
        </div>



      </div>
      <ToastContainer />
    </>
  );
};

export default RemarkComponent;
