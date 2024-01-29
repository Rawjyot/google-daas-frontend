import { useSelector } from "react-redux";
import { useGetLocalStorage } from "../../../Hooks/useGetLocalStorage";

const AccountListMeta = () => {
  const { accountListData } = useSelector((state) => state.account);
  const userData = JSON.parse(useGetLocalStorage("userData"));
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

  return (
    <>
      <div className="account-meta">
        <div className="row align-items-center">
          <div className="col-4">
            <p>
              Total Accounts{" "}
              <span style={{ color: "#4185F4" }}>
                {accountListData && accountListData.totalAccounts}
              </span>
            </p>
          </div>
          <div className="col-4">
            <p>
              Total Contacts{" "}
              <span style={{ color: "#4185F4" }}>
                {accountListData && accountListData.totalContacts}{" "}
              </span>
            </p>
          </div>
          <div className="col-4">
            <p>
              New Contacts{" "}
              <span style={{ color: "#4185F4" }}>
                {accountListData && accountListData.totalNewContacts}{" "}
              </span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
export default AccountListMeta;
