import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useGetLocalStorage } from "../../../Hooks/useGetLocalStorage";
import styles from "./acountList.module.css";

//account label,
const accountNumbers = [
  {
    text: "Total Accounts",
    number: 1000,
  },
  {
    text: "new accounts",
    number: 1000,
  },
  {
    text: "total contacts",
    number: 1000,
  },
  {
    text: "new contacts",
    number: 1000,
  },
];
const AccountTable = ({ data }) => {
  const { status, revenue, size, State } = useSelector((state) => state.filter);
  const userData = JSON.parse(useGetLocalStorage("userData"));
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
  return (
    <>
      <div className="flex justify-between w-[800px] text-xl text-slate-500 font-medium">
        {/* {accountNumbers?.map((item) => (
          <p key={item.text}>
           {item?.text} :  {item?.text === "Total Accounts" ? ( <span className="text-sky-500">{totalAccount}
           </span>) : ( <span className="text-sky-500">{item?.number}</span>)}
          </p>
        ))} */}

        <p>
          Total Accounts :<span className="text-sky-500"> {data.length} </span>
        </p>
        <p>
          Total Contacts :<span className="text-sky-500"> {data.length} </span>
        </p>
        <p>
          New Accounts :<span className="text-sky-500"> 0 </span>
        </p>
        <p>
          New Contacts :<span className="text-sky-500"> 0 </span>
        </p>
      </div>
      <div className={`${styles.table}`}>
        <table
          style={{ borderSpacing: "30px" }}
          className={`mt-5 border-spacing-3  ${styles.accountList}`}
        >
          <tr>
            {header?.map((item, index) => (
              <th
                key={index}
                className="capitalize border-2 border-white  h-[30px] text-center bg-[rgba(14,112,183,0.81)] text-white"
              >
                {item}
              </th>
            ))}
          </tr>
          {status !== "None" ||
          revenue !== "None" ||
          size !== "None" ||
          State !== "None"
            ? data
                ?.filter(
                  (val) =>
                    val.status === status ||
                    val.state === State ||
                    val.size === size ||
                    val.revenue === revenue
                )
                .map((item, index) => (
                  <tr key={index}>
                    <td className="border-2 border-white  w-[250px] font-bold text-center text-sky-500">
                      <Link
                        to={`/detailed-account/${item.accountName}/${item.accountID}`}
                      >
                        {item.accountName}{" "}
                      </Link>
                    </td>
                    <td className="border-2 border-white h-[80px] w-[250px] font-bold text-center ">
                      <Link>{item.size} </Link>
                    </td>
                    <td className="border-2 border-white h-[80px] w-[250px] font-bold text-center text">
                      <Link>{item.city} </Link>
                    </td>
                    <td className="border-2 border-white h-[80px] w-[250px] font-bold text-center text">
                      <Link>{item.state || "NA"} </Link>
                    </td>
                    <td className="border-2 border-white h-[80px] w-[250px] font-bold text-center text">
                      <Link>{item.country} </Link>
                    </td>
                    <td className="border-2 border-white h-[80px] w-[250px] font-bold text-center text">
                      <Link>{item.revenue} </Link>
                    </td>
                    <td className="border-2 border-white h-[80px] w-[250px] font-bold text-center text">
                      <Link>{item.industry} </Link>
                    </td>
                    <td className="border-2 border-white h-[80px] w-[250px] font-bold text-center text">
                      <Link>{item.boardlineNumber} </Link>
                    </td>
                    <td className="border-2 border-white h-[80px] w-[250px] font-bold text-center text">
                      <Link>{item.noOfContacts} </Link>
                    </td>
                    <td className="border-2 border-white h-[80px] w-[250px] font-bold text-center text">
                      <Link>{item.newContacts} </Link>
                    </td>
                    <td className="border-2 border-white h-[80px] w-[250px] font-bold text-center text">
                      <Link>{item.status} </Link>
                    </td>
                    {userData.role === "Partner" ? (
                      <td className="border-2 border-white h-[80px] w-[250px] font-bold text-center text">
                        <Link>{item.assignToUser || "NA"} </Link>
                      </td>
                    ) : userData.role === "Client" ? (
                      <>
                        <td className="border-2 border-white h-[80px] w-[250px] font-bold text-center text">
                          <Link>{item.assignToName || "NA"} </Link>
                        </td>
                        <td className="border-2 border-white h-[80px] w-[250px] font-bold text-center text">
                          <Link>{item.assignToUser || "NA"} </Link>
                        </td>
                      </>
                    ) : (
                      ""
                    )}
                  </tr>
                ))
            : data?.map((item, index) => (
                <tr key={index}>
                  <td className="border-2 border-white  w-[250px] font-bold text-center text-sky-500">
                    <Link
                      to={`/detailed-account/${item.accountName}/${item.accountID}`}
                    >
                      {item.accountName}{" "}
                    </Link>
                  </td>
                  <td className="border-2 border-white h-[80px] w-[250px] font-bold text-center ">
                    <Link>{item.size} </Link>
                  </td>
                  <td className="border-2 border-white h-[80px] w-[250px] font-bold text-center text">
                    <Link>{item.city} </Link>
                  </td>
                  <td className="border-2 border-white h-[80px] w-[250px] font-bold text-center text">
                    <Link>{item.state || "NA"} </Link>
                  </td>
                  <td className="border-2 border-white h-[80px] w-[250px] font-bold text-center text">
                    <Link>{item.country} </Link>
                  </td>
                  <td className="border-2 border-white h-[80px] w-[250px] font-bold text-center text">
                    <Link>{item.revenue} </Link>
                  </td>
                  <td className="border-2 border-white h-[80px] w-[250px] font-bold text-center text">
                    <Link>{item.industry} </Link>
                  </td>
                  <td className="border-2 border-white h-[80px] w-[250px] font-bold text-center text">
                    <Link>{item.boardlineNumber} </Link>
                  </td>
                  <td className="border-2 border-white h-[80px] w-[250px] font-bold text-center text">
                    <Link>{item.noOfContacts} </Link>
                  </td>
                  <td className="border-2 border-white h-[80px] w-[250px] font-bold text-center text">
                    <Link>{item.newContacts} </Link>
                  </td>
                  <td className="border-2 border-white h-[80px] w-[250px] font-bold text-center text">
                    <Link>{item.status} </Link>
                  </td>
                  {userData.role === "Partner" ? (
                    <td className="border-2 border-white h-[80px] w-[250px] font-bold text-center text">
                      <Link>{item.assignToUser || "NA"} </Link>
                    </td>
                  ) : userData.role === "Client" ? (
                    <>
                      <td className="border-2 border-white h-[80px] w-[250px] font-bold text-center text">
                        <Link>{item.assignToName || "NA"} </Link>
                      </td>
                      <td className="border-2 border-white h-[80px] w-[250px] font-bold text-center text">
                        <Link>{item.assignToUser || "NA"} </Link>
                      </td>
                    </>
                  ) : (
                    ""
                  )}
                </tr>
              ))}
        </table>
      </div>
    </>
  );
};
export default AccountTable;
