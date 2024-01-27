import {
  createTable,
  getCoreRowModel,
  getExpandedRowModel,
  useTableInstance,
} from "@tanstack/react-table";
import React, { useEffect, useMemo, useState } from "react";
import "./table.css";

import { Link } from "react-router-dom";
import { useGetLocalStorage } from "../../Hooks/useGetLocalStorage";
import dashboardService from "../../Services/dashBoardService";
import { AddCircleIcon, RemoveCircleIcon } from "../../assets/icons";

const table = createTable();
const defaultColumns = [
  table.createGroup({
    header: "Full Name",
    columns: [
      table.createDataColumn("region", {
        id: "Regions",
        // header: (props) => (
        //   <>
        //     {/* <button onClick={props.instance.getToggleAllRowsExpandedHandler()}>
        //       {props.instance.getIsAllRowsExpanded() ? "e5cf" : (<ControlPointIcon/>)}
        //     </button> */}
        //     First Name
        //   </>
        // )
        // ,

        cell: ({ row, getValue }) => (
          <div
            style={{
              paddingLeft: `${row.depth * 1}rem`,
            }}
          >
            {row.getCanExpand() ? (
              <button
                {...{
                  onClick: row.getToggleExpandedHandler(),
                  style: { cursor: "pointer" },
                }}
              >
                {row.getIsExpanded() ? <RemoveCircleIcon /> : <AddCircleIcon />}
              </button>
            ) : (
              ""
            )}{" "}
            {getValue()}
          </div>
        ),
      }),
      table.createDataColumn("assignedAccount", {
        id: "Assigned Accounts",
        cell: (props) => <span>{props.getValue()}</span>,
      }),
      table.createDataColumn("assignedContacts", {
        id: "Assigned Contacts",
      }),
    ],
  }),
  table.createDataColumn("accountsViewed", {
    id: "Account Viewed",
  }),
  table.createGroup({
    header: "Phone Number",
    columns: [
      table.createDataColumn("accountsTouched", {
        id: "Accounts Touched",
        cell: (props) => <Link className="underline">{props.getValue()}</Link>,
      }),
    ],
  }),

  table.createGroup({
    header: "Date Details",
    columns: [
      table.createDataColumn("contactsTouched", {
        id: "Contacts Touched",
        // cell: (props) => new Date(props.getValue()).toDateString(),
      }),
      //   table.createDataColumn("followups", {
      //     id: "Contacts Touched",

      //   }),
      table.createDataColumn("loginMonth", {
        id: "Logins/Month",
      }),
    ],
  }),
];
const AccountTable = () => {
  const { role, id, jwtToken } = JSON.parse(useGetLocalStorage("userData"));

  const [expanded, setExpanded] = useState({});
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  useEffect(() => {
    // const call = async()=>{
    //  let res = await dashboardService.accountActivity(role,id,jwtToken);
    //  console.log(res.data);
    //  setData(res.data)
    //  setLoading(false)
    // }
    // call();
    dashboardService
      .partnerActivity(role, id, jwtToken)
      .then((res) => {
        console.log(res.data);
        setData(res.data);
        setLoading(false);
      })
      .catch((err) =>
        //  console.log(err)
        {
          throw err;
        }
      );
  }, []);

  // const data = useMemo(() => Data, []);
  const columns = useMemo(() => defaultColumns, []);

  const instance = useTableInstance(table, {
    data,
    columns,
    state: {
      expanded: expanded,
    },
    onExpandedChange: setExpanded,
    getSubRows: (row) => row.subRows,
    getCoreRowModel: getCoreRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
  });
  // console.log(instance.getRowModel());

  if (loading === true) {
    return <h1>loading...</h1>;
  }
  return (
    <div>
      <table border={2}>
        <thead>
          {instance.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id} colSpan={header.colSpan}>
                  {header.isPlaceholder ? null : header.renderHeader()}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {instance.getRowModel().rows.map((row) => (
            <tr key={row.id} className={`depth-${row.depth}`}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>{cell.renderCell()}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AccountTable;
