import React, { useEffect, useState } from "react";
import { useGetLocalStorage } from "../../../Hooks/useGetLocalStorage";

import { getListTable } from "../../../Services/dashBoardService";

//account label,

const AccountTable = () => {
  const userData = JSON.parse(useGetLocalStorage("userData"));
  const [tableData, setTableData] = useState([]);
  // console.log(userData.role);
  // console.log(data);
  let header;
  if (userData.role === "user") {
    header = [
      "accountName",
      "size",
      "city",
      "state",
      "country",
      "revenue",
      "industry",
      "boardlineNumber",
      "noOfContacts",
      "newContacts",
      "status",
    ];
  } else if (userData.role === "Partner") {
    header = [
      "accountName",
      "size",
      "city",
      "state",
      "country",
      "revenue",
      "industry",
      "boardlineNumber",
      "noOfContacts",
      "newContacts",
      "status",
      "assignToUser",
    ];
  } else {
    header = [
      "accountName",
      "size",
      "city",
      "state",
      "country",
      "revenue",
      "industry",
      "boardlineNumber",
      "noOfContacts",
      "newContacts",
      "status",
      "assignToUser",
      "assignToName",
    ];
  }

  const TabColumns = [
    {
      name: "Account Name",
      key: "accountName",
      sort: true,
      width: "5rem",
    },
    {
      name: "size",
      key: "size",
      sort: true,
      width: "5rem",
      onFormatter: (item) => {
        return (
          <div className="gap-0 flex flex-col">
            <span className="flex-1 m-text-md-regular text-gray-900">
              {item.RequestedBy.username}
            </span>
            <span className="TableTime flex-1 m-text-md-regular text-gray-600">
              Emp. Code {item.RequestedBy.employeeCode}
            </span>
          </div>
        );
      },
    },
    {
      name: "city",
      key: "city",
      sort: true,
      headerClasses: "m-text-sm-bold text-gray-800",
      width: "7rem",
    },
    {
      name: "state",
      key: "state",
      sort: true,
      width: "9rem",
    },

    {
      name: "country",
      key: "country",
      sort: true,
      width: "10rem",
    },
    {
      name: "board Line Number 1",
      key: "boardLineNumber1",
      sort: true,
      width: "10rem",
      classes: "QualityColumn mt-auto mb-auto",
    },
    {
      name: "vertical",
      key: "vertical",
      sort: true,
      width: "10rem",
      classes: "QualityColumn mt-auto mb-auto",
    },
    {
      name: "revenue",
      key: "revenue",
      sort: true,
      width: "10rem",
      classes: "QualityColumn mt-auto mb-auto",
    },
    {
      name: "empSize",
      key: "empSize",
      sort: true,
      width: "10rem",
      classes: "QualityColumn mt-auto mb-auto",
    },
    {
      name: "accountStatus",
      key: "accountStatus",
      sort: true,
      width: "10rem",
      classes: "QualityColumn mt-auto mb-auto",
    },
    {
      name: "noOfContact",
      key: "noOfContact",
      sort: true,
      width: "10rem",
      classes: "QualityColumn mt-auto mb-auto",
    },
    {
      name: "noOfContact",
      key: "noOfNewContact",
      sort: true,
      width: "10rem",
      classes: "QualityColumn mt-auto mb-auto",
    },
    {
      name: "partnerName",
      key: "partnerName",
      sort: true,
      width: "10rem",
      classes: "QualityColumn mt-auto mb-auto",
    },
    {
      name: "createdDate",
      key: "createdDate",
      sort: true,
      width: "10rem",
      classes: "QualityColumn mt-auto mb-auto",
    },
    {
      name: "assignedTo",
      key: "assignedTo",
      sort: true,
      width: "10rem",
      classes: "QualityColumn mt-auto mb-auto",
    },
  ];

  const getAccountTable = async () => {
    try {
      const getTableRes = await getListTable({
        userId: "arpan@denave.com",
        userToken: "9d3507edcf83d1dd1",
        responseToken: "4252989547",
        roleId: "1",
      });
      setTableData(getTableRes?.accountGridData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAccountTable();
  }, []);

  return (
    <>
      <div className="flex justify-between w-[800px] text-xl text-slate-500 font-medium">
        <p>
          Total Accounts :<span className="text-sky-500"> 10 </span>
        </p>
        <p>
          Total Contacts :<span className="text-sky-500"> 11 </span>
        </p>
        <p>
          New Accounts :<span className="text-sky-500"> 0 </span>
        </p>
        <p>
          New Contacts :<span className="text-sky-500"> 0 </span>
        </p>
      </div>
    </>
  );
};
export default AccountTable;
