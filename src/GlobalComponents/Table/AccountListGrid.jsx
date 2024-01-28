import { AgGridReact } from "@ag-grid-community/react"; // React Grid Logic
import "@ag-grid-community/styles/ag-grid.css"; // Core CSS
import "@ag-grid-community/styles/ag-theme-quartz.css"; // Theme
import Box from "@mui/material/Box";
import { useMemo, useRef, useState } from "react";
import { useSelector } from "react-redux";

import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { ModuleRegistry } from "@ag-grid-community/core";
import { Link } from "react-router-dom"; // Import Link from react-router-dom

// ...

// Custom cell renderer function for the "Account Name" column
const accountNameCellRenderer = (params) => {

  const accountName = params.data.accountName;
  const detailPageLink = `/account-details/${params.data.accountId}`; // Replace with your actual detail page link

  return (
    <Link to={detailPageLink} style={{ textDecoration: "none" }}>
      {accountName}
    </Link>
  );
};

ModuleRegistry.registerModules([ClientSideRowModelModule]);

// Create new GridExample component
export const AccountListGrid = (props) => {
  const gridRef = useRef();
  const { accountListData } = useSelector((state) => state.account);
  const gridStyle = useMemo(() => ({ height: "65%", width: "100%" }), []);

  const defaultColDef = useMemo(() => {
    return {
      flex: 1,
      wrapText: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
    };
  }, []);

  // const dataSource = [
  //   {
  //     region: "AUNZ",
  //     nominatedAccount: 515,
  //     profiledAccount: 515,
  //     contacts: 2060,
  //     badData: 0,
  //     opportunities: 0,
  //     followUp: 0,
  //     disqualified: 0,
  //     partnerList: [
  //       {
  //         region: "Ajeetv",
  //         nominatedAccount: 224,
  //         profiledAccount: 224,
  //         contacts: 896,
  //         badData: 0,
  //         opportunities: 0,
  //         followUp: 0,
  //         disqualified: 0,
  //         userList: [
  //           {
  //             region: "Rahul",
  //             nominatedAccount: 224,
  //             profiledAccount: 224,
  //             contacts: 896,
  //             badData: 0,
  //             opportunities: 0,
  //             followUp: 0,
  //             disqualified: 0,
  //           },
  //         ],
  //       },
  //       {
  //         region: "Shubham.Jaiswal",
  //         nominatedAccount: 291,
  //         profiledAccount: 291,
  //         contacts: 1164,
  //         badData: 0,
  //         opportunities: 0,
  //         followUp: 0,
  //         disqualified: 0,
  //         userList: [
  //           {
  //             region: "Rohit",
  //             nominatedAccount: 176,
  //             profiledAccount: 176,
  //             contacts: 704,
  //             badData: 0,
  //             opportunities: 0,
  //             followUp: 0,
  //             disqualified: 0,
  //           },
  //           {
  //             region: "Manish Verma",
  //             nominatedAccount: 115,
  //             profiledAccount: 115,
  //             contacts: 460,
  //             badData: 0,
  //             opportunities: 0,
  //             followUp: 0,
  //             disqualified: 0,
  //           },
  //         ],
  //       },
  //     ],
  //   },
  //   {
  //     region: "Greater China",
  //     nominatedAccount: 301,
  //     profiledAccount: 301,
  //     contacts: 1204,
  //     badData: 0,
  //     opportunities: 0,
  //     followUp: 0,
  //     disqualified: 0,
  //     partnerList: [
  //       {
  //         region: "Ajeetv",
  //         nominatedAccount: 132,
  //         profiledAccount: 132,
  //         contacts: 528,
  //         badData: 0,
  //         opportunities: 0,
  //         followUp: 0,
  //         disqualified: 0,
  //         userList: [
  //           {
  //             region: "Rahul",
  //             nominatedAccount: 132,
  //             profiledAccount: 132,
  //             contacts: 528,
  //             badData: 0,
  //             opportunities: 0,
  //             followUp: 0,
  //             disqualified: 0,
  //           },
  //         ],
  //       },
  //       {
  //         region: "Shubham.Jaiswal",
  //         nominatedAccount: 169,
  //         profiledAccount: 169,
  //         contacts: 676,
  //         badData: 0,
  //         opportunities: 0,
  //         followUp: 0,
  //         disqualified: 0,
  //         userList: [
  //           {
  //             region: "Rohit",
  //             nominatedAccount: 103,
  //             profiledAccount: 103,
  //             contacts: 412,
  //             badData: 0,
  //             opportunities: 0,
  //             followUp: 0,
  //             disqualified: 0,
  //           },
  //           {
  //             region: "Manish Verma",
  //             nominatedAccount: 66,
  //             profiledAccount: 66,
  //             contacts: 264,
  //             badData: 0,
  //             opportunities: 0,
  //             followUp: 0,
  //             disqualified: 0,
  //           },
  //         ],
  //       },
  //     ],
  //   },
  //   {
  //     region: "India",
  //     nominatedAccount: 849,
  //     profiledAccount: 841,
  //     contacts: 3396,
  //     badData: 9,
  //     opportunities: 1,
  //     followUp: 0,
  //     disqualified: 0,
  //     partnerList: [
  //       {
  //         region: "Ajeetv",
  //         nominatedAccount: 320,
  //         profiledAccount: 318,
  //         contacts: 1280,
  //         badData: 0,
  //         opportunities: 0,
  //         followUp: 0,
  //         disqualified: 0,
  //         userList: [
  //           {
  //             region: "Rahul",
  //             nominatedAccount: 320,
  //             profiledAccount: 318,
  //             contacts: 1280,
  //             badData: 0,
  //             opportunities: 0,
  //             followUp: 0,
  //             disqualified: 0,
  //           },
  //         ],
  //       },
  //       {
  //         region: "Shubham.Jaiswal",
  //         nominatedAccount: 529,
  //         profiledAccount: 523,
  //         contacts: 2116,
  //         badData: 9,
  //         opportunities: 1,
  //         followUp: 0,
  //         disqualified: 0,
  //         userList: [
  //           {
  //             region: "Rohit",
  //             nominatedAccount: 219,
  //             profiledAccount: 216,
  //             contacts: 876,
  //             badData: 1,
  //             opportunities: 0,
  //             followUp: 0,
  //             disqualified: 0,
  //           },
  //           {
  //             region: "Manish Verma",
  //             nominatedAccount: 310,
  //             profiledAccount: 307,
  //             contacts: 1240,
  //             badData: 8,
  //             opportunities: 1,
  //             followUp: 0,
  //             disqualified: 0,
  //           },
  //         ],
  //       },
  //     ],
  //   },
  //   {
  //     region: "Korea",
  //     nominatedAccount: 206,
  //     profiledAccount: 206,
  //     contacts: 824,
  //     badData: 0,
  //     opportunities: 0,
  //     followUp: 0,
  //     disqualified: 0,
  //     partnerList: [
  //       {
  //         region: "Ajeetv",
  //         nominatedAccount: 88,
  //         profiledAccount: 88,
  //         contacts: 352,
  //         badData: 0,
  //         opportunities: 0,
  //         followUp: 0,
  //         disqualified: 0,
  //         userList: [
  //           {
  //             region: "Rahul",
  //             nominatedAccount: 88,
  //             profiledAccount: 88,
  //             contacts: 352,
  //             badData: 0,
  //             opportunities: 0,
  //             followUp: 0,
  //             disqualified: 0,
  //           },
  //         ],
  //       },
  //       {
  //         region: "Shubham.Jaiswal",
  //         nominatedAccount: 118,
  //         profiledAccount: 118,
  //         contacts: 472,
  //         badData: 0,
  //         opportunities: 0,
  //         followUp: 0,
  //         disqualified: 0,
  //         userList: [
  //           {
  //             region: "Rohit",
  //             nominatedAccount: 73,
  //             profiledAccount: 73,
  //             contacts: 292,
  //             badData: 0,
  //             opportunities: 0,
  //             followUp: 0,
  //             disqualified: 0,
  //           },
  //           {
  //             region: "Manish Verma",
  //             nominatedAccount: 45,
  //             profiledAccount: 45,
  //             contacts: 180,
  //             badData: 0,
  //             opportunities: 0,
  //             followUp: 0,
  //             disqualified: 0,
  //           },
  //         ],
  //       },
  //     ],
  //   },
  //   {
  //     region: "SEA",
  //     nominatedAccount: 293,
  //     profiledAccount: 293,
  //     contacts: 1172,
  //     badData: 0,
  //     opportunities: 0,
  //     followUp: 0,
  //     disqualified: 0,
  //     partnerList: [
  //       {
  //         region: "Ajeetv",
  //         nominatedAccount: 130,
  //         profiledAccount: 130,
  //         contacts: 520,
  //         badData: 0,
  //         opportunities: 0,
  //         followUp: 0,
  //         disqualified: 0,
  //         userList: [
  //           {
  //             region: "Rahul",
  //             nominatedAccount: 130,
  //             profiledAccount: 130,
  //             contacts: 520,
  //             badData: 0,
  //             opportunities: 0,
  //             followUp: 0,
  //             disqualified: 0,
  //           },
  //         ],
  //       },
  //       {
  //         region: "Shubham.Jaiswal",
  //         nominatedAccount: 163,
  //         profiledAccount: 163,
  //         contacts: 652,
  //         badData: 0,
  //         opportunities: 0,
  //         followUp: 0,
  //         disqualified: 0,
  //         userList: [
  //           {
  //             region: "Rohit",
  //             nominatedAccount: 94,
  //             profiledAccount: 94,
  //             contacts: 376,
  //             badData: 0,
  //             opportunities: 0,
  //             followUp: 0,
  //             disqualified: 0,
  //           },
  //           {
  //             region: "Manish Verma",
  //             nominatedAccount: 69,
  //             profiledAccount: 69,
  //             contacts: 276,
  //             badData: 0,
  //             opportunities: 0,
  //             followUp: 0,
  //             disqualified: 0,
  //           },
  //         ],
  //       },
  //     ],
  //   },
  // ];

  // Column Definitions: Defines & controls grid columns.
  const [colDefs, setColDefs] = useState([
    {
      field: "accountName",
      headerName: "Account Name",
      minWidth: 300,
      cellRenderer: accountNameCellRenderer,
    },
    {
      field: "createdDate",
      headerName: "Created Date",
      minWidth: 120,
    },
    {
      field: "empSize",
      headerName: "Size (Global)",
      minWidth: 120,
    },
    {
      field: "vertical",
      headerName: "Industry",
      minWidth: 220,
    },
    {
      field: "revenue",
      headerName: "Revenue",
      minWidth: 100,
    },
    {
      field: "boardlineNumber1",
      headerName: "Boardline",
      minWidth: 120,
    },
    {
      field: "city",
      headerName: "City (Country HQ)",
      minWidth: 160,
    },
    {
      field: "state",
      headerName: "State",
      minWidth: 120,
    },
    {
      field: "country",
      headerName: "Country",
      minWidth: 150,
    },
    {
      field: "noOfContact",
      headerName: "Contacts",
      minWidth: 100,
    },
    {
      field: "noOfNewContact",
      headerName: "New Contacts",
      minWidth: 130,
    },
    {
      field: "accountStatus",
      headerName: "Status",
      minWidth: 120,
    },
    {
      field: "assignedTo",
      headerName: "Assignee",
      minWidth: 120,
    },
  ]);

  const onGridReady = (params) => {
    params.api.sizeColumnsToFit();
    params.api.resetRowHeights();
  };

  return (
    <Box className="ag-theme-quartz" style={gridStyle} sx={{ m: 1 }}>
      <AgGridReact
        ref={gridRef}
        rowData={accountListData ? accountListData.accountGridData : []}
        columnDefs={colDefs}
        pagination={true}
        onGridReady={onGridReady}
        defaultColDef={defaultColDef}
      />
    </Box>
  );
};
