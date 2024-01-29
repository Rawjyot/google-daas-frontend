import {
  createTable,
  getCoreRowModel,
  getExpandedRowModel,
  useTableInstance,
} from "@tanstack/react-table";
import React, { useEffect, useState } from "react";
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
      table.createDataColumn("regions", {
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
      table.createDataColumn("nominatedAccount", {
        id: "Nominated Accounts",
        // cell: (props) => <Link className="underline">{props.getValue()}</Link>,
      }),
      table.createDataColumn("profileAccount", {
        id: "Profiled Accounts",
        cell: (props) => <Link className="underline">{props.getValue()}</Link>,
      }),
    ],
  }),
  table.createDataColumn("contacts", {
    id: "Contacts",
  }),
  table.createGroup({
    header: "Phone Number",
    columns: [
      table.createDataColumn("badData", {
        id: "Bad Data",
      }),
    ],
  }),

  table.createGroup({
    header: "Date Details",
    columns: [
      table.createDataColumn("opportunities", {
        id: "Opportunites",
        cell: (props) => <Link className="underline">{props.getValue()}</Link>,
      }),
      table.createDataColumn("followups", {
        id: "Followups",
      }),
      table.createDataColumn("disqualified", {
        id: "Disqualified",
      }),
    ],
  }),
];
const BasicTable = () => {
  const [expanded, setExpanded] = useState({});
  // const dataTable = useMemo(() => Data,[]);
  const { role, id, jwtToken } = JSON.parse(useGetLocalStorage("userData"));
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
      .accountActivity(role, id, jwtToken)
      .then((res) => {
        console.log(res.data);
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        throw err;
      });
  }, []);

  const instance = useTableInstance(table, {
    data,
    columns: defaultColumns,
    state: {
      expanded: expanded,
    },
    onExpandedChange: setExpanded,
    getSubRows: (row) => row.subRows,
    getCoreRowModel: getCoreRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
  });
  // console.log(instance.getRowModel().rows.length);

  if (loading === true) {
    return <h1>Loading....</h1>;
  }

  return (
    <div>
      <table border={2}>
        <thead>
          {instance.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  colSpan={header.colSpan}
                  className="text-center"
                >
                  {header.isPlaceholder ? null : header.renderHeader()}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {instance.getRowModel().rows?.map((row) => (
            <tr key={row.id} className={`depth-${row.depth}`}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="text-center">
                  {cell.renderCell()}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BasicTable;
